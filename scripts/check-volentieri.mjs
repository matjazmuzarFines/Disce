import fs from 'node:fs';
import {registerHooks} from 'node:module';
registerHooks({resolve(specifier,context,nextResolve){return nextResolve(['./worksheet-lexicon','./volentieri-lexicon','./volentieri-unit2','./volentieri-unit3','./volentieri-units-lexicon'].includes(specifier)?specifier+'.ts':specifier,context);}});
const {volentieriPages}=await import('../lib/volentieri.ts');
const {lookupInContext}=await import('../lib/lexicon.ts');
const {unitLexicon}=await import('../lib/volentieri-units-lexicon.ts');
for(const [word,entry] of Object.entries(unitLexicon)){
  if(!entry.meaning)throw Error('Missing meaning: '+word);
  if(entry.kind==='glagol'&&entry.forms?.length!==6)throw Error('Missing six-person table: '+word);
}
const expectedIds=['2c,3,4','1a,1b,1c,1d,1e','1a,1b,1c,1d,1e','1','1','1a,1b,1c,2a','2b,3a,3b,3c','4a,4b,5a,5b,5c,6','1a,1b,2a,2b','3a,3b,4a,4b','5a,5b,5c,6,7','1a,1b,1c,1d','2a,2b,2c,3a','3b,3c,4a,4b',',1,2','3,a,b,c,d,e',',,,,,,,,,',',,,,,,,,,'];
expectedIds.push(',1','1a,1b,2a,2b,2c','2d,3a,3b,3c','3d,4a,4b,4c,5a,5b,5c','1a,1b,1c,1d','1e,2a,2b,3a,3b','3c,3d,4a,4b,4c,4d','1a,1b','2a,2b,2c,2d,2e','3a,3b,4a,4b,4c',',1,2','3,4,5',',,,,,,,,,,',',,,,,,,,,',',1','1a,1b,2a,2b','3a,3b,4a,4b,5a,5b','6a,6b,6c,7a,7b','1a,1b,1c','2a,2b,2c,3a','3b,4a,4b,4c,4d,4e','1a,1b,1c','1d,2a,2b,2c','3a,3b,3c,3d,3e',',1,2','3,4,5,6,7,8',',,,,,,,,',',,,,');
if(volentieriPages.length!==46||volentieriPages.some((p,i)=>p.printed!==i+11||p.blocks.map(b=>b.id).join(',')!==expectedIds[i]))throw Error('Pages or task numbers do not match the visually verified source.');
const words=new Set();
function add(text){for(const word of text.replace(/\[\[([^\]]*)\]\]/g,'$1').match(/-?\p{L}+(?:-\p{L}+)*(?:\/[ao])?/gu)||[])words.add(word);}
for(const page of volentieriPages){
  add(page.title.it);
  if(page.pdf!==page.printed-5)throw Error('Wrong page mapping');
  if(!fs.existsSync(`public/material/volentieri/original-${page.printed}.png`))throw Error('Missing original page');
  for(const block of page.blocks){
    add(block.heading.it);
    block.text?.forEach(v=>add(v.it));
    block.mark?.forEach(v=>add(v.it));
    if(block.map)checkImage('v39-map');
    block.bank?.forEach(add);
    block.table?.heads.forEach(add);
    block.table?.rows.flat().forEach(add);
    block.images?.forEach(checkImage);
    for(const row of block.rows||[]){add(row.it);if(row.given)add(row.given);row.options?.forEach(add);if(row.image)checkImage(row.image);}
    for(const row of block.rows||[]){
      const blanks=text=>(text.match(/\[\[[^\]]*\]\]/g)||[]).length;
      if(blanks(row.it)!==blanks(row.sl))throw Error('Translation changes the number of blanks: '+page.printed+' '+block.id);
    }
    if(block.table&&block.table.rows.some(row=>row.length!==block.table.heads.length))throw Error('Table columns do not match: '+page.printed+' '+block.id);
  }
}
function checkImage(name){if(!fs.existsSync(`public/material/volentieri/${name}.png`))throw Error('Missing image '+name);}
const missing=[...words].filter(w=>!lookupInContext(w,'volentieri:'+w));
console.log('Pages:',volentieriPages.length,'Words:',words.size,'Missing:',missing.length);
if(missing.length){console.log(missing.join(', '));process.exitCode=1;}
for(const [word,context,meaning] of [
 ['ho','Ho 23 anni.','sem star/-a'],['ho','Scusi, non ho capito.','sem'],
 ['sei','v-p13-1a-row-6:6:sei','šest'],['russo/a','russo/a','ruski'],['bi','A (a) · B (bi)','črka B'],
])if(lookupInContext(word,'volentieri:'+context)?.meaning!==meaning)throw Error('Incorrect contextual meaning: '+word+' '+context);
console.log('Verified source numbering, page mapping, all assets, table shapes, translated blanks and contextual vocabulary.');
