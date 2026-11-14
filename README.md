# Disce – interaktivni učbeniki

Lokalni prototip aplikacije za učenje italijanščine v slovenščini.

## Zagon

Zahteva Node.js 20.9 ali novejši. V terminalu v projektni mapi:

```powershell
npm.cmd install
npm.cmd run dev
```

Odpri http://localhost:3000. `npm.cmd` deluje tudi pri privzeti omejitvi PowerShell skript.

## Obseg

- Demo vstop z imenom, minimalistična temna izbira učbenika, enota 0.
- Projektni dogovori in predlogi za potrditev: `PROJECT_RULES.md` (povezano iz `AGENTS.md`).
- Klik na besede v učnem besedilu: lokalni slovar, slovenske razlage, spreganje in oblike pridevnikov.
- Na laptopu je izraz v desnem modulu, na manjšem zaslonu v spodnjem oknu.
- Zaporedni strani PDF-ja 11–12 = tiskani strani 9–10.
- Strukturirane naloge, izvirni slikovni izrezi, prevodi navodil in izbrane slovnične razlage.
- Odgovori se sproti shranjujejo v localStorage tega brskalnika. Odjava jih ne izbriše.
- Preverjanje vaje s slikami in povezovanja 2a; prosti prevodi in predstavitve se ne ocenjujejo.
- Prijava je demonstracijska, brez preverjanja identitete. Ni sinhronizacije ali zvočnih posnetkov.
- Gradivo ostaja lokalno. Pred gostovanjem urediti pravo prijavo in zaščito gradiva.

## Izvor slik

PDF v `data/Volentieri A1 - rekonstrukcija.pdf` (ni v Gitu). Lokalna skripta `node scripts/render.mjs` izriše strani, `node scripts/crop.mjs` pripravi izreze. Izvirnika sta v aplikaciji dostopna za primerjavo. Prikazana naslovnica učbenika je oblikovan nadomestni prikaz, ne izvirna naslovnica.

Produkcijsko preverjanje: `npm.cmd run build`.

Preverjanje pokritosti prevodov in številčenja: `node scripts/check-content.mjs` (Node.js 24+ za neposredno branje TypeScripta).
