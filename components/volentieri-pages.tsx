'use client';

import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useAnswers } from './answer-provider';
import { Instruction } from './lesson-content';
import { StudyText } from './study-text';
import { volentieriPages, type Bi, type Row } from '../lib/volentieri';
import {MarkActivity,DiceActivity,NeighbourhoodActivity} from './lesson-activities';
import {unitImageLabels} from '../lib/volentieri-media';

function Text({ text, context, bold }: { text: string; context?:string; bold?:string[] }) {
  if(bold?.length)return <span>{text.split(/(\p{L}+)/u).map((part,i)=>bold.some(word=>word.toLocaleLowerCase('it')===part.toLocaleLowerCase('it'))?<strong key={i}><StudyText text={part} context={`volentieri:${context||text}`}/></strong>:<StudyText key={i} text={part} context={`volentieri:${context||text}`}/>)}</span>;
  return <StudyText text={text} context={`volentieri:${context||text}`}/>;
}
function Paragraph({ value }: { value: Bi }) {
  const [translated, setTranslated] = useState(false);
  return <div className="translated-block"><button className={'translate '+(translated?'active':'')} type="button" onClick={()=>setTranslated(!translated)} aria-pressed={translated} aria-label="Preklopi slovenski prevod"><Languages size={15}/><span>{translated?'IT':'SL'}</span></button>{translated&&<p lang="sl">{value.sl}</p>}<p lang="it" className={translated?'instruction-original':''}><Text text={value.it} bold={value.bold}/></p></div>;
}
function Field({ id, label, lines=1 }: { id: string; label: string; lines?: number }) {
  const {answers,put}=useAnswers('volentieri');
  const props={ 'aria-label':label, value:answers[id]||'', onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>put(id,e.target.value), placeholder:'Tvoj odgovor…', autoComplete:'off', spellCheck:false };
  return lines>1?<textarea rows={lines} {...props}/>:<input {...props}/>;
}
function Cloze({ id, value }: { id:string; value:string }) {
  const {answers,put}=useAnswers('volentieri');
  return <span className="cloze-text">{value.split(/\[\[([^\]]*)\]\]/g).map((part,i)=>{
    if(i%2===0)return <Text key={i} text={part} context={`${id}:${value}`}/>;
    const key=`${id}-blank-${(i-1)/2}`;
    return part.includes('/')?<span className="cloze-choice" key={i}><span className="cloze-options"><Text text={part.replaceAll('/',' / ')}/></span><select aria-label={`${id}, prazno mesto ${(i+1)/2}`} value={answers[key]||''} onChange={e=>put(key,e.target.value)}><option value="">Izberi…</option>{part.split('/').map(o=><option key={o}>{o}</option>)}</select></span>:<input key={i} aria-label={`${id}, prazno mesto ${(i+1)/2}`} value={answers[key]||''} onChange={e=>put(key,e.target.value)} autoComplete="off" spellCheck={false}/>;
  })}</span>;
}
function Choice({ id, label, options, multi }: { id:string; label:string; options:string[]; multi?:boolean }) {
  const {answers,put}=useAnswers('volentieri');
  if(multi){
    const selected=(answers[id]||'').split('|').filter(Boolean);
    return <fieldset className="v-multichoice"><legend>{label}</legend>{options.map(option=><label key={option}><input type="checkbox" checked={selected.includes(option)} onChange={()=>put(id,(selected.includes(option)?selected.filter(v=>v!==option):[...selected,option]).join('|'))}/><Text text={option}/></label>)}</fieldset>;
  }
  return <select aria-label={label} value={answers[id]||''} onChange={e=>put(id,e.target.value)}><option value="">Izberi…</option>{options.map(option=><option key={option}>{option}</option>)}</select>;
}
function Picture({ name, label }: {name:string; label:string}) {
  return <figure className="v-picture"><img loading="lazy" src={`/material/volentieri/${name}.png`} alt={label}/><figcaption>{label}</figcaption></figure>;
}
function ExerciseRow({ item, id, number }: {item:Row; id:string; number?:number}) {
  const {answers,put}=useAnswers('volentieri');
  const cloze=item.it.includes('[[');
  const [translated,setTranslated]=useState(false);
  return <article className={'v-row '+(item.toggle?'v-toggle-row':'')}>
    {item.image&&<Picture name={item.image} label={item.sl}/>}
    {item.it&&<div className={'v-row-text '+(number===undefined?'v-unnumbered':'')}>{number!==undefined&&<span className="row-no">{number+1}</span>}<div>{cloze?<><button type="button" className="translate" aria-label="Prevedi poved" aria-pressed={translated} onClick={()=>setTranslated(!translated)}><Languages size={15}/>SL</button>{translated&&<p lang="sl">{item.sl.replace(/\[\[[^\]]*\]\]/g,' … ')}</p>}<p lang="it"><Cloze id={id} value={item.it}/></p></>:<Paragraph value={item}/>}</div></div>}
    {item.toggle?<button type="button" className={answers[id]==='yes'?'primary v-marked':''} aria-pressed={answers[id]==='yes'} onClick={()=>put(id,answers[id]==='yes'?'':'yes')}>{answers[id]==='yes'?'✓ Označeno':'Označi'}</button>:item.given?<div className="v-given"><span className="eyebrow">TISKANI ZGLED</span>{item.given.includes('[[')?<Cloze id={id} value={item.given}/>:<Text text={item.given} context={`${id}:${item.it}:${item.given}`}/>}</div>:item.options?<><div className="v-option-bank" aria-label="Besede iz možnosti"><Text text={item.options.join(' · ')}/></div><Choice id={id} label={item.sl} options={item.options} multi={item.multi}/></>:!cloze?<Field id={id} label={item.sl} lines={item.lines}/>:null}
  </article>;
}

