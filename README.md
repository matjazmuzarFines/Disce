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

- Prijava z e-pošto in geslom Supabase uporabnika, temna knjižnica učbenikov in delovnega lista.
- Projektni dogovori in predlogi za potrditev: `PROJECT_RULES.md` (povezano iz `AGENTS.md`).
- Klik na besede v učnem besedilu: lokalni slovar, slovenske razlage, spreganje in oblike pridevnikov.
- Na laptopu je izraz v desnem modulu, na manjšem zaslonu v spodnjem oknu.
- Zaporedne strani sedanjega PDF-ja 4–51 = tiskane strani 9–56; uvod in enote 1–3 z vsemi projekti in povzetki.
- Strukturirane naloge, izvirni slikovni izrezi, prevodi navodil in izbrane slovnične razlage.
- Odgovori se sproti shranjujejo v Supabase; čakajoče spremembe imajo lokalni varnostni zapis po uporabniku. Stare demo odgovore je mogoče uvoziti po prijavi.
- Preverjanje vaje s slikami in povezovanja 2a; prosti prevodi in predstavitve se ne ocenjujejo.
- Prijava uporablja Supabase Auth. Zvočni posnetki še niso dodani.
- Gradivo je v datotekah projekta. Navodila za konfiguracijo, Supabase SQL in Vercel so v docs/SUPABASE_VERCEL.md. Za zagon sta potrebni NEXT_PUBLIC_SUPABASE_URL in NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY v .env.local.

## Izvor slik

PDF v `data/Volentieri_A1.pdf` (ni v Gitu). Lokalna skripta `node scripts/volentieri-assets.mjs` izriše trenutne izvirnike in pripravi slikovne izreze. Izvirnika sta v aplikaciji dostopna za primerjavo. Prikazana naslovnica učbenika je oblikovan nadomestni prikaz, ne izvirna naslovnica.

Produkcijsko preverjanje: `npm.cmd run build`.

Preverjanje pokritosti prevodov in številčenja: `node scripts/check-content.mjs` (Node.js 24+ za neposredno branje TypeScripta).

Knjižnica je na /moji_ucbeniki; učbeniki imajo svoje podstrani. Mape, vsebina map in oznake se shranjujejo v ločene relacijske tabele Supabase. V SQL Editorju zaženi [supabase/20261116_library.sql](supabase/20261116_library.sql). Struktura in prenos podatkov sta opisana v [docs/LIBRARY_DATABASE.md](docs/LIBRARY_DATABASE.md).
