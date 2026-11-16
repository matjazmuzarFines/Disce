import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {registerHooks} from 'node:module';
registerHooks({resolve(specifier,context,next){return next(specifier==='./library-data'?specifier+'.ts':specifier,context);}});
const {libraryBackend}=await import('../lib/library-data.ts');
const {LibraryStore}=await import('../lib/library-store.ts');
const owner='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222';
const migration=await fs.readFile(new URL('../supabase/20261116_library.sql',import.meta.url),'utf8');
const folder={id:'italian',kind:'folder',name:'Italijanščina',parent:null,sortOrder:3,labels:['a1']};
const child={id:'semester',kind:'folder',name:'Semester',parent:'italian',sortOrder:4,labels:[]};
const tag={id:'a1',name:'A1',color:'#82a8fa'};
const book={id:'volentieri',kind:'book',name:'Volentieri! A1',parent:'semester',sortOrder:5,labels:['a1']};
async function database(legacy=false){
  const db=await PGlite.create();
  await db.exec("create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to authenticated,anon;grant execute on function auth.uid() to authenticated,anon;");
  await db.query('insert into auth.users values($1),($2)',[owner,other]);
  await db.exec(await fs.readFile(new URL('../supabase/migrations/202611150001_user_answers.sql',import.meta.url),'utf8'));
  await db.query("insert into public.user_answers values($1,'volentieri','predstavitev-0','Ohranjen odgovor',now(),now())",[owner]);
  if(legacy){
    for(const [id,value] of [['schema-v1','1'],['item:italian',JSON.stringify(folder)],['item:semester',JSON.stringify(child)],['item:volentieri',JSON.stringify(book)],['item:worksheet',''],['label:a1',JSON.stringify(tag)]]){
      await db.query("insert into public.user_answers(user_id,book_id,field_id,answer) values($1,'__library__',$2,$3)",[owner,id,value]);
    }
  }
  try{await db.exec(migration);}catch(e){await db.close();throw e;}
  return db;
}
async function login(db,user=owner){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user]);await db.exec('set role authenticated');}
const changes=async(db,rows)=>db.query('select public.library_apply_changes($1::jsonb)',[JSON.stringify(rows)]);
const read=async db=>(await db.query('select public.library_read() as data')).rows[0].data;

