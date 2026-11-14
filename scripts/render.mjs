import fs from 'node:fs';
import { createCanvas, DOMMatrix, ImageData, Path2D } from '@napi-rs/canvas';
Object.assign(globalThis,{DOMMatrix,ImageData,Path2D});
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
const pdf=await getDocument({data:new Uint8Array(fs.readFileSync('data/Volentieri A1 - rekonstrukcija.pdf')),useSystemFonts:true}).promise;
for(const n of [11,12]){const p=await pdf.getPage(n);const v=p.getViewport({scale:1.6});const c=createCanvas(v.width,v.height);await p.render({canvasContext:c.getContext('2d'),viewport:v,canvas:c}).promise;fs.writeFileSync(`public/material/page-${n}.png`,c.toBuffer('image/png')); console.log(n,v.width,v.height);}
