'use client';

import {useState} from 'react';
import {Languages, Dices, Eraser} from 'lucide-react';
import {StudyText} from './study-text';
import {useAnswers} from './answer-provider';
import type {Bi} from '../lib/volentieri';

function decode<T>(raw:string|undefined,fallback:T):T {try{return raw?JSON.parse(raw):fallback;}catch{return fallback;}}
const W=({text}:{text:string})=><StudyText text={text} context={`volentieri:${text}`}/>;

export function MarkActivity({id,paragraphs,pick=false}:{id:string;paragraphs:Bi[];pick?:boolean}) {
  const {answers,put}=useAnswers('volentieri');
  const [mode,setMode]=useState(false),[paragraph,setParagraph]=useState(0);
  const stored=decode<unknown>(answers[`${id}-marks`],[]);
  const marks=Array.isArray(stored)?stored.filter((item):item is string=>typeof item==='string'):[];
  const toggle=(key:string)=>put(`${id}-marks`,JSON.stringify(marks.includes(key)?marks.filter(k=>k!==key):[...marks,key]));
  return <div className="mark-activity"><div className="activity-toolbar" role="group" aria-label="Način dela z besedilom"><button type="button" aria-pressed={!mode} onClick={()=>setMode(false)}>Razišči besede</button><button type="button" aria-pressed={mode} onClick={()=>setMode(true)}>Označi glagole</button></div>
    {pick&&<label className="activity-select">Objava<select value={paragraph} onChange={e=>setParagraph(Number(e.target.value))}>{paragraphs.map((item,i)=><option value={i} key={i}>{item.it.split('·')[0].trim()}</option>)}</select></label>}
    {paragraphs.map((item,index)=>(!pick||index===paragraph)&&<MarkedParagraph key={index} value={item} index={index} marks={marks} mode={mode} toggle={toggle}/>)}
  </div>;
}
function MarkedParagraph({value,index,marks,mode,toggle}:{value:Bi;index:number;marks:string[];mode:boolean;toggle:(key:string)=>void}) {
  const [translated,setTranslated]=useState(false);
  return <div className="translated-block marked-paragraph"><button type="button" className="translate" aria-label="Prevedi odstavek" aria-pressed={translated} onClick={()=>setTranslated(!translated)}><Languages size={15}/><span>SL</span></button>{translated&&<p lang="sl">{value.sl}</p>}<p lang="it" className={translated?'instruction-original':''}>{value.it.split(/(-?\p{L}+(?:-\p{L}+)*(?:\/[ao])?)/u).map((part,i)=>{
    if(!/^-?\p{L}+(?:-\p{L}+)*(?:\/[ao])?$/u.test(part))return part;
    const key=`${index}:${i}`,given=value.marked?.includes(part),selected=given||marks.includes(key);
    return mode?<button type="button" key={i} className={`study-word mark-word ${selected?'mark-selected':''}`} aria-pressed={!!selected} aria-label={given?`Tiskani zgled: ${part}`:`${selected?'Odstrani oznako':'Označi'} ${part}`} onClick={()=>{if(!given)toggle(key);}}>{part}</button>:<span className={selected?'mark-selected':''} key={i}><StudyText text={part} context={`volentieri:${value.it}`}/></span>;
  })}</p></div>;
}