test('SQL migrates folders, order, memberships and tags; preserves learning answers; reruns safely',async()=>{
  const db=await database(true);
  try{
    assert.equal((await db.query("select count(*)::int as n from user_answers where book_id='__library__'")).rows[0].n,0);
    assert.equal((await db.query('select answer from user_answers')).rows[0].answer,'Ohranjen odgovor');
    await db.exec(migration);await login(db);
    const data=await read(db);
    assert.equal(data.items.length,3);assert.deepEqual(data.labels,[tag]);
    assert.equal(data.items.find(v=>v.id==='italian').sortOrder,3);
    assert.equal(data.items.find(v=>v.id==='volentieri').parent,'semester');
    assert.deepEqual(data.items.find(v=>v.id==='volentieri').labels,['a1']);
    await db.query('select public.library_initialize()');assert.equal((await read(db)).items.length,3);
    await assert.rejects(db.query("insert into user_answers(user_id,book_id,field_id,answer) values($1,'__library__','bad','{}')",[owner]),/user_answers_no_library/);
  }finally{await db.close();}
});
test('fresh account imports browser hierarchy atomically; repeated initialization preserves changes',async()=>{
  const db=await database();
  try{
    await login(db);await db.query('select public.library_initialize($1::jsonb)',[JSON.stringify({items:[child,book,folder],labels:[tag]})]);
    assert.equal((await read(db)).items.find(v=>v.id==='volentieri').parent,'semester');
    await changes(db,[{kind:'folder',id:folder.id,value:{...folder,name:'Novo ime'}}]);
    await db.query('select public.library_initialize($1::jsonb)',[JSON.stringify({items:[folder],labels:[tag]})]);
    assert.equal((await read(db)).items.find(v=>v.id==='italian').name,'Novo ime');
  }finally{await db.close();}
});
test('RLS and composite foreign keys isolate users; anonymous access and internal import are denied',async()=>{
  const db=await database(true);
  try{
    await login(db,other);assert.deepEqual((await read(db)).items,[]);
    assert.equal((await db.query('select * from library_folders')).rows.length,0);
    await assert.rejects(db.query("insert into library_tags(user_id,id,name,color) values($1,'x','X','#123456')",[owner]),/row-level security/);
    await db.query('select public.library_initialize()');
    await assert.rejects(changes(db,[{kind:'book',id:'volentieri',value:{...book,parent:'italian',labels:[]}}]),/foreign key/);
    await assert.rejects(changes(db,[{kind:'tag',id:'owned',value:{id:'owned',name:'Owned',color:'#112233'}},{kind:'book',id:'volentieri',value:{...book,parent:null,labels:['a1']}}]),/foreign key/);
    assert.equal((await db.query("select * from library_tags where id='owned'")).rows.length,0,'failed relationship rolls back whole action');
    await assert.rejects(db.query('select public.disce_import_library($1,$2::jsonb)',[owner,'{"items":[],"labels":[]}']),/permission denied/);
    await db.exec('reset role;set role anon');
    await assert.rejects(db.query('select * from library_folders'),/permission denied/);
    await assert.rejects(db.query('select public.library_read()'),/permission denied/);
    await assert.rejects(db.query('select public.library_initialize()'),/permission denied/);
  }finally{await db.close();}
});
test('cycle checks, tag constraints, atomic relationships and cascading deletion protect integrity',async()=>{
  const db=await database(true);
  try{
    await login(db);
    await assert.rejects(changes(db,[{kind:'folder',id:'italian',value:{...folder,parent:'semester'}}]),/cycle/);
    assert.equal((await read(db)).items.find(v=>v.id==='italian').parent,null);
    await assert.rejects(changes(db,[{kind:'tag',id:'bad',value:{id:'bad',name:'Predolgo ime',color:'red'}}]),/check constraint/);
    await assert.rejects(changes(db,[{kind:'tag',id:'duplicate',value:{...tag,id:'duplicate',name:'a1'}}]),/unique constraint/);
    await changes(db,[{kind:'book',id:'volentieri',value:{...book,parent:null,labels:[]}}]);
    assert.equal((await db.query('select * from library_book_tags')).rows.length,0);
    await changes(db,[{kind:'book',id:'volentieri',value:book}]);
    await changes(db,[{kind:'folder',id:'italian',value:null}]);
    const data=await read(db);assert.equal(data.items.length,0);assert.deepEqual(data.labels,[tag]);
    assert.equal((await db.query('select * from library_folder_tags')).rows.length,0);
    assert.equal((await db.query('select * from library_book_tags')).rows.length,0);
    await db.query('select public.library_initialize()');assert.equal((await read(db)).items.length,0);
    assert.equal((await db.query('select answer from user_answers')).rows[0].answer,'Ohranjen odgovor');
  }finally{await db.close();}
});
test('application backend and offline queue write real normalized PostgreSQL rows',async()=>{
  const db=await database();let store;
  try{
    await login(db);
    let online=true;const client={rpc:async(name,params={})=>{
      if(!online)return {data:null,error:new Error('offline')};
      try{
        const args=Object.values(params);
        const result=await db.query('select public.'+name+'('+args.map((_,i)=>'$'+(i+1)+'::jsonb').join(',')+') as data',args.map(v=>v===null?null:JSON.stringify(v)));
        return {data:result.rows[0].data,error:null};
      }catch(error){return {data:null,error};}
    }};
    const values=new Map(),cache={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};
    const backend=libraryBackend(client,owner);
    store=new LibraryStore(owner,backend);await store.start(cache);assert.equal(store.getSnapshot().ready,true);
    online=false;
    store.setData(v=>({...v,labels:[tag],items:[...v.items,folder]}));assert.equal(await store.flush(),false);store.stop();
    online=true;
    store=new LibraryStore(owner,backend);await store.start(cache);assert.equal(await store.flush(),true);
    assert.equal((await db.query('select name,sort_order from library_folders')).rows[0].sort_order,3);
    assert.equal((await db.query('select * from library_folder_tags')).rows[0].tag_id,'a1');
    assert.equal((await db.query("select count(*)::int as n from user_answers where book_id='__library__'")).rows[0].n,0);
    await store.retry();assert.equal(store.getSnapshot().data.items.find(v=>v.id==='italian').name,folder.name);
  }finally{store?.stop();await db.close();}
});
