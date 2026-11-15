import fs from 'node:fs';
import {registerHooks} from 'node:module';
registerHooks({resolve(specifier,context,nextResolve){return nextResolve(specifier==='./worksheet-lexicon'?specifier+'.ts':specifier,context);}});
const {lookup,lookupInContext}=await import('../lib/lexicon.ts');
const source=fs.readFileSync('components/textbook-app.tsx','utf8');
const instructions=Array.from(source.matchAll(/\bit="([^"]+)"/g),m=>m[1]);
const content=`Mi presento. Comunicare in classe. In classe. L’insegnante. Lo studente. La studentessa. Buongiorno! Mi chiamo Silvia. Sono italiana, di Roma. Sono la vostra insegnante. Mi chiamo Joey. Sono australiano, di Sydney. Sono studente. Studio Economia. Mi chiamo Norma. Sono spagnola, di Madrid. Lavoro. Faccio la fotografa. Come ti chiami? Di dove sei? Che cosa fai? italiano francese portoghese spagnolo la mia lingua. studente insegnante ascoltare leggere parlare scrivere guardare. Come si dice I like? Come si scrive Ciao? Che cosa significa lavagna? Che cos’è la lavagna? Leggi a pagina 17! Hai capito? C, i, a, o. Scusi, non ho capito. Sì, ho capito. Blackboard. Mi piace. Studente Come si dice? Si dice GELATO COMPUTER. Come si dice ordinateur? Come si dice ice-cream?`;
const words=new Set([...instructions,content].join(' ').match(/\p{L}+/gu));
const missing=[...words].filter(w=>!lookup(w));
if(missing.length){console.error('Manjkajoči prevodi:',missing.join(', '));process.exitCode=1}else console.log(`Slovar pokriva ${words.size} oblik v navodilih in učnem besedilu obeh strani.`);
const ids=[...source.matchAll(/<Instruction id="([^"]+)"/g)].map(m=>m[1]);
if(ids.join(',')!=='1a,1b,1c,1,2a,2b')throw Error('Številčenje ne ustreza preverjenemu izvirniku.');
console.log('Številčenje: tiskana 9 = 1a, 1b, 1c; tiskana 10 = 1, 2a, 2b.');

const worksheet=await import('../lib/worksheet.ts');
const worksheetWords=new Set();
function collect(value){
  if(Array.isArray(value)){value.forEach(collect);return;}
  if(value&&typeof value==='object'){
    if(typeof value.it==='string') addWords(value.it.replace(/\[\[[^\]]*\]\]/g,''));
    else Object.values(value).forEach(collect);
  }
}
function addWords(value){for(const word of value.match(/\p{L}+(?:-\p{L}+)*/gu)||[])worksheetWords.add(word);}
Object.values(worksheet).forEach(collect);
for(const key of ['persons','subjects','sentenceVerbs','sentenceObjects','people'])worksheet[key].forEach(addWords);
for(const model of [...worksheet.regularModels,...worksheet.reflexiveModels,...worksheet.irregularModels])model.forms.forEach(addWords);
worksheet.emails.forEach(email=>email.bank.forEach(addWords));
const worksheetSource=fs.readFileSync('components/worksheet.tsx','utf8');
for(const match of worksheetSource.matchAll(/value="([^"]+)"/g))addWords(match[1]);
for(const match of worksheetSource.matchAll(/content.text\('([^']*)'/g))addWords(match[1]);
['cant-ARE','scriv-ERE','apr-IRE','fin-IRE','cant-o','scriv-i','apr-e','fin-iamo','scriv-ete','cant-ano','Soggetto','Verbo','Oggetto'].forEach(addWords);
const missingWorksheet=[...worksheetWords].filter(word=>!lookupInContext(word,'worksheet:'+word));
if(missingWorksheet.length){console.error('Manjkajo?i prevodi delovnega lista:',missingWorksheet.join(', '));process.exitCode=1;}
else console.log('Delovni list: slovar pokriva '+worksheetWords.size+' oblik v vseh sedmih straneh.');

const expectedSections=['6.1','6.2','6.3','6.4','6.5','6.6','1','2','3','4','5','6','7','8','9','10'];
const actualSections=[...worksheetSource.matchAll(/<Section id="([^"]+)"/g)].map(match=>match[1]);
if(actualSections.join(',')!==expectedSections.join(','))throw Error('Worksheet sections do not match the source.');
for(const item of [...worksheet.emails,...worksheet.motherTexts,{body:worksheet.superstitions},...worksheet.modalSentences.map(body=>({body}))]){
  const count=value=>(value.match(/\[\[[^\]]*\]\]/g)||[]).length;
  if(count(item.body.it)!==count(item.body.sl))throw Error('Translated blanks do not match the original.');
}
for(const models of [worksheet.regularModels,worksheet.reflexiveModels,worksheet.irregularModels]){
  for(const model of models){
    if(model.forms.length!==6)throw Error('A conjugation table must have six persons.');
    for(const form of model.forms){
      for(const word of form.match(/\p{L}+(?:-\p{L}+)*/gu)||[]){
        const entry=lookupInContext(word,'worksheet:'+form);
        if(!entry?.meaning)throw Error('A model form has no translation: '+form);
      }
    }
  }
}
const contextCases=[['ho','Ho 40 anni','sem star/-a'],['ho','ho bevuto','sem'],['cucina','Maria cucina benissimo','kuha'],['c','c’è il sole','tam'],['ricordi','ti ricordi','spomniš se'],['inglese','l’inglese','angleščina']];
for(const [word,context,meaning] of contextCases){if(lookupInContext(word,'worksheet:'+context)?.meaning!==meaning)throw Error('Wrong contextual meaning: '+context);}
console.log('Worksheet sections, conjugation tables, contextual meanings and translated blanks verified.');
