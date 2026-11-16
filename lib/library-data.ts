import type {SupabaseClient} from '@supabase/supabase-js';

export type LibraryItem={id:string;name:string;kind:'book'|'folder';parent:string|null;labels:string[];sortOrder:number};
export type LibraryLabel={id:string;name:string;color:string};
export type LibraryData={items:LibraryItem[];labels:LibraryLabel[]};
export type LibraryChange={kind:'book'|'folder'|'tag';id:string;value:LibraryItem|LibraryLabel|null};
export type LibraryBackend={
  initialize:(legacy:LibraryData|null)=>Promise<void>;
  read:()=>Promise<LibraryData>;
  write:(changes:LibraryChange[])=>Promise<void>;
};
export const initialLibrary:LibraryData={items:[
  {id:'volentieri',name:'Volentieri! A1',kind:'book',parent:null,labels:[],sortOrder:0},
  {id:'worksheet',name:'Delovni list 1',kind:'book',parent:null,labels:[],sortOrder:1},
],labels:[]};
const validId=(id:unknown):id is string=>typeof id==='string'&&id.length>0&&id.length<=120;
function parse(value:string){try{return JSON.parse(value);}catch{return null;}}
export function parseLegacyLibrary(raw:string|null):LibraryData|null {
  const data=raw?parse(raw):null;
  if(!data||!Array.isArray(data.items)||!Array.isArray(data.labels))return null;
  if(!data.items.every((v:LibraryItem)=>v&&validId(v.id)&&typeof v.name==='string'&&v.name.trim()&&['book','folder'].includes(v.kind)&&Array.isArray(v.labels))
    ||!data.labels.every((v:LibraryLabel)=>v&&validId(v.id)&&typeof v.name==='string'&&v.name.trim()&&/^#[0-9a-f]{6}$/i.test(v.color)))return null;
  return {items:data.items.map((v:LibraryItem,index:number)=>({...v,parent:validId(v.parent)?v.parent:null,sortOrder:Number.isInteger(v.sortOrder)&&v.sortOrder>=0?v.sortOrder:index})),labels:data.labels};
}
export function libraryAncestors(data:LibraryData,folder:string|null):LibraryItem[] {
  const path:LibraryItem[]=[],seen=new Set<string>();let current=folder;
  while(current&&!seen.has(current)){seen.add(current);const v=data.items.find(v=>v.id===current&&v.kind==='folder');if(!v)break;path.unshift(v);current=v.parent;}
  return path;
}
function records(data:LibraryData){
  return new Map<string,LibraryChange>([
    ...data.labels.map(value=>['tag:'+value.id,{kind:'tag',id:value.id,value}] as [string,LibraryChange]),
    ...data.items.map(value=>[value.kind+':'+value.id,{kind:value.kind,id:value.id,value}] as [string,LibraryChange]),
  ]);
}
export function libraryChanges(before:LibraryData,after:LibraryData):LibraryChange[] {
  const previous=records(before),next=records(after);
  return [...new Set([...previous.keys(),...next.keys()])].filter(key=>JSON.stringify(previous.get(key)?.value)!==JSON.stringify(next.get(key)?.value))
    .map(key=>next.get(key)||{...previous.get(key)!,value:null});
}
export function applyLibraryChanges(data:LibraryData,changes:LibraryChange[]):LibraryData {
  const values=records(data);
  for(const change of changes){const key=change.kind+':'+change.id;if(change.value)values.set(key,change);else values.delete(key);}
  const folders=new Set([...values.values()].filter(v=>v.kind==='folder').map(v=>v.id));
  let removed=true;
  while(removed){removed=false;for(const [key,v] of values){
    if(v.kind==='tag'||!v.value)continue;const item=v.value as LibraryItem;
    if(item.parent&&!folders.has(item.parent)){values.delete(key);folders.delete(item.id);removed=true;}
  }}
  const labels=[...values.values()].filter(v=>v.kind==='tag').map(v=>v.value as LibraryLabel);
  const tags=new Set(labels.map(v=>v.id));
  return {items:[...values.values()].filter(v=>v.kind!=='tag').map(v=>{const item=v.value as LibraryItem;return {...item,labels:item.labels.filter(id=>tags.has(id))};})
    .sort((a,b)=>(a.kind===b.kind?0:a.kind==='folder'?-1:1)||a.sortOrder-b.sortOrder||a.id.localeCompare(b.id)),
    labels:labels.sort((a,b)=>a.name.localeCompare(b.name,'sl'))};
}
export function readLegacyLibrary(storage:Pick<Storage,'getItem'>|undefined,userId:string):LibraryData|null {
  try{
    const cache=parse(storage?.getItem('disce-answers-v1:'+userId)||'{}');
    const backup=parse(storage?.getItem('disce-library-legacy-v1:'+userId)||'{}');
    const oldRecords={...backup?.answers,...cache?.answers?.__library__,...backup?.pending,...cache?.pending?.__library__};
    if(Object.keys(oldRecords).length){
      const values=Object.entries(oldRecords).filter(([,v])=>typeof v==='string'&&v).map(([key,v])=>[key,parse(v as string)] as const);
      const data=parseLegacyLibrary(JSON.stringify({items:values.filter(([key])=>key.startsWith('item:')).map(([,v])=>v),labels:values.filter(([key])=>key.startsWith('label:')).map(([,v])=>v)}));
      if(data)return data;
    }
    const own=parseLegacyLibrary(storage?.getItem('disce-library-v1:'+userId)||null);if(own)return own;
    const owner=storage?.getItem('disce-legacy-library-owner');
    return owner&&owner!==userId?null:parseLegacyLibrary(storage?.getItem('disce-library-v1')||null);
  }catch{return null;}
}
export function readLegacyPending(storage:Pick<Storage,'getItem'>|undefined,userId:string):LibraryChange[]{
  try{
    const cache=parse(storage?.getItem('disce-answers-v1:'+userId)||'{}');
    const backup=parse(storage?.getItem('disce-library-legacy-v1:'+userId)||'{}');
    const pending={...backup?.pending,...cache?.pending?.__library__};
    const before=readLegacyLibrary(storage,userId)||{items:[],labels:[]};
    return Object.entries(pending).flatMap(([key,raw])=>{
      const previous=parse(cache?.answers?.__library__?.[key]||backup?.answers?.[key]||'null');
      const previousKind=before.items.find(v=>v.id===key.slice(5))?.kind||previous?.kind;
      // Old empty tombstones did not retain the item kind.
      if(key.startsWith('item:')&&raw===''&&!previousKind)return [
        {kind:'folder' as const,id:key.slice(5),value:null},
        {kind:'book' as const,id:key.slice(5),value:null},
      ];
      const kind=key.startsWith('label:')?'tag':key.startsWith('item:')?(previousKind||'book'):null;
      if(!kind||typeof raw!=='string')return [];
      const value=raw?parse(raw):null;
      return [{kind,id:key.slice(key.indexOf(':')+1),value:value&&kind!=='tag'?{...value,sortOrder:value.sortOrder??0}:value} as LibraryChange];
    });
  }catch{return [];}
}
export function libraryBackend(client:SupabaseClient,_userId:string):LibraryBackend {
  return {
    async initialize(legacy){const {error}=await client.rpc('library_initialize',{p_legacy:legacy});if(error)throw error;},
    async read(){const {data,error}=await client.rpc('library_read');if(error)throw error;return applyLibraryChanges(data as LibraryData,[]);},
    async write(changes){if(!changes.length)return;const {error}=await client.rpc('library_apply_changes',{p_changes:changes});if(error)throw error;},
  };
}