const diceVerbs=['guardare','correre','partire','finire','pranzare','pulire'];
const dicePersons=['io','tu','lui / lei','noi','voi','loro'];
export function DiceActivity({id}:{id:string}) {
  const {answers,put}=useAnswers('volentieri');
  const saved=decode<{verb?:number;person?:number}>(answers[`${id}-dice`],{});
  const ready=Number.isInteger(saved.verb)&&Number.isInteger(saved.person)&&saved.verb!>=0&&saved.verb!<6&&saved.person!>=0&&saved.person!<6;
  const roll=()=>{put(`${id}-dice`,JSON.stringify({verb:Math.floor(Math.random()*6),person:Math.floor(Math.random()*6)}));put(`${id}-dice-answer`,'');};
  return <div className="dice-activity"><p className="muted">Digitalna različica: prva kocka izbere glagol, druga osebo. Izvirnik uporablja kartico in eno kocko.</p><div className="word-bank"><W text={diceVerbs.join(' · ')}/></div><button type="button" className="primary" onClick={roll}><Dices size={20}/> Vrzi kocki</button><div className="dice-result" aria-live="polite">{ready&&<><div><span className="die" aria-hidden="true">{'⚀⚁⚂⚃⚄⚅'[saved.verb!]}</span><small>Glagol</small><W text={diceVerbs[saved.verb!]}/></div><div><span className="die" aria-hidden="true">{'⚀⚁⚂⚃⚄⚅'[saved.person!]}</span><small>Oseba</small><W text={dicePersons[saved.person!]}/></div></>}</div><label>Glagol v izbrani osebi<input aria-label="Odgovor pri igri spreganja" disabled={!ready} value={answers[`${id}-dice-answer`]||''} onChange={e=>put(`${id}-dice-answer`,e.target.value)}/></label></div>;
}

const buildings=['museo','scuola','biblioteca','ristorante','bar','pasticceria','ospedale','stazione','teatro','piscina','supermercato','chiesa'];
const colors=[['rosso','#d25568'],['giallo','#d5b35b'],['blu','#658fce'],['verde','#80a372'],['nero','#555966'],['bianco','#c5c9d4']];
const slots=[[50,10],[72,10],[13,46],[47,42],[72,34],[93,35],[7,79],[26,70],[71,62],[93,61],[31,91],[52,91],[82,91]];
type Placed={name:string;color:string};
export function NeighbourhoodActivity({id}:{id:string}) {
  const {answers,put}=useAnswers('volentieri');const [building,setBuilding]=useState('museo'),[custom,setCustom]=useState(''),[color,setColor]=useState('#658fce'),[remove,setRemove]=useState(false);
  const value=decode<unknown>(answers[`${id}-map`],{});
  const placed:Record<string,Placed>=value&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,Placed>:{};
  function place(index:number){const next={...placed};if(remove)delete next[index];else next[index]={name:custom.trim()||building,color};put(`${id}-map`,JSON.stringify(next));}
  return <div className="neighbourhood-activity"><div className="word-bank"><W text={buildings.join(' · ')}/></div><div className="map-tools"><label>Stavba<select value={building} onChange={e=>{setBuilding(e.target.value);setRemove(false);}}>{buildings.map(name=><option key={name}>{name}</option>)}</select></label><label>Barva<select value={color} onChange={e=>setColor(e.target.value)}>{colors.map(([name,code])=><option value={code} key={code}>{name}</option>)}</select></label><button type="button" aria-pressed={remove} onClick={()=>setRemove(!remove)}><Eraser size={17}/> Odstranjevanje</button></div><p className="muted">Izberi stavbo in barvo, nato mesto na načrtu. Ponoven izbor mesta stavbo zamenja. Za brisanje vključi odstranjevanje. Park, kiosk in kino iz izvirnika ostanejo.</p>
    <label className="custom-building">Ali izmisli svojo stavbo<input maxLength={40} value={custom} onChange={e=>{setCustom(e.target.value);setRemove(false);}} placeholder="Ime izmišljene stavbe…"/></label>
    <div className="neighbourhood-map"><img src="/material/volentieri/v39-map.png" alt="Izvirni načrt četrti s parkom, kioskom, kinom in praznimi stavbnimi mesti"/>{slots.map(([left,top],index)=>{const item=placed[index];return <button type="button" key={index} style={{left:`${left}%`,top:`${top}%`,borderColor:item?.color||undefined}} className={item?'map-place map-place-filled':'map-place'} aria-label={`Mesto ${index+1}${item?.name?`, ${item.name}`:', prazno'}; ${remove?'odstrani stavbo':`postavi ${custom.trim()||building}`}`} title={item?.name||`Mesto ${index+1}`} onClick={()=>place(index)}><span>{item?.name||index+1}</span></button>;})}</div>
    <div className="map-legend" aria-live="polite">{slots.map((_,i)=>placed[i]?.name&&<span key={i}>{i+1} · {buildings.includes(placed[i].name)?<W text={placed[i].name}/>:placed[i].name}</span>)}</div></div>;
}
