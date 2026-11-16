import {applyLibraryChanges,libraryChanges,readLegacyLibrary,readLegacyPending,type LibraryBackend,type LibraryChange,type LibraryData} from './library-data';

type Snapshot={data:LibraryData;ready:boolean;loading:boolean;syncing:boolean;pendingCount:number;error:string};
const empty=():LibraryData=>({items:[],labels:[]});
export class LibraryStore {
  private snapshot:Snapshot={data:empty(),ready:false,loading:true,syncing:false,pendingCount:0,error:''};
  private listeners=new Set<()=>void>();
  private queue:LibraryChange[][]=[];
  private storage:Storage|undefined;
  private generation=0;
  private active=false;
  private reading=false;
  private timer:ReturnType<typeof setTimeout>|undefined;
  private writing:Promise<boolean>|null=null;
  constructor(private userId:string,private backend:LibraryBackend){}
  getSnapshot=()=>this.snapshot;
  subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn);};};
  private update(patch:Partial<Snapshot>){this.snapshot={...this.snapshot,...patch,pendingCount:this.queue.length};for(const fn of this.listeners)fn();}
  private persist(){
    try{this.storage?.setItem('disce-library-v2:'+this.userId,JSON.stringify({data:this.snapshot.data,queue:this.queue,legacyPendingImported:true}));}
    catch{this.update({error:'Lokalne varnostne kopije knjižnice ni mogoče shraniti. Pusti stran odprto do shranitve v račun.'});}
  }
  async start(storage?:Storage){
    this.storage=storage;this.active=true;const generation=++this.generation;
    this.update({loading:true,error:''});
    try{
      const cache=JSON.parse(storage?.getItem('disce-library-v2:'+this.userId)||'{}');
      this.queue=Array.isArray(cache.queue)?cache.queue:[];
      if(!cache.legacyPendingImported){const pending=readLegacyPending(storage,this.userId);if(pending.length)this.queue.push(pending);}
      if(cache.data)this.update({data:cache.data});this.persist();
    }catch{this.queue=[];}
    await this.load(generation,true);
  }
  stop(){this.active=false;this.generation++;this.reading=false;this.writing=null;clearTimeout(this.timer);}
  private async load(generation=this.generation,initialize=false){
    this.reading=true;
    try{
      const legacy=readLegacyLibrary(this.storage,this.userId);
      if(initialize||!this.snapshot.ready)await this.backend.initialize(legacy);
      const remote=await this.backend.read();
      if(!this.active||generation!==this.generation)return false;
      try{if(legacy&&this.storage?.getItem('disce-library-v1')&&!this.storage.getItem('disce-legacy-library-owner'))this.storage.setItem('disce-legacy-library-owner',this.userId);}catch{}
      this.update({data:this.queue.reduce(applyLibraryChanges,remote),loading:false,ready:true,error:''});
      this.persist();return true;
    }catch(error){
      if(this.active&&generation===this.generation){
        const code=(error as {code?:string})?.code;
        this.update({loading:false,error:code==='PGRST202'||code==='PGRST205'||code==='42P01'?
          'Baza knjižnice še ni pripravljena. Zaženi supabase/20261116_library.sql v Supabase SQL Editorju in poskusi znova.':
          'Knjižnice ni mogoče naložiti. Lokalni podatki so ohranjeni. Preveri povezavo in poskusi znova.'});
      }
      return false;
    }finally{if(this.active&&generation===this.generation){this.reading=false;if(this.snapshot.ready&&this.queue.length)this.schedule();}}
  }
  setData=(value:LibraryData|((before:LibraryData)=>LibraryData))=>{
    if(!this.active||!this.snapshot.ready)return;
    const next=typeof value==='function'?value(this.snapshot.data):value;
    const changes=libraryChanges(this.snapshot.data,next);if(!changes.length)return;
    this.queue.push(changes);this.update({data:applyLibraryChanges(next,[])});this.persist();this.schedule();
  };
  private schedule(){clearTimeout(this.timer);this.timer=setTimeout(()=>{void this.flush();},350);}
  flush=():Promise<boolean>=>{
    clearTimeout(this.timer);if(this.writing)return this.writing;
    if(!this.active||!this.snapshot.ready||this.reading)return Promise.resolve(false);
    const generation=this.generation;
    const operation=this.save(generation).finally(()=>{if(this.writing===operation)this.writing=null;});
    this.writing=operation;return operation;
  };
  private async save(generation:number){
    this.update({syncing:this.queue.length>0});
    try{
      while(this.queue.length&&this.active&&generation===this.generation){
        const changes=this.queue[0];await this.backend.write(changes);
        if(!this.active||generation!==this.generation)return false;
        this.queue.shift();this.update({error:''});this.persist();
      }
      return true;
    }catch{
      if(this.active&&generation===this.generation)this.update({error:'Spremembe knjižnice še niso shranjene. Preveri povezavo in poskusi znova.'});
      return false;
    }finally{if(this.active&&generation===this.generation)this.update({syncing:false});}
  }
  retry=async()=>{
    if(this.reading)return false;
    if(this.writing)await this.writing;
    if(this.reading)return false;
    if(!await this.load())return false;
    return this.flush();
  };
}
