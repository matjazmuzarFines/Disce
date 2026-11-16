'use client';
import {createContext,useContext,useEffect,useState,useSyncExternalStore} from 'react';
import {getBrowserSupabase} from '../lib/supabase/browser';
import {libraryBackend} from '../lib/library-data';
import {LibraryStore} from '../lib/library-store';

const LibraryContext=createContext<LibraryStore|null>(null);
export function LibraryProvider({userId,children}:{userId:string;children:React.ReactNode}){
  const [store]=useState(()=>new LibraryStore(userId,libraryBackend(getBrowserSupabase(),userId)));
  useEffect(()=>{
    let storage:Storage|undefined;try{storage=window.localStorage;}catch{}
    void store.start(storage);
    const retry=()=>{void store.retry();};
    const visibility=()=>{if(document.visibilityState==='hidden')void store.flush();else void store.retry();};
    window.addEventListener('online',retry);window.addEventListener('focus',retry);document.addEventListener('visibilitychange',visibility);
    return()=>{window.removeEventListener('online',retry);window.removeEventListener('focus',retry);document.removeEventListener('visibilitychange',visibility);store.stop();};
  },[store]);
  return <LibraryContext.Provider value={store}>{children}</LibraryContext.Provider>;
}
export function useLibraryStore(){const store=useContext(LibraryContext);if(!store)throw Error('LibraryProvider is required');return store;}
export function useLibrary(){const store=useLibraryStore();const snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,store.getSnapshot);return {...snapshot,retry:store.retry,setData:store.setData};}
export function LibrarySyncStatus(){
  const state=useLibrary();const [retrying,setRetrying]=useState(false);
  const message=state.error||(state.loading?'Nalagam knjižnico iz računa…':state.syncing?'Shranjujem knjižnico…':state.pendingCount?'Spremembe knjižnice čakajo na shranjevanje…':'Knjižnica je shranjena v računu.');
  return <div className={'library-sync-status '+(state.error?'sync-error':'')} role={state.error?'alert':'status'}><span>{message}</span>{state.error&&<button type="button" disabled={retrying} onClick={async()=>{setRetrying(true);try{await state.retry();}finally{setRetrying(false);}}}>{retrying?'Preverjam…':'Poskusi znova'}</button>}</div>;
}
