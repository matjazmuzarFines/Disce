import fs from 'node:fs';
import {unitCrops} from './volentieri-unit-crops.mjs';
import {createCanvas,loadImage,DOMMatrix,ImageData,Path2D} from '@napi-rs/canvas';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
const pdf=await getDocument({data:new Uint8Array(fs.readFileSync('data/Volentieri_A1.pdf')),useSystemFonts:true}).promise;
const dir='public/material/volentieri';
fs.mkdirSync(dir,{recursive:true});
// Coordinates refer to a 864 × 1172 reference rendering. Only task illustrations,
// photos, maps and the example excerpts required for matching are cut out.
const crops={
11:{'bingo-1':[161,142,120,97],'bingo-2':[292,141,117,94],'bingo-3':[422,138,116,94],'bingo-4':[165,249,124,94],'bingo-5':[298,247,116,88],'bingo-6':[425,245,118,86],
'part-1':[386,383,168,111],'part-2':[346,519,316,118],'part-3':[383,657,282,38],'part-4':[556,383,110,114],'part-5':[566,427,96,66],'part-6':[485,713,125,54],
'task-a':[439,835,168,94],'task-b':[642,822,184,125],'task-c':[101,973,166,127],'task-d':[284,961,157,150],'task-e':[449,955,144,119],'task-f':[616,979,205,89]},
12:{ball:[145,466,145,143],map:[340,462,492,567]},
13:{luck:[108,957,551,151]},
14:{sara:[281,351,134,137],mother:[279,604,134,136],help:[282,858,540,266]},
15:{lorenzo:[608,86,145,142],colin:[688,282,142,139],paolo:[687,644,141,139],map:[1,80,365,827],help:[44,907,715,205]},
16:{a:[106,177,310,193],b:[434,176,310,192],c:[105,384,310,192],d:[434,385,310,190],e:[105,590,310,195],f:[434,589,310,196]},
17:{a:[109,250,171,166],b:[300,265,170,151],c:[492,66,163,218],d:[674,166,124,271]},
18:{handshake:[561,173,214,150]},
19:{class:[319,187,272,383]},
20:{jobs:[229,610,145,205],map:[549,972,251,143]},
22:{ito:[143,240,70,82],julie:[365,275,78,79],carlo:[379,771,140,83]},
23:{paolo:[204,263,75,74],yuyi:[204,382,75,71],emilie:[486,257,78,77],sara:[486,374,78,76],
'famous-a':[501,907,93,91],'famous-b':[606,897,92,99],'famous-c':[709,899,91,100],'famous-d':[497,1011,97,99],'famous-e':[605,1010,96,100],'famous-f':[710,1010,89,99]},
24:{jobs:[415,280,390,281],dialogue1:[76,612,180,148],dialogue3:[269,731,173,131]},
25:{sara:[137,302,148,135],dog:[356,463,177,165],park:[548,463,224,166],berlin:[347,633,425,199],bike:[348,834,208,138],museum:[570,834,203,138]},
26:{'collage-top':[108,260,680,292],'collage-bottom':[375,566,472,270]},
};
Object.assign(crops,unitCrops);
for(let printed=9;printed<=56;printed++){
  const p=await pdf.getPage(printed-5),v=p.getViewport({scale:1.6}),canvas=createCanvas(v.width,v.height);
  await p.render({canvasContext:canvas.getContext('2d'),viewport:v,canvas}).promise;
  fs.writeFileSync(`${dir}/original-${printed}.png`,canvas.toBuffer('image/png'));
  const im=await loadImage(canvas.toBuffer('image/png'));
  for(const [name,[x,y,w,h]] of Object.entries(crops[printed]||{})){
    const sx=im.width/864,sy=im.height/1172;
    const c=createCanvas(Math.round(w*sx),Math.round(h*sy));
    c.getContext('2d').drawImage(im,x*sx,y*sy,w*sx,h*sy,0,0,c.width,c.height);
    if(printed===12&&name==='map'){
      // Keep the map, remove adjacent exercise text outside its silhouette.
      c.getContext('2d').clearRect(0,Math.round(512*sy),Math.round(214*sx),Math.round(55*sy));
    }
    const masks={43:{f:[175,0,72,34],g:[0,0,65,38]},48:{dice:[151,100,93,93]},54:{food:[0,0,140,76]}};
    const mask=masks[printed]?.[name];
    if(mask)c.getContext('2d').clearRect(mask[0]*sx,mask[1]*sy,mask[2]*sx,mask[3]*sy);
    fs.writeFileSync(`${dir}/v${printed}-${name}.png`,c.toBuffer('image/png'));
  }
  console.log(`Tiskana ${printed} / PDF ${printed-5}`);
}
