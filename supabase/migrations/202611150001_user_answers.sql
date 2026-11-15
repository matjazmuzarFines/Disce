-- Run once in the Supabase SQL Editor for this project.
-- Each row is one user's answer to one stable field in one textbook.
begin;

create table if not exists public.user_answers (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  book_id text not null check (char_length(book_id) between 1 and 120),
  field_id text not null check (char_length(field_id) between 1 and 200),
  answer text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, book_id, field_id)
);

create or replace function public.disce_set_answer_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists disce_answer_updated_at on public.user_answers;
create trigger disce_answer_updated_at
before update on public.user_answers
for each row execute function public.disce_set_answer_updated_at();

alter table public.user_answers enable row level security;

revoke all on public.user_answers from anon;
grant select, insert, update, delete on public.user_answers to authenticated;

drop policy if exists disce_own_answers on public.user_answers;
create policy disce_own_answers
on public.user_answers
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

commit;
