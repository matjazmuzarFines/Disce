"use client";
import {createContext,useContext,useEffect,useRef,useState} from 'react';
import {X,Languages} from 'lucide-react';
import {lexicon,lookup,lookupInContext} from '../lib/lexicon';
type Selection={word:string;context:string};
const WordContext=createContext<{selected:Selection|null;select:(word:string,context:string)=>void;close:()=>void}>({selected:null,select:()=>{},close:()=>{}});
export function StudyProvider({children}:{children:React.ReactNode}){const [selected,setSelected]=useState<Selection|null>(null);const trigger=useRef<HTMLElement|null>(null);const select=(word:string,context:string)=>{trigger.current=document.activeElement as HTMLElement;setSelected({word,context})};const close=()=>{setSelected(null);trigger.current?.focus()};return <WordContext.Provider value={{selected,select,close}}>{children}</WordContext.Provider>}
export function StudyText({ text, lang = 'it', context }: { text: string; lang?: string; context?: string }) {
  const { selected, select } = useContext(WordContext);
  // A teaching form such as parl-o or -are stays one selectable expression.
  const parts = text.split(context?.startsWith('worksheet:') ? /(-?\p{L}+(?:-\p{L}+)*)/u : /(\p{L}+)/u);
  return <span lang={lang} className="study-text">{parts.map((part, index) => {
    if (!/^-?\p{L}+(?:-\p{L}+)*$/u.test(part)) return part;
    const active = selected?.word === part;
    return <button
      type="button"
      key={index}
      className={'study-word ' + (active ? 'word-selected' : '')}
      aria-label={`Razloži besedo ${part}`}
      aria-pressed={active}
      onClick={event => {
        event.preventDefault();
        select(part, context || text);
      }}
    >{part}</button>;
  })}</span>;
}
export function WordPanel(){const {selected,select,close}=useContext(WordContext);const [mobile,setMobile]=useState(false);useEffect(()=>{const media=window.matchMedia("(max-width: 950px)");const update=()=>setMobile(media.matches);update();media.addEventListener("change",update);return()=>media.removeEventListener("change",update)},[]);const panel=useRef<HTMLElement>(null);const title=useRef<HTMLHeadingElement>(null);const active=selected||{word:'studente',context:'studente'};const entry=lookupInContext(active.word,active.context);
useEffect(()=>{if(!selected)return;const small=window.matchMedia('(max-width: 950px)').matches;if(small)title.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();close()}if(e.key==='Tab'&&small&&panel.current){const nodes=Array.from(panel.current.querySelectorAll<HTMLElement>('button,select,[tabindex="0"]'));const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===title.current)){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',key);if(small){const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key)}}return()=>document.removeEventListener('keydown',key)},[selected,close]);
return <>{selected&&<button className="word-backdrop" aria-label="Zapri razlago" onClick={close}/>}<aside ref={panel} className={'help-panel word-panel '+(selected?'is-open':'')} role={mobile&&selected?"dialog":undefined} aria-modal={mobile&&selected?true:undefined} aria-label="Razlaga besede"><div className="panel-heading"><span><Languages size={16}/> Razišči izraz</span>{selected&&<button onClick={close} aria-label="Zapri razlago"><X size={17}/></button>}</div><label className="help-label">Izraz<select aria-label="Izberi izraz za razlago" value={active.word.toLowerCase()} onChange={e=>select(e.target.value,active.context.startsWith('worksheet:')?`worksheet:${e.target.value}`:e.target.value)}>{!lookup(active.word)&&<option value={active.word.toLowerCase()}>{active.word}</option>}{Object.keys(lexicon).sort((a,b)=>a.localeCompare(b,'it')).map(w=><option value={w} key={w}>{w}</option>)}</select></label><div className="definition" aria-live="polite"><span>{entry?.kind||'manjkajoč vnos'}</span><h2 ref={title} tabIndex={-1}>{active.word}</h2><strong>{entry?.meaning||'Prevod še ni pripravljen.'}</strong>{entry?.lemma&&<p className="lemma">Osnovna oblika: <b>{entry.lemma}</b></p>}{entry?.note&&<p>{entry.note}</p>}{entry?.forms&&<><h4>{entry.kind==='glagol'?'Sedanjik':'Oblike'}</h4><dl>{entry.forms.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></>}{entry?.example&&<div className="word-example"><p lang="it">{entry.example[0]}</p><p>{entry.example[1]}</p></div>}</div></aside></>}

