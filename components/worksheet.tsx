'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, Eye, Languages, X } from 'lucide-react';
import { WordPanel } from './study-text';
import { Instruction, TranslatedText, WorksheetText as W } from './lesson-content';
import * as content from '../lib/worksheet';
import type { Bilingual } from '../lib/worksheet';

type AnswerProps = { answers: Record<string, string>; put: (id: string, value: string) => void };

function ConjugationTable({ models }: { models: { title: Bilingual; forms: string[] }[] }) {
  return <div className="table-scroll grammar-table"><table><thead><tr><th scope="col">Oseba</th>{models.map(model => <th scope="col" key={model.title.it}><TranslatedText value={model.title}/></th>)}</tr></thead><tbody>{content.persons.map((person, row) => <tr key={person}><th scope="row"><W value={person}/></th>{models.map(model => <td key={model.title.it}><W value={model.forms[row]}/></td>)}</tr>)}</tbody></table></div>;
}

function Section({ id, heading, children }: { id: string; heading: Bilingual; children: React.ReactNode }) {
  return <section className="exercise" id={`worksheet-section-${id}`}><Instruction id={id} {...heading} scope="worksheet"/>{children}</section>;
}

function FillText({ id, value, answers, put }: { id: string; value: Bilingual } & AnswerProps) {
  const [translated, setTranslated] = useState(false);
  let blank = 0;
  const parts = value.it.split(/\[\[([^\]]*)\]\]/g);
  const original = <p lang="it" className="cloze-text">{parts.map((part, index) => {
    if (index % 2 === 0) return <W key={index} value={part} context={value.it}/>;
    const key = `${id}-${blank++}`;
    return <input key={index} aria-label={`${id}, prazno mesto ${blank}${part.trim() ? `, ${part}` : ''}`} value={answers[key] || ''} onChange={event => put(key, event.target.value)} autoComplete="off" spellCheck={false}/>;
  })}</p>;
  return <div className="fill-text"><div className="text-actions"><button type="button" className="translate" aria-pressed={translated} onClick={() => setTranslated(!translated)}><Languages size={15}/>{translated ? 'Skrij prevod' : 'Prevedi besedilo'}</button></div>{translated && <p lang="sl" className="cloze-translation">{value.sl.replace(/\[\[[^\]]*\]\]/g, ' … ')}</p>}{original}</div>;
}

function AnswerField({ id, label, multiline = false, answers, put }: { id: string; label: string; multiline?: boolean } & AnswerProps) {
  return multiline ? <textarea aria-label={label} rows={5} value={answers[id] || ''} onChange={event => put(id, event.target.value)} placeholder="Tvoj odgovor…"/> : <input aria-label={label} value={answers[id] || ''} onChange={event => put(id, event.target.value)} placeholder="Tvoj odgovor…"/>;
}

