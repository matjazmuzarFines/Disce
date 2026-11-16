'use client';

import { useEffect, useRef, useState } from 'react';
import { Languages, X } from 'lucide-react';
import { StudyText } from './study-text';
import type { Bilingual } from '../lib/worksheet';

export function SourcePage({ src, description, onClose }: {src:string; description:string; onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    const node=dialog.current;
    const trigger=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow='hidden';
    return ()=>{node?.close();document.body.style.overflow=overflow;if(trigger?.isConnected)trigger.focus();};
  },[]);
  return <dialog className="source-dialog" ref={dialog} aria-label={description} onCancel={onClose} onClick={event=>{if(event.target===event.currentTarget)onClose();}}><button type="button" autoFocus onClick={onClose}><X size={18}/> Zapri izvirnik</button><img src={src} alt={description}/></dialog>;
}

export function Instruction({ id, it, sl, scope }: { id: string; it: string; sl: string; scope?: string }) {
  const [translated, setTranslated] = useState(false);
  const original = <StudyText text={it} context={scope ? `${scope}:${it}` : undefined}/>;
  return <div className="instruction">
    <span className="exercise-id">{id}</span>
    <div className="instruction-text">
      <p lang={translated ? 'sl' : 'it'}>{translated ? sl : original}</p>
      {translated && <p className="instruction-original" lang="it">{original}</p>}
    </div>
    <button type="button" className={'translate ' + (translated ? 'active' : '')} onClick={() => setTranslated(!translated)} aria-pressed={translated} aria-label={translated ? 'Skrij slovenski prevod' : 'Prikaži slovenski prevod ob izvirniku'} title={translated ? 'Skrij prevod' : 'Prevedi navodilo'}><Languages size={17}/><span>{translated ? 'IT' : 'SL'}</span></button>
  </div>;
}

export function WorksheetText({ value, context }: { value: string; context?: string }) {
  return <StudyText text={value} context={`worksheet:${context || value}`}/>;
}

export function TranslatedText({ value }: { value: Bilingual }) {
  const [translated, setTranslated] = useState(false);
  return <div className={'translated-block ' + (translated ? 'show-translation' : '')}>
    <button type="button" className="translate" onClick={() => setTranslated(!translated)} aria-pressed={translated} aria-label={translated ? 'Skrij prevod odstavka' : 'Prevedi odstavek'}><Languages size={15}/><span>{translated ? 'IT' : 'SL'}</span></button>
    {translated && <p lang="sl">{value.sl}</p>}
    <p lang="it" className={translated ? 'instruction-original' : ''}><WorksheetText value={value.it}/></p>
  </div>;
}