function ProfileEditor() {
  const {answers}=useAnswers('volentieri');
  const labels=[['name','Ime in priimek','Nome e cognome'],['general','Študij, delo in kraj bivanja','Studio, lavoro, dove vivo'],['hobbies','Konjički in strasti','Hobby e passioni'],['personality','Osebnost in slogan','Personalità e slogan'],['description','Opis sebe in svojega življenja','Descrizione di me e della mia vita'],['portrait','Opis profilne slike','La mia immagine'],['photos','Opisi fotografij','Le mie foto']];
  return <div className="v-profile"><div className="v-profile-editor"><h3>Uredi profil</h3><p className="muted">Fotografije za zdaj predstavi z besedilnim opisom. Vnosi se shranjujejo skupaj z odgovori.</p>{labels.map(([key,label,it])=><div className="v-profile-field" key={key}><label htmlFor={`profile-label-${key}`}><Text text={it}/><small>{label}</small></label><Field id={`v-profile-${key}`} label={label} lines={key==='name'?1:3}/></div>)}</div><article className="v-profile-preview" aria-label="Predogled profila"><span className="eyebrow">PREDOGLED PROFILA</span><h2>{answers['v-profile-name']||'Ime in priimek'}</h2>{labels.slice(1).map(([key,label])=><section key={key}><h4>{label}</h4><p>{answers[`v-profile-${key}`]||'…'}</p></section>)}</article></div>;
}

