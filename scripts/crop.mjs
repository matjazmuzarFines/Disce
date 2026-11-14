import fs from 'node:fs';
import {loadImage,createCanvas} from '@napi-rs/canvas';
const im=await loadImage('public/material/page-12.png');
const crops=[[115,142,106,80],[272,140,101,80],[426,141,97,80],[575,151,89,69],[200,253,94,67],[349,247,89,69],[495,251,98,69],[138,796,58,88],[261,794,112,86]];
for(let i=0;i<crops.length;i++){const [x,y,w,h]=crops[i]; const c=createCanvas(w*3,h*3); c.getContext('2d').drawImage(im,x,y,w,h,0,0,w*3,h*3);fs.writeFileSync(`public/material/item-${i+1}.png`,c.toBuffer('image/png'));}
