'use client';
import Link from 'next/link';
import {ChevronRight,LibraryBig} from 'lucide-react';
import {useLibrary} from './library-provider';
import {libraryAncestors} from '../lib/library-data';
import {libraryHref,type BookId} from '../lib/workspace-navigation';

export function WorkspaceBreadcrumbs({book,folder}:{book:BookId|null;folder:string|null}){
  const {data}=useLibrary();
  const material=book?data.items.find(item=>item.id===book):null;
  const parent=material?material.parent:folder;
  const path=libraryAncestors(data,parent);
  const title=material?.name||(book==='worksheet'?'Delovni list 1':'Volentieri! A1');
  return <nav className="workspace-breadcrumbs" aria-label="Pot po aplikaciji"><ol><li>{!book&&!path.length?<span aria-current="page"><LibraryBig size={17}/>Moji učbeniki</span>:<Link href={libraryHref()} prefetch={false}><LibraryBig size={17}/>Moji učbeniki</Link>}</li>{path.map((item,index)=><li key={item.id}><ChevronRight size={14} aria-hidden="true"/>{!book&&index===path.length-1?<span aria-current="page">{item.name}</span>:<Link href={libraryHref(item.id)} prefetch={false}>{item.name}</Link>}</li>)}{book&&<li><ChevronRight size={14} aria-hidden="true"/><span aria-current="page">{title}</span></li>}</ol></nav>;
}