export function VolentieriPageContent({ printed }: {printed:number}) {
  const current=volentieriPages.find(page=>page.printed===printed);
  if(!current)return null;
  return <div className="v-content" key={printed}>{current.blocks.map((block,index)=>{
    const id=`v-p${printed}-${block.id||`reference-${index}`}`;
    return <section className="exercise" key={id}>
      <Instruction id={block.id} {...block.heading} scope="volentieri"/>
      {block.media&&<div className="audio-note">{block.media} · Posnetek še ni dodan. Polja za odgovore ostajajo na voljo.</div>}
      {block.text?.map((value,i)=><Paragraph key={i} value={value}/>)}
      {block.mark&&<MarkActivity id={id} paragraphs={block.mark} pick={block.markPick}/>}
      {block.bank&&<div className="word-bank"><Text text={block.bank.join(' · ')}/></div>}
      {block.images&&<div className="v-image-bank">{block.images.map((name,i)=><Picture key={name} name={name} label={imageLabels[name]||unitImageLabels[name]||(/-[a-i]$/.test(name)?name.slice(-1):`Izvirna ilustracija ${i+1}`)}/>)}</div>}
      {block.rows&&<div className={block.rows.some(r=>r.image)?'v-photo-rows':'v-rows'}>{block.rows.map((item,i)=><ExerciseRow key={i} id={`${id}-row-${i}`} item={item} number={block.numbered&&item.it?i:undefined}/>)}</div>}
      {block.table&&<div className="table-scroll" tabIndex={0} role="region" aria-label="Preglednica, vodoravno pomikanje"><table><thead><tr>{block.table.heads.map((head,i)=><th scope="col" key={i}><Text text={head}/></th>)}</tr></thead><tbody>{block.table.rows.map((cells,r)=><tr key={r}>{cells.map((cell,c)=>c===0?<th scope="row" key={c}><Cloze id={`${id}-table-${r}-${c}`} value={cell}/></th>:<td key={c}><Cloze id={`${id}-table-${r}-${c}`} value={cell}/></td>)}</tr>)}</tbody></table></div>}
      {block.profile&&<ProfileEditor/>}
      {block.dice&&<DiceActivity id={id}/>}
      {block.map&&<NeighbourhoodActivity id={id}/>}
    </section>;
  })}</div>;
}

export const imageLabels:Record<string,string>={
  'v11-task-a':'a · Besedilo za branje', 'v11-task-b':'b · Povedi in fotografije', 'v11-task-c':'c · Povedi za ponavljanje', 'v11-task-d':'d · Fotografije za razvrščanje', 'v11-task-e':'e · Pogovor za dopolnjevanje', 'v11-task-f':'f · Izbira pravilnega odgovora',
  'v12-ball':'Žoga s črkami', 'v12-map':'Zemljevid Italije z mesti', 'v13-luck':'Italijanski simboli sreče in nesreče',
  'v14-sara':'Sara', 'v14-mother':'Sarina mama', 'v15-lorenzo':'Lorenzo', 'v15-colin':'Colin', 'v15-paolo':'Paolo', 'v15-map':'Bologna, Roma, Palermo',
  'v18-handshake':'Rokovanje ob predstavitvi', 'v19-class':'Colin, Maria, Mauricio in Daya v razredu', 'v22-ito':'Ito', 'v22-julie':'Julie',
  'v23-paolo':'a · Paolo', 'v23-yuyi':'b · Yuyi', 'v23-emilie':'c · Émilie', 'v23-sara':'d · Sara',
  'v23-famous-a':'a · Oseba na fotografiji', 'v23-famous-b':'b · Oseba na fotografiji', 'v23-famous-c':'c · Oseba na fotografiji', 'v23-famous-d':'d · Oseba na fotografiji', 'v23-famous-e':'e · Oseba na fotografiji', 'v23-famous-f':'f · Oseba na fotografiji',
  'v24-jobs':'Ilustracije poklicev: inženir, fotograf, tajnica', 'v25-sara':'Sara Ferrari', 'v25-dog':'Sara s psom', 'v25-park':'Park', 'v25-berlin':'Berlin', 'v25-bike':'Kolo', 'v25-museum':'Muzej',
  'v26-collage-top':'Izvirni primeri za novo identiteto', 'v26-collage-bottom':'Primeri konjičkov, knjige in kraja',
  'v14-help':'Ilustracije: informatik, slaščičar, vodnica, sladice, potovanje', 'v15-help':'Ilustracije: nogomet, igranje glasbila, pes, kuhanje, tek', 'v20-jobs':'Daya in Mauricio', 'v20-map':'Ilustrirani zemljevid sveta', 'v22-carlo':'Carlo', 'v24-dialogue1':'Pogovor 1', 'v24-dialogue3':'Pogovor 3',
};