function Choice({ id, label, options, answers, put }: { id: string; label: string; options: { value: string; label: string }[] } & AnswerProps) {
  return <select aria-label={label} value={answers[id] || ''} onChange={event => put(id, event.target.value)}><option value="">Izberi…</option>{options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select>;
}

function LegacyAnswer({ number, answers }: { number: number; answers: Record<string, string> }) {
  return answers[number] ? <details className="legacy-answer"><summary>Prejšnji zapis za nalogo {number}</summary><p>{answers[number]}</p></details> : null;
}

function OriginalPage({ page, onClose }: { page: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog className="source-dialog" ref={dialog} aria-label={`Izvirnik, PDF stran ${page}, tiskana stran ${page + 37}`} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><button autoFocus onClick={onClose}><X size={18}/> Zapri izvirnik</button><img src={`/material/worksheet-${page}.png`} alt={`Izvirna zaporedna stran PDF-ja ${page}, tiskana stran ${page + 37}`}/></dialog>;
}

export function Worksheet({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(1);
  const [original, setOriginal] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { try { setAnswers(JSON.parse(localStorage.getItem('disce-worksheet-answers') || '{}')); } catch {} setLoaded(true); }, []);
  useEffect(() => { if (loaded) localStorage.setItem('disce-worksheet-answers', JSON.stringify(answers)); }, [answers, loaded]);
  const put = (id: string, value: string) => setAnswers(previous => ({ ...previous, [id]: value }));
  const fields = { answers, put };
  const go = (next: number) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <><div className="lesson-bar"><button onClick={onBack}><ArrowLeft size={16}/> Učbeniki</button><span>Delovni list 1 <ChevronRight size={14}/><b>6 · Il presente indicativo</b></span></div><div className="workspace worksheet-workspace"><aside className="sidebar worksheet-sidebar"><span className="eyebrow">DELOVNI LIST 1</span><div className="unit"><span>6</span><div><b>Il presente indicativo</b><small>Povedni sedanjik</small></div></div>{content.worksheetPages.map((label, index) => <button key={label} className={page === index + 1 ? 'selected' : ''} aria-current={page === index + 1 ? 'page' : undefined} onClick={() => go(index + 1)}><div>{label}<small>Tiskana str. {index + 38} · PDF {index + 1}</small></div>{page === index + 1 && <ChevronRight size={16}/>}</button>)}</aside><main className="lesson worksheet-lesson"><div className="lesson-heading"><div><span className="eyebrow">POGLAVJE 6 / {content.worksheetPages[page - 1].toUpperCase()}</span><h1><W value={content.worksheetTitle.it}/></h1></div><span className="page-number">{page + 37}<small>TISKANA STRAN</small></span></div><div className="source-row"><span>PDF: zaporedna stran {page} · tiskana stran {page + 37}</span><button onClick={() => setOriginal(true)}><Eye size={15}/> Poglej izvirnik</button></div><div key={page}>
    {page === 1 && <>
      <Section id="6.1" heading={content.headings.forms}><ConjugationTable models={content.regularModels}/></Section>
      <Section id="6.2" heading={content.headings.usage}><TranslatedText value={content.text('Il presente indicativo che si usa per:', 'Povedni sedanjik uporabljamo za:')}/><div className="usage-rows">{content.usage.map(row => <article key={row.rule.it}><TranslatedText value={row.rule}/><TranslatedText value={row.example}/></article>)}</div></Section>
      <Section id="6.3" heading={content.headings.reflexives}><TranslatedText value={content.text('Usano sempre i pronomi riflessivi (mi, ti, si, ci, vi, si). Per esempio ricordarsi o vestirsi.', 'Vedno uporabljajo povratne zaimke (mi, ti, si, ci, vi, si). Na primer ricordarsi (spomniti se) ali vestirsi (obleči se).')}/><ConjugationTable models={content.reflexiveModels}/></Section>
      <Section id="6.4" heading={content.headings.regular}><div className="verb-groups">{content.regularGroups.map((group, index) => <article key={group.it}><h3><W value={['-ARE', '-ERE', '-IRE', '-IRE (-isco)'][index]}/></h3><TranslatedText value={group}/></article>)}</div></Section>
    </>}
    {page === 2 && <>
      <Section id="6.5" heading={content.headings.irregular}>{[0, 3, 6, 9].map(start => <ConjugationTable key={start} models={content.irregularModels.slice(start, start + 3)}/>)}</Section>
      <Section id="6.6" heading={content.headings.differences}><div className="grammar-cards">{content.modalUsage.map(item => <article key={item.title.it}><h3><W value={item.title.it}/></h3><TranslatedText value={item.rule}/>{item.examples.map(example => <blockquote key={example.it}><TranslatedText value={example}/></blockquote>)}</article>)}</div></Section>
    </>}
    {page === 3 && <>
      <Section id="1" heading={content.headings.ex1}><div className="table-scroll grammar-table"><table><thead><tr><th scope="col">Oseba</th>{['cant-ARE', 'scriv-ERE', 'apr-IRE', 'fin-IRE'].map(word => <th scope="col" key={word}><W value={word}/></th>)}</tr></thead><tbody>{content.persons.map((person, row) => <tr key={person}><th scope="row"><W value={person}/></th>{[0, 1, 2, 3].map(column => {
        const given: Record<string, string> = { '0-0': 'cant-o', '1-1': 'scriv-i', '2-2': 'apr-e', '3-3': 'fin-iamo', '4-1': 'scriv-ete', '5-0': 'cant-ano' };
        return <td key={column}>{given[`${row}-${column}`] ? <W value={given[`${row}-${column}`]}/> : <AnswerField id={`ex1-${row}-${column}`} label={`Naloga 1, ${person}, ${['cantare', 'scrivere', 'aprire', 'finire'][column]}`} {...fields}/>}</td>;
      })}</tr>)}</tbody></table></div><LegacyAnswer number={1} answers={answers}/></Section>
      <Section id="2" heading={content.headings.ex2}><div className="sentence-banks">{[content.subjects, content.sentenceVerbs, content.sentenceObjects].map((items, column) => <div key={column}><h3><W value={['Soggetto', 'Verbo', 'Oggetto'][column]}/></h3>{items.map((item, index) => <p key={`${index}-${item}`}><span className="bank-number">{column === 0 ? index + 1 : column === 1 ? index + 13 : content.objectLetters[index]}</span><W value={item}/></p>)}</div>)}</div><div className="sentence-matching">{content.subjects.map((subject, index) => <div className="sentence-match" key={index}><span>{index + 1}</span><b><W value={subject}/></b>{index === 1 ? <><span><W value="balla"/></span><span><W value="il tango"/></span></> : <><Choice id={`ex2-verb-${index}`} label={`Naloga 2, ${subject}, glagol`} options={content.sentenceVerbs.map((word, number) => ({ value: String(number + 13), label: `${number + 13} · ${word}` }))} {...fields}/><Choice id={`ex2-object-${index}`} label={`Naloga 2, ${subject}, predmet`} options={content.sentenceObjects.map((word, number) => ({ value: content.objectLetters[number], label: `${content.objectLetters[number]} · ${word}` }))} {...fields}/></>}</div>)}</div><LegacyAnswer number={2} answers={answers}/></Section>
      <Section id="3" heading={content.headings.ex3}><div className="people-bank">{content.people.map((person, index) => <p key={person}><span className="bank-number">{index + 9}</span><W value={person}/></p>)}</div><div className="response-bank worksheet-response-bank">{content.descriptions.map((description, index) => <div key={description.it}><b>{'ABCDEFGH'[index]}</b><TranslatedText value={description}/></div>)}</div><div className="photo-matching">{Array.from({ length: 8 }, (_, index) => <article key={index}><span className="eyebrow">{index + 1}</span><img src={`/material/worksheet-person-${index + 1}.png`} alt={`Izvirna fotografija ${index + 1} iz naloge 3`}/><Choice id={`ex3-person-${index}`} label={`Fotografija ${index + 1}, ime`} options={content.people.map((person, number) => ({ value: String(number + 9), label: `${number + 9} · ${person}` }))} {...fields}/><Choice id={`ex3-description-${index}`} label={`Fotografija ${index + 1}, opis`} options={content.descriptions.map((description, number) => ({ value: 'ABCDEFGH'[number], label: `${'ABCDEFGH'[number]} · ${description.it}` }))} {...fields}/></article>)}</div><LegacyAnswer number={3} answers={answers}/></Section>
    </>}
    {page === 4 && <>
      <Section id="4" heading={content.headings.ex4}><div className="presentation-cards">{content.presentations.map((item, index) => <article key={item.person}><div className="presentation-source"><img src={`/material/worksheet-person-${item.photo}.png`} alt={content.people[item.person]}/><TranslatedText value={item.body}/></div><TranslatedText value={item.start}/><AnswerField id={`ex4-${index}`} label={`Naloga 4, ${content.people[item.person]}`} multiline {...fields}/></article>)}</div><LegacyAnswer number={4} answers={answers}/></Section>
      <Section id="5" heading={content.headings.ex5}>{content.emails.map((email, index) => <article className="email-exercise" key={index}><div className="word-bank"><W value={email.bank.join(' · ')}/></div><FillText id={`ex5-${index}`} value={email.body} {...fields}/></article>)}<LegacyAnswer number={5} answers={answers}/></Section>
    </>}
    {page === 5 && <Section id="6" heading={content.headings.ex6}><div className="reading-cards">{content.motherTexts.map((item, index) => <article key={item.title.it}><img className="reading-photo" src={`/material/worksheet-mother-${index + 1}.png`} alt={index === 0 ? 'Mama z otrokoma' : 'Mama v kuhinji'}/><TranslatedText value={item.title}/><FillText id={`ex6-${index}`} value={item.body} {...fields}/></article>)}</div><TranslatedText value={content.motherQuestion}/><AnswerField id="ex6-comparison" label="Razlike med mamama in primerjava držav" multiline {...fields}/><LegacyAnswer number={6} answers={answers}/></Section>}
    {page === 6 && <>
      <Section id="7" heading={content.headings.ex7}><img className="superstition-picture" src="/material/worksheet-superstitions.png" alt="Italijanski simboli vraževerja: podkev, rožiček, deteljica, petek 17 in geste"/><FillText id="ex7" value={content.superstitions} {...fields}/><LegacyAnswer number={7} answers={answers}/></Section>
      <Section id="8" heading={content.headings.ex8}><div className="response-bank worksheet-response-bank">{content.doctorResponses.map((response, index) => <div key={response.it}><b>{'ABCDEFGHI'[index]}</b><TranslatedText value={response}/></div>)}</div><div className="doctor-matching">{content.doctorQuestions.map((question, index) => <div className="doctor-row" key={question.it}><span className="row-no">{index + 1}</span><TranslatedText value={question}/><Choice id={`ex8-${index}`} label={`Naloga 8, vprašanje ${index + 1}`} options={content.doctorResponses.map((response, number) => ({ value: 'ABCDEFGHI'[number], label: `${'ABCDEFGHI'[number]} · ${response.it}` }))} {...fields}/></div>)}</div><LegacyAnswer number={8} answers={answers}/></Section>
    </>}
    {page === 7 && <>
      <Section id="9" heading={content.headings.ex9}><div className="rewrite-questions">{content.doctorQuestions.map((question, index) => <article key={question.it}><div><span className="row-no">{index + 1}</span><TranslatedText value={question}/></div><AnswerField id={`ex9-${index}`} label={`Naloga 9, vprašanje ${index + 1} v tikanju`} {...fields}/></article>)}</div><LegacyAnswer number={9} answers={answers}/></Section>
      <section className="exercise grammar-tip" aria-label="Pomoč pri naglasu in pomnjenju oblik">{content.accentTips.map(tip => <TranslatedText key={tip.it} value={tip}/>)}</section>
      <Section id="10" heading={content.headings.ex10}><div className="grammar-example"><span className="eyebrow">PRIMER</span><TranslatedText value={content.modalExample}/></div><ol className="modal-sentences">{content.modalSentences.map((sentence, index) => <li key={sentence.it}><FillText id={`ex10-${index}`} value={sentence} {...fields}/></li>)}</ol><LegacyAnswer number={10} answers={answers}/></Section>
    </>}
    </div><div className="page-navigation"><button disabled={page === 1} onClick={() => go(page - 1)}><ArrowLeft size={16}/> Prejšnja stran</button><span>{page} / 7</span><button disabled={page === 7} onClick={() => go(page + 1)}>Naslednja stran <ArrowRight size={16}/></button></div></main><WordPanel/></div>{original && <OriginalPage page={page} onClose={() => setOriginal(false)}/>}</>;
}
