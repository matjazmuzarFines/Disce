# Supabase in Vercel

Trenutna aplikacija ima demo vstop. Odgovori se še shranjujejo v brskalnik. Ta dokument in SQL pripravita nastavitev storitev; povezavo prijave in shranjevanja je treba nato vgraditi v aplikacijo.

## Razporeditev podatkov

| Podatki | Predvideno mesto |
| --- | --- |
| Učno besedilo, slovar, slike in ogled izvirnikov | Datoteke projekta, objavljene skupaj z aplikacijo na Vercelu |
| Uporabniki, gesla in prijavne seje | Supabase Auth, vgrajena tabela auth.users |
| Odgovori na posamezna polja | Supabase, tabela public.user_answers |
| Mape in oznake knjižnice | Za zdaj localStorage brskalnika |

»Gradivo lokalno« tu pomeni datoteke v repozitoriju. Vercel dobi kopijo teh datotek ob objavi. Mapa data/ je izključena iz Gita. Aplikacija uporablja učne komponente v app/, components/ in lib/ ter slikovne datoteke v public/material/. Poskrbi, da so tudi nove datoteke del commita.

## Supabase

1. Odpri obstoječi Supabase projekt, namenjen tej aplikaciji.
2. V Authentication preveri, da je omogočena prijava z e-pošto in geslom. V nastavitvah prijave izklopi Allow new users to sign up, ker želiš uporabljati obstoječe uporabnike.
3. V Authentication → Users preveri svojega uporabnika. Če ga še ni, ga ustvari prek Add user → Create new user in nastavi e-pošto ter geslo. Če uporabnik že obstaja in gesla ne poznaš, uporabi obnovitev gesla.
4. V SQL Editor odpri novo poizvedbo, prilepi vsebino datoteke supabase/migrations/202611150001_user_answers.sql in jo zaženi. Tabela bo sprva prazna.
5. V nastavitvah API oziroma oknu Connect poišči Project URL ter publishable key. Podatka bosta uporabljena v aplikaciji.
6. V Authentication → URL Configuration dodaj http://localhost:3000 med dovoljene razvojne povratne naslove. Po objavi nastavi Site URL na dejanski produkcijski naslov in dovoli tudi potrebne produkcijske poti za povratne povezave. To je potrebno za tokove s povezavami po e-pošti, kot sta potrditev in obnova gesla.

Pri bodoči vgradnji uporabi @supabase/supabase-js in @supabase/ssr. Strežniška prijava uporablja piškotke, preverjanje uporabnika in osveževanje seje po aktualnem vodiču za Next.js. Osnovni tok prijave bo e-pošta in geslo. Za obnovitev gesla je treba dodati tudi ustrezno povratno stran in nastavitev e-poštnega pošiljanja.

Lokalna datoteka .env.local bo vsebovala naslednji spremenljivki. Vrednosti zamenjaj s podatki svojega projekta.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Aplikacija za prijavo in uporabniško shranjevanje uporablja publishable key z uporabnikovo sejo ter RLS. Secret oziroma service_role ključ omogoča širši strežniški dostop in ne sodi v NEXT_PUBLIC spremenljivke.

## Odgovori in obstoječi zapisi

Ena vrstica vsebuje user_id, book_id, field_id, answer ter časa nastanka in spremembe. Primarni ključ je kombinacija uporabnika, učbenika in polja. Ponovno shranjevanje istega polja posodobi njegovo vrstico. RLS dovoljuje uporabniku branje, pisanje in brisanje lastnih odgovorov.

Obstoječi podatki so naslednji.

| Ključ v localStorage | Vsebina | Prihodnji book_id |
| --- | --- | --- |
| parola-answers | Odgovori učbenika Volentieri! A1 | volentieri |
| disce-worksheet-answers | Odgovori delovnega lista, tudi prejšnji skupni zapisi | worksheet |
| disce-library-v1 | Mape, prikazna imena in oznake knjižnice | Ostane lokalno |
| parola-name | Ime demo uporabnika | Prijavno ime bo vezano na Supabase uporabnika |

Ob povezavi bo treba po prvi pravi prijavi ponuditi uvoz obstoječih lokalnih odgovorov v izbrani račun. Uvoz mora ohraniti podatke v brskalniku in že shranjene odgovore v Supabase. Pri novih vnosih se shrani posamezno spremenjeno polje. Vmesnik mora pokazati stanje shranjevanja in napako ter omogočiti ponovni poskus. Lokalni začasni zapisi morajo biti ločeni po user_id. Odjava mora odstraniti podatke prejšnjega uporabnika iz stanja aplikacije.

Gradivo mora ohraniti stabilne book_id in field_id tudi ob spremembah videza. Primer field_id je predstavitev-0 za učbenik ali ex1-0-1 za delovni list. Nova različica vsebine, ki spremeni pomen polja, potrebuje nov identifikator.

## Vercel

1. Spremembe projekta, vključno z novimi komponentami in slikami, shrani v Git in potisni v GitHub repozitorij.
2. V Vercelu izberi Add New → Project in uvozi ta repozitorij.
3. Izberi Next.js kot Framework Preset, korensko mapo repozitorija in Node.js 24.x. Build Command je npm run build. Izhodno mapo prepusti Next.js prednastavitvi.
4. V Environment Variables dodaj NEXT_PUBLIC_SUPABASE_URL in NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY za Production. Če želiš preizkusne objave, ju dodaj tudi za Preview.
5. Po vgradnji prave prijave in shranjevanja zaženi Deploy. Sama nastavitev spremenljivk še ne spremeni trenutnega demo vstopa.
6. Dejanski naslov aplikacije vnesi v Supabase URL Configuration. Po spremembi Vercelovih spremenljivk sproži novo objavo, da jih prevzame build.
7. Preveri prijavo, odjavo, osvežitev strani in zapis odgovora. Nato se prijavi v drugem brskalniku in preveri, da se odgovor prenese iz Supabase. Z drugim testnim uporabnikom preveri, da nima dostopa do odgovorov prvega.

## Uradna dokumentacija

- [Supabase prijava z geslom](https://supabase.com/docs/guides/auth/passwords)
- [Nastavitve prijave](https://supabase.com/docs/guides/auth/general-configuration)
- [Next.js in strežniška prijava](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase API ključi](https://supabase.com/docs/guides/getting-started/api-keys)
- [RLS za uporabniške podatke](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Objava repozitorija na Vercelu](https://vercel.com/docs/git)
- [Vercel okoljske spremenljivke](https://vercel.com/docs/environment-variables)
