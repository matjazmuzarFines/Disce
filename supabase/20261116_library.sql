-- Disce: run this complete file once in the Supabase SQL Editor.
-- Requires migrations/202611150001_user_answers.sql.
-- Transactional and rerunnable. Learning answers are never modified.
begin;

create table if not exists public.textbooks (
  id text primary key check (length(id) between 1 and 120),
  name text not null check (length(btrim(name)) between 1 and 120),
  language_code text not null,
  kind text not null check (kind in ('textbook','worksheet')),
  sort_order integer not null default 0 check (sort_order >= 0)
);
insert into public.textbooks(id,name,language_code,kind,sort_order) values
  ('volentieri','Volentieri! A1','it','textbook',0),
  ('worksheet','Delovni list 1','it','worksheet',1)
on conflict(id) do nothing;

-- Text IDs preserve existing folder/tag identifiers during migration.
-- Composite keys prevent cross-account links, even with a guessed ID.
create table if not exists public.library_folders (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null check (length(id) between 1 and 120),
  parent_id text,
  name text not null check (length(btrim(name)) between 1 and 120),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(user_id,id),
  foreign key(user_id,parent_id) references public.library_folders(user_id,id)
    on delete cascade deferrable initially deferred,
  check(parent_id is distinct from id)
);
create table if not exists public.library_tags (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null check (length(id) between 1 and 120),
  name text not null check (length(btrim(name)) between 1 and 8),
  color text not null check (color ~ '^#[0-9a-fA-F]{6}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(user_id,id)
);
create unique index if not exists library_tags_unique_name
  on public.library_tags(user_id,lower(btrim(name)));
create table if not exists public.library_books (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id text not null references public.textbooks(id),
  folder_id text,
  name text not null check (length(btrim(name)) between 1 and 120),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(user_id,id),
  foreign key(user_id,folder_id) references public.library_folders(user_id,id)
    on delete cascade deferrable initially deferred
);
create table if not exists public.library_folder_tags (
  user_id uuid not null default auth.uid(),
  folder_id text not null,
  tag_id text not null,
  primary key(user_id,folder_id,tag_id),
  foreign key(user_id,folder_id) references public.library_folders(user_id,id) on delete cascade,
  foreign key(user_id,tag_id) references public.library_tags(user_id,id) on delete cascade
);
create table if not exists public.library_book_tags (
  user_id uuid not null default auth.uid(),
  book_id text not null,
  tag_id text not null,
  primary key(user_id,book_id,tag_id),
  foreign key(user_id,book_id) references public.library_books(user_id,id) on delete cascade,
  foreign key(user_id,tag_id) references public.library_tags(user_id,id) on delete cascade
);
-- A separate marker prevents deleted books being recreated on login.
create table if not exists public.library_settings (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  initialized_at timestamptz not null default now()
);
create index if not exists library_folders_parent_sort on public.library_folders(user_id,parent_id,sort_order,id);
create index if not exists library_books_folder_sort on public.library_books(user_id,folder_id,sort_order,id);
create index if not exists library_folder_tags_tag on public.library_folder_tags(user_id,tag_id);
create index if not exists library_book_tags_tag on public.library_book_tags(user_id,tag_id);

create or replace function public.disce_check_folder_cycle()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  -- Check the final graph at commit, including multi-folder moves.
  if exists (
    with recursive ancestry(id,parent_id,path,cycle) as (
      select f.id,f.parent_id,array[f.id],false from public.library_folders f
      where f.user_id=new.user_id and f.id=new.id
      union all
      select f.id,f.parent_id,a.path||f.id,f.id=any(a.path)
      from ancestry a join public.library_folders f
        on f.user_id=new.user_id and f.id=a.parent_id
      where not a.cycle
    ) select 1 from ancestry where cycle
  ) then raise exception 'Folder hierarchy cannot contain a cycle' using errcode='23514'; end if;
  return null;
end;
$$;
drop trigger if exists library_folders_no_cycles on public.library_folders;
create constraint trigger library_folders_no_cycles after insert or update on public.library_folders
  deferrable initially deferred for each row execute function public.disce_check_folder_cycle();

do $$
declare table_name text;
begin
  foreach table_name in array array['library_folders','library_tags','library_books'] loop
    execute format('drop trigger if exists disce_updated_at on public.%I',table_name);
    execute format('create trigger disce_updated_at before update on public.%I for each row execute function public.disce_set_answer_updated_at()',table_name);
  end loop;
  foreach table_name in array array['library_folders','library_tags','library_books','library_folder_tags','library_book_tags','library_settings'] loop
    execute format('alter table public.%I enable row level security',table_name);
    execute format('revoke all on public.%I from anon',table_name);
    execute format('grant select,insert,update,delete on public.%I to authenticated',table_name);
    execute format('drop policy if exists disce_owner on public.%I',table_name);
    execute format('create policy disce_owner on public.%I for all to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id)',table_name);
  end loop;
end;
$$;
alter table public.textbooks enable row level security;
revoke all on public.textbooks from anon,authenticated;
grant select on public.textbooks to authenticated;
drop policy if exists textbooks_read on public.textbooks;
create policy textbooks_read on public.textbooks for select to authenticated using(true);

-- Internal import helper. It never overwrites an initialized library.
create or replace function public.disce_import_library(owner_id uuid,p_data jsonb)
returns void language plpgsql security invoker set search_path='' as $$
declare entry jsonb; position integer; tag text;
begin
  if exists(select 1 from public.library_settings where user_id=owner_id) then return; end if;
  for entry,position in select value,ordinality::integer-1 from jsonb_array_elements(p_data->'labels') with ordinality loop
    insert into public.library_tags(user_id,id,name,color)
      values(owner_id,entry->>'id',entry->>'name',entry->>'color');
  end loop;
  for entry,position in select value,ordinality::integer-1 from jsonb_array_elements(p_data->'items') with ordinality loop
    if entry->>'kind'='folder' then
      insert into public.library_folders(user_id,id,parent_id,name,sort_order)
      values(owner_id,entry->>'id',case when exists(select 1 from jsonb_array_elements(p_data->'items') x where x->>'kind'='folder' and x->>'id'=entry->>'parent') then entry->>'parent' end,entry->>'name',coalesce((entry->>'sortOrder')::integer,position));
    elsif entry->>'kind'='book' then
      insert into public.library_books(user_id,id,folder_id,name,sort_order)
      values(owner_id,entry->>'id',case when exists(select 1 from jsonb_array_elements(p_data->'items') x where x->>'kind'='folder' and x->>'id'=entry->>'parent') then entry->>'parent' end,entry->>'name',coalesce((entry->>'sortOrder')::integer,position));
    else raise exception 'Unknown legacy library item kind';
    end if;
  end loop;
  for entry in select value from jsonb_array_elements(p_data->'items') loop
    for tag in select jsonb_array_elements_text(coalesce(entry->'labels','[]'::jsonb)) loop
      if entry->>'kind'='folder' then
        insert into public.library_folder_tags(user_id,folder_id,tag_id) values(owner_id,entry->>'id',tag);
      else
        insert into public.library_book_tags(user_id,book_id,tag_id) values(owner_id,entry->>'id',tag);
      end if;
    end loop;
  end loop;
  insert into public.library_settings(user_id) values(owner_id);
end;
$$;
revoke all on function public.disce_import_library(uuid,jsonb) from public,anon,authenticated;

-- Migrate all old account libraries atomically. Invalid records abort the
-- transaction instead of silently losing data. Empty tombstones stay deleted.
do $$
declare owner_id uuid; payload jsonb;
begin
  for owner_id in select distinct user_id from public.user_answers where book_id='__library__' loop
    select jsonb_build_object(
      'items',coalesce(jsonb_agg(answer::jsonb order by field_id) filter(where field_id like 'item:%' and answer<>''),'[]'::jsonb),
      'labels',coalesce(jsonb_agg(answer::jsonb order by field_id) filter(where field_id like 'label:%' and answer<>''),'[]'::jsonb)
    ) into payload from public.user_answers
      where user_id=owner_id and book_id='__library__' and field_id<>'schema-v1';
    perform public.disce_import_library(owner_id,payload);
  end loop;
  -- Flush deferred foreign keys and cycle checks before removing old records.
  set constraints all immediate;
  delete from public.user_answers a where a.book_id='__library__'
    and exists(select 1 from public.library_settings s where s.user_id=a.user_id);
end;
$$;

-- Initialize only the authenticated account; no user ID supplied by a client.
-- SECURITY DEFINER is limited to this operation so the internal import helper
-- is not publicly callable. Every write explicitly uses auth.uid().
create or replace function public.library_initialize(p_legacy jsonb default null)
returns void language plpgsql security definer set search_path='' as $$
declare owner_id uuid:=auth.uid(); payload jsonb;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(owner_id::text,0));
  if exists(select 1 from public.library_settings where user_id=owner_id) then return; end if;
  payload:=p_legacy;
  if payload is null then
    select jsonb_build_object('items',coalesce(jsonb_agg(jsonb_build_object(
      'id',t.id,'name',t.name,'kind','book','parent',null,'sortOrder',t.sort_order,'labels','[]'::jsonb
    ) order by t.sort_order,t.id),'[]'::jsonb),'labels','[]'::jsonb) into payload from public.textbooks t;
  end if;
  perform public.disce_import_library(owner_id,payload);
