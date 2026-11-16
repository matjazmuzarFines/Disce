import test from 'node:test';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
registerHooks({resolve(specifier,context,next){return next(specifier==='./library-data'?specifier+'.ts':specifier,context);}});
const {LibraryStore}=await import('../lib/library-store.ts');
const {AnswerStore}=await import('../lib/answer-store.ts');
const {initialLibrary,applyLibraryChanges,readLegacyLibrary,readLegacyPending,libraryBackend}=await import('../lib/library-data.ts');
const {workspaceRoute,libraryHref,bookHref}=await import('../lib/workspace-navigation.ts');
const clone=value=>JSON.parse(JSON.stringify(value));
const folder={id:'italian',kind:'folder',name:'Italijanščina',parent:null,labels:[],sortOrder:2};
const tag={id:'a1',name:'A1',color:'#82a8fa'};
function storage(){const data=new Map();return {getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)};}
function database(){
 const users=new Map();let online=true;
 const forUser=user=>({
  async initialize(legacy){if(!online)throw Error('offline');if(!users.has(user))users.set(user,clone(legacy||initialLibrary));},
  async read(){if(!online)throw Error('offline');return clone(users.get(user));},
  async write(changes){if(!online)throw Error('offline');users.set(user,applyLibraryChanges(users.get(user),changes));},
 });
 return {forUser,setOnline:value=>{online=value;},data:user=>clone(users.get(user))};
}
test('separate library backend uses only dedicated RPCs and leaves answers alone',async()=>{
 const calls=[],client={rpc:async(name,params)=>{calls.push([name,params]);return {data:initialLibrary,error:null};},from:()=>{throw Error('Library must not access user_answers');}};
 const backend=libraryBackend(client,'one');await backend.initialize(null);await backend.read();await backend.write([{kind:'folder',id:folder.id,value:folder}]);
 assert.deepEqual(calls.map(v=>v[0]),['library_initialize','library_read','library_apply_changes']);
});
test('two sessions retain independent folder and tag edits',async()=>{
 const db=database(),first=new LibraryStore('one',db.forUser('one')),second=new LibraryStore('one',db.forUser('one'));
 await first.start(storage());await second.start(storage());
 first.setData(v=>({...v,items:[...v.items,folder]}));second.setData(v=>({...v,labels:[tag]}));
 assert.equal(await first.flush(),true);assert.equal(await second.flush(),true);await first.retry();
 assert.ok(first.getSnapshot().data.items.some(v=>v.id==='italian'));assert.deepEqual(first.getSnapshot().data.labels,[tag]);
 first.stop();second.stop();
});
test('offline folder and tag edits survive logout, retry and a new browser cache',async()=>{
 const db=database(),cache=storage();let store=new LibraryStore('one',db.forUser('one'));await store.start(cache);
 db.setOnline(false);store.setData(v=>({...v,labels:[tag],items:[...v.items,{...folder,labels:[tag.id]}]}));
 assert.equal(await store.flush(),false);assert.match(store.getSnapshot().error,/niso shranjene/);store.stop();
 db.setOnline(true);store=new LibraryStore('one',db.forUser('one'));await store.start(cache);assert.equal(await store.flush(),true);store.stop();
 const otherBrowser=new LibraryStore('one',db.forUser('one'));await otherBrowser.start(storage());
 assert.deepEqual(otherBrowser.getSnapshot().data.labels,[tag]);assert.deepEqual(otherBrowser.getSnapshot().data.items.find(v=>v.id===folder.id).labels,[tag.id]);otherBrowser.stop();
});
test('serialized atomic actions retain typing during an in-flight save',async()=>{
 const db=database(),backend=db.forUser('one');let release,started;
 const start=new Promise(r=>{started=r;});const original=backend.write;
 backend.write=async changes=>{started();await new Promise(r=>{release=r;});await original(changes);backend.write=original;};
 const store=new LibraryStore('one',backend);await store.start(storage());store.setData(v=>({...v,items:[...v.items,folder]}));
 const saving=store.flush();await start;store.setData(v=>({...v,items:v.items.map(i=>i.id===folder.id?{...i,name:'Zadnje ime'}:i)}));release();await saving;
 assert.equal(db.data('one').items.find(v=>v.id===folder.id).name,'Zadnje ime');assert.equal(store.getSnapshot().pendingCount,0);store.stop();
});
test('SQL-not-installed errors block edits and recover after retry without losing legacy data',async()=>{
 const db=database(),backend=db.forUser('one'),initialize=backend.initialize;let missing=true;
 backend.initialize=async value=>{if(missing)throw {code:'PGRST202'};return initialize(value);};
 const cache=storage();cache.setItem('disce-library-v1:one',JSON.stringify({items:[folder,...initialLibrary.items],labels:[]}));
 const store=new LibraryStore('one',backend);await store.start(cache);assert.equal(store.getSnapshot().ready,false);assert.match(store.getSnapshot().error,/20261116_library.sql/);
 store.setData(initialLibrary);assert.equal(store.getSnapshot().pendingCount,0);missing=false;await store.retry();
 assert.ok(store.getSnapshot().data.items.some(v=>v.id===folder.id));store.stop();
});
test('old answer-cache pending library writes migrate once; answer store never resubmits them',async()=>{
 const cache=storage(),db=database();
 const before={...folder,name:'Staro ime'};cache.setItem('disce-answers-v1:one',JSON.stringify({answers:{__library__:{'item:italian':JSON.stringify(before)}},pending:{__library__:{'item:italian':JSON.stringify(folder)}}}));
 const answerWrites=[];const answers=new AnswerStore('one',{read:async()=>[],write:async rows=>{answerWrites.push(...rows);}});
 await answers.start(cache);await answers.flush();assert.deepEqual(answerWrites,[]);assert.ok(readLegacyLibrary(cache,'one').items.some(v=>v.name===folder.name));
 assert.equal(readLegacyPending(cache,'one').length,1);
 const removed=storage();removed.setItem('disce-answers-v1:one',JSON.stringify({answers:{__library__:{'item:deleted':''}},pending:{__library__:{'item:deleted':''}}}));
 assert.deepEqual(readLegacyPending(removed,'one').map(v=>v.kind),['folder','book']);
 const store=new LibraryStore('one',db.forUser('one'));await store.start(cache);await store.flush();store.stop();
 const restored=new LibraryStore('one',db.forUser('one'));await restored.start(cache);assert.equal(restored.getSnapshot().pendingCount,0);
 restored.stop();answers.stop();
});
test('account separation, cascades, ordered items and navigation URLs remain consistent',async()=>{
 const db=database(),cache=storage();cache.setItem('disce-legacy-library-owner','one');cache.setItem('disce-library-v1',JSON.stringify({items:[folder],labels:[]}));
 assert.equal(readLegacyLibrary(cache,'two'),null);
 const a=new LibraryStore('one',db.forUser('one')),b=new LibraryStore('two',db.forUser('two'));await a.start(cache);await b.start(cache);
 assert.equal(b.getSnapshot().data.items.some(v=>v.id===folder.id),false);a.stop();b.stop();
 const nested={...initialLibrary.items[0],parent:folder.id};
 assert.equal(applyLibraryChanges({items:[folder,nested],labels:[]},[{kind:'folder',id:folder.id,value:null}]).items.length,0);
 assert.equal(libraryHref('a/b'),'/moji_ucbeniki?mapa=a%2Fb');
 const url=bookHref('volentieri','semester',39);
 assert.deepEqual(workspaceRoute('/moji_ucbeniki/volentieri',new URLSearchParams(url.split('?')[1])),{book:'volentieri',folder:'semester',page:39});
});