end;
$$;

-- One RPC = one atomic user action, including replacing tag relationships.
create or replace function public.library_read()
returns jsonb language sql stable security invoker set search_path='' as $$
  select jsonb_build_object(
    'items',coalesce((
      select jsonb_agg(item order by item->>'kind',(item->>'sortOrder')::integer,item->>'id')
      from (
        select jsonb_build_object('id',f.id,'name',f.name,'kind','folder','parent',f.parent_id,'sortOrder',f.sort_order,
          'labels',coalesce((select jsonb_agg(t.tag_id order by t.tag_id) from public.library_folder_tags t where t.user_id=f.user_id and t.folder_id=f.id),'[]'::jsonb)) item
        from public.library_folders f where f.user_id=auth.uid()
        union all
        select jsonb_build_object('id',b.id,'name',b.name,'kind','book','parent',b.folder_id,'sortOrder',b.sort_order,
          'labels',coalesce((select jsonb_agg(t.tag_id order by t.tag_id) from public.library_book_tags t where t.user_id=b.user_id and t.book_id=b.id),'[]'::jsonb))
        from public.library_books b where b.user_id=auth.uid()
      ) all_items
    ),'[]'::jsonb),
    'labels',coalesce((select jsonb_agg(jsonb_build_object('id',t.id,'name',t.name,'color',t.color) order by t.name,t.id)
      from public.library_tags t where t.user_id=auth.uid()),'[]'::jsonb)
  );
$$;

create or replace function public.library_apply_changes(p_changes jsonb)
returns void language plpgsql security invoker set search_path='' as $$
declare owner_id uuid:=auth.uid(); change jsonb; value jsonb; tag text; item_id text;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(owner_id::text,0));
  set constraints all deferred;
  if jsonb_typeof(p_changes)<>'array' then raise exception 'Changes must be an array'; end if;
  -- Tags first, then elements, then links; input order is irrelevant.
  for change in select x from jsonb_array_elements(p_changes) x where x->>'kind'='tag' and x->'value'<>'null'::jsonb loop
    value:=change->'value';
    insert into public.library_tags(user_id,id,name,color) values(owner_id,change->>'id',value->>'name',value->>'color')
    on conflict(user_id,id) do update set name=excluded.name,color=excluded.color;
  end loop;
  for change in select x from jsonb_array_elements(p_changes) x where x->>'kind' in ('folder','book') and x->'value'<>'null'::jsonb loop
    value:=change->'value'; item_id:=change->>'id';
    if change->>'kind'='folder' then
      insert into public.library_folders(user_id,id,parent_id,name,sort_order)
      values(owner_id,item_id,value->>'parent',value->>'name',(value->>'sortOrder')::integer)
      on conflict(user_id,id) do update set parent_id=excluded.parent_id,name=excluded.name,sort_order=excluded.sort_order;
    else
      insert into public.library_books(user_id,id,folder_id,name,sort_order)
      values(owner_id,item_id,value->>'parent',value->>'name',(value->>'sortOrder')::integer)
      on conflict(user_id,id) do update set folder_id=excluded.folder_id,name=excluded.name,sort_order=excluded.sort_order;
    end if;
  end loop;
  for change in select x from jsonb_array_elements(p_changes) x loop
    item_id:=change->>'id'; value:=change->'value';
    if change->>'kind' not in ('folder','book','tag') or value is null then raise exception 'Invalid library change'; end if;
    if value='null'::jsonb then
      if change->>'kind'='folder' then delete from public.library_folders where user_id=owner_id and id=item_id;
      elsif change->>'kind'='book' then delete from public.library_books where user_id=owner_id and id=item_id;
      else delete from public.library_tags where user_id=owner_id and id=item_id;
      end if;
    elsif change->>'kind' in ('folder','book') then
      if change->>'kind'='folder' then delete from public.library_folder_tags where user_id=owner_id and folder_id=item_id;
      else delete from public.library_book_tags where user_id=owner_id and book_id=item_id;
      end if;
      for tag in select jsonb_array_elements_text(value->'labels') loop
        if change->>'kind'='folder' then insert into public.library_folder_tags values(owner_id,item_id,tag);
        else insert into public.library_book_tags values(owner_id,item_id,tag);
        end if;
      end loop;
    end if;
  end loop;
end;
$$;
revoke all on function public.library_initialize(jsonb) from public,anon;
revoke all on function public.library_apply_changes(jsonb) from public,anon;
revoke all on function public.library_read() from public,anon;
grant execute on function public.library_initialize(jsonb),public.library_apply_changes(jsonb),public.library_read() to authenticated;
-- Old clients cannot put library metadata back among learning answers.
alter table public.user_answers drop constraint if exists user_answers_no_library;
alter table public.user_answers add constraint user_answers_no_library check(book_id<>'__library__');
notify pgrst,'reload schema';
commit;
