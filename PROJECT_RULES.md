# Projektna pravila – Disce

Ta dokument je skupni dogovor za celotno aplikacijo. Ob začetku dela ga preberi. Ob novih komponentah ga sproti dopolni z dejanskim vedenjem in jasno loči predloge od uporabnikovih potrjenih zahtev. Uporabnik potrjuje predloge ali poda popravke; popravke vnesi sem in v aplikacijo.

## Potrjene zahteve uporabnika

- Aplikacija je namenjena več učbenikom in več jezikom; italijanščina je prvi jezik, pozneje tudi ruščina. Vmesnik in pomoč sta slovenska.
- Samo temni način. Črna, siva in modra; brez zelene teme. Svetlega načina trenutno ne razvijamo.
- Minimalistično in moderno. Brez sloganov, okrasnih zapolnitev, odvečnih opisov in nepotrebnih modulov. Vsak element mora pomagati pri učenju ali navigaciji.
- Kompaktna glava. Leva navigacija ostane in se bo razvijala z vsebino. Po vstopu je izbira »Moji učbeniki«.
- Ohranimo strukturirane naloge in desni modul za raziskovanje izrazov. Odstranimo besedila tipa »Malo pomoči« in podobna polnila.
- Vsako besedo učnega besedila mora biti mogoče raziskati. Prevod mora biti smiseln v kontekstu. Samostalnik: en osrednji prevod; lahko tudi člen, spol, množina in primer. Glagol: osnovna oblika, pomen izbrane oblike, spreganje in primer. Pridevnik: pomen, oblike po spolu in številu ter primer.
- Navodila ohranijo tudi preklop celotnega navodila v slovenščino. Pod prevodom ostane manjši italijanski izvirnik s klikljivimi besedami za neposredno primerjavo.
- Številčenje nalog vedno preveri ob izvirniku; ne preštevilčuj zaradi videza ali vrstnega reda komponent. Razlikuj enoto, stran in nalogo.
- Vedno povej, ali gre za tiskano stran ali zaporedno stran PDF-ja.
- Po vsaki spremembi preveri build in posodobi delujočo aplikacijo na http://localhost:3000. Če strežnik že teče, uporabi isti strežnik; ne zaganjaj kopij na drugih vratih. Če preverjanje ali zagon ni mogoč, to jasno sporoči.
- Pravil ne spreminjaj tiho v nasprotju z uporabnikovimi potrjenimi zahtevami.

## Trenutni predlogi – čakajo na uporabnikovo potrditev

- Ime **Disce**: latinsko »uči se«. Nevtralno glede učbenika in jezika.
- Besedo raziščemo s klikom ali tipkovnico. Na laptopu se prikaže v desnem modulu, na manjšem zaslonu v spodnjem oknu. Drag and drop trenutno ni potreben.
- Modri poudarki označujejo aktivno navigacijo, dejanja in izbrano besedo.

## Standardi komponent

### Učno besedilo (`StudyText`)

- Izvirno besedilo, ločila in številčenje ostanejo ohranjeni.
- Besede so gumbi, dostopni s tipkovnico. Interakcija ne zahteva hoverja ali vlečenja.
- Slovar je lokalni in pregledljiv v `lib/lexicon.ts` ter namenskem `lib/worksheet-lexicon.ts`; brez sprotnih AI klicev. Manjkajočega prevoda ne izmišljaj: označi manjkajoči vnos in ga dopolni pred razširitvijo gradiva.
- Imena so označena kot lastna imena. Tuji primeri so označeni z ustreznim jezikom. Izraz v celoti je mogoče pojasniti kot slovnično zvezo.
- Izvirne slike in ogled PDF-ja niso interaktivno besedilo. Besede v slikovnih nalogah so zato na voljo tudi kot ločeno interaktivno besedilo.
- Nativni izbirniki ne omogočajo gumbov znotraj možnosti; njihove besede morajo biti dosegljive tudi v besednem naboru nad nalogo.

### Modul izraza (`WordPanel`)

- Na laptopu sledi drsenju z 20 px odmika od vrha in vsaj 20 px prostora spodaj. Daljša vsebina ima svoje drsenje. Na ožjih zaslonih ostane spodnje okno.
- Pokaže izbrano obliko, en osrednji slovenski pomen, besedno vrsto in osnovno obliko, kjer je smiselno.
- Glagoli: šest oseb sedanjika; pri drugih časih označi konkretno obliko (npr. `capito` je deležnik; `hai capito` je passato prossimo).
- Pridevniki: moška/ženska ednina in množina. Italijanščina nima sklanjanja pridevnikov po sklonih kot slovenščina.
- Primer ima italijansko poved in slovenski prevod.
- Ozko okno ima gumb Zapri, Escape in vrnitev fokusa na sprožilno besedo.

### Naloge in podatki

- Volentieri! A1: v sedanji datoteki `data/Volentieri_A1.pdf` velja PDF 4 = tiskana 9 (1a, 1b, 1c), PDF 5 = tiskana 10 (1, 2a, 2b) in PDF 23 = tiskana 28. Stara sklica PDF 11–12 sta veljala za prejšnjo rekonstrukcijo; ključi obstoječih odgovorov ostanejo isti.
- Ločuj številko naloge, številko postavke in oznako zvočnega posnetka.
- Prijava uporablja Supabase Auth z e-pošto in geslom obstoječega uporabnika. Seje se hranijo v piškotkih in osvežujejo prek Next.js proxy.ts. V aplikaciji ni nove registracije.
- Obstoječe odgovore ohrani pri oblikovnih spremembah. Odgovori se shranjujejo v Supabase public.user_answers po uporabniku, učbeniku in polju. Čakajoče spremembe imajo lokalni varnostni zapis, ločen po user_id.
- Ne dodajaj novih učbenikov ali izmišljenega napredka kot vizualnega polnila.

## Potrjevanje in zgodovina

- Učne strani se lahko v prihodnje razdelijo po posameznih nalogah, neodvisno od razdelitve PDF-ja. Ohranimo izvirno številčenje nalog in sklice na tiskano stran ter PDF. Trenutno so strani razdeljene po izvirnih tiskanih straneh; Volentieri je razširjen do tiskane strani 56.
- 2026-11-14: dodana odmik desnega modula med drsenjem in hkratni prikaz prevedenega navodila z manjšim klikljivim izvirnikom.
- 2026-11-14: dodane potrjene zahteve za temno minimalistično večjezično aplikacijo, prevajanje besed in preverjanje številčenja. Predlagana ime Disce in klik v desni modul še čakata na uporabnikovo oceno.

### Knjižnica učbenikov (potrjeno 2026-11-15)

- Mape in učbeniki so v skupni mreži. Ozek levi meni ima Select all, Create, Premakni, Oznake, Rename in Delete. Izbor poteka s potrditvenimi polji. Rename je omogočen za en izbran element.
- Create odpre pogovorno okno za ime mape in njene oznake. Izbrane učbenike in mape je mogoče premakniti v drugo mapo; premik mape vase ali v njene podmape je onemogočen.
- Pod naslovom sta besedilni filter po imenih in izbira oznake. Filtra veljata za trenutno mapo.
- Barvne oznake vsebujejo največ 8 znakov. Seznam se dopolnjuje ob dodajanju, obstoječe oznake je mogoče ponovno uporabiti. Oznake je mogoče dodati tudi obstoječim učbenikom in mapam.
- Organizacija knjižnice, vsebina map in oznake se shranjujejo v namenske relacijske tabele Supabase, ločeno po prijavljenem user_id. Lokalni zapis je varnostna kopija in vrsta čakajočih sprememb.
- Izbris zahteva potrditev. Izbris mape odstrani tudi elemente v njej iz knjižnice; izvorne datoteke in shranjeni učni odgovori se ohranijo.
- Delovni list 1, Il presente indicativo, obsega PDF strani 1–7 oziroma tiskane strani 38–44. Vseh sedem strani je prepisanih v komponente aplikacije, z razlagami 6.1–6.6 in nalogami 1–10. Dopisane rešitve se prezrejo. Izvirne strani so dostopne prek gumba Poglej izvirnik.

### Gumbi in odzivi (potrjeno 2026-11-15)

- Vsi vidni gumbi imajo sodoben videz z nežnim prelivom in senčenjem ter kratek animiran odziv ob prehodu, fokusu in pritisku. Povratna informacija mora biti vidna tudi pri upravljanju z dotikom in tipkovnico.
- Preklopni gumbi imajo jasno trajno aktivno stanje. Select all po izboru dobi moder poudarek in napis Deselect all; izbrane kartice, potrditvena polja ter števec izbora so jasno označeni.
- Besede v učnem besedilu imajo diskreten preliv, senčenje in odziv barve, ki ohrani berljivost in geometrijo vrstic.
- Onemogočeni gumbi so vizualno umirjeni. Pri sistemski nastavitvi za zmanjšano gibanje se animacije izklopijo, barvni odzivi in prikaz stanja ostanejo.



### Uvoz gradiva in skupni prikaz (potrjeno 2026-11-15)

- Vsaka stran vsakega novega uvoza se v celoti pretvori v učne komponente v slogu obstoječega učbenika. To velja tudi za razlage, naslove, preglednice, primere in odstavke brez odgovarjanja.
- Sken PDF-ja je dovoljen samo v ogledu izvirnika. Zgoraj desno ob sklicu na stran je gumb »Poglej izvirnik«. Glavni učni prikaz vedno uporablja besedilo in komponente aplikacije.
- Vsako izvirno učno besedo je mogoče klikniti ali izbrati s tipkovnico in raziskati v skupnem desnem modulu. Navodila, razlage in odstavki imajo slovenski prevod ter manjši klikljivi izvirnik ob prikazanem prevodu.
- Ročno dopisani odgovori, črtice in opombe se pri prepisu prezrejo. Tiskani primeri in vnaprej izpolnjene celice se ohranijo. Izvirno številčenje in povezave med nalogami se preverijo na vseh straneh.
- Pred dokončanjem preveri vsebino vseh strani in pokritost besedila s slovarjem. Obstoječe shranjene odgovore ohrani tudi ob spremembi oblike nalog.
- Za novo vrsto naloge sam predlagaj in izvedi smiselno interakcijo ter jo opiši v teh pravilih. Uporabnikov popravek nato velja za vse naslednje naloge iste vrste in se vnese v aplikacijo ter pravila.

### Vzorci vrst gradiva – trenutna izvedba, odprta za uporabnikove popravke

- **Razlaga in primeri.** Kartica z izvirno oznako in prevedljivim naslovom. Vsak odstavek ima svoj preklop prevoda; primer je vizualno povezan s pravilom. Besedilo je klikljivo tudi brez vnosa odgovora.
- **Slovnične in spregatvene tabele.** Prava HTML-tabela z označenimi glavami vrstic in stolpcev, temnim videzom ter vodoravnim drsenjem na ozkem zaslonu. Klikljive so osebe, glagolske oblike in naslovi. Razdelitev na koren in končnico ter naglasne oznake se ohranijo, raziskovalnik pa razloži celotno obliko. Dolge tabele se lahko razdelijo v manjše skupine ob ohranjeni vsebini.
- **Izpolnjevanje tabel.** Vsaka izvirna prazna celica ima lastno vnosno polje in dostopno oznako za vrstico ter stolpec. Tiskani zgledi ostanejo izpolnjeni.
- **Dopolnjevanje povedi in odstavkov.** Posamezno polje neposredno na mestu vsake izvirne praznine. Glagolski namigi ostanejo vidni in klikljivi. Prevod ohrani praznine. Besedni nabor je prikazan kot klikljivo besedilo nad nalogo.
- **Povezovanje besed in povedi.** Klikljivi nabori z izvirnimi številkami ali črkami. Vsaka vrstica vsebuje smiselne izbirnike za pripadajoče dele. Besede iz nativnih možnosti so dosegljive tudi zunaj izbirnika.
- **Slikovne naloge.** Iz izvirnika se izrežejo samo fotografije ali ilustracije. Te dobijo nadomestno besedilo in izvirno oznako ter pripadajoča polja oziroma izbirnike. Navodila, imena in opisi so ločeno klikljivo besedilo v slogu aplikacije.
- **Pogovori in predstavitve.** Ločene kartice po govorcu ali osebi; ohranijo se vrstni red replik, imena in izvirno besedilo. Prevod se prikaže ob izvirniku. Pri preoblikovanju sledi namensko polje za novo besedilo in izvirni začetek odgovora.
- **Elektronska sporočila.** Temna besedilna kartica z ohranjenimi odstavki, pozdravom in podpisom. Dopolnjevanje poteka neposredno v sporočilu; besedni nabor in prevod sta ob kartici.
- **Preoblikovanje vprašanj.** Vsaka postavka pokaže izvirno vprašanje, možnost prevoda in svoje polje za novo različico. Ohranijo se sklic na prejšnjo nalogo in številke postavk.
- **Prosto izražanje in primerjava.** Najprej klikljiv, prevedljiv poziv, nato večvrstično polje za odgovor. Avtomatskega ocenjevanja ni brez zanesljivega ključa.

### Razmiki prevodov in priprava gostovanja (2026-11-15)

- Potrjeno: prevod in manjši izvirnik sta tesno skupaj, z 2 px razmika. To velja za navodila in prevedene odstavke.
- Potrjeno: gradivo za izbrane učbenike ostaja v datotekah projekta. Uporabniška prijava se poveže s Supabase uporabniki. Uporabnik želi tudi shranjevanje odgovorov v tabelah Supabase.
- Trenutno stanje: vgrajeni so prava prijava, odjava in nalaganje ter shranjevanje odgovorov v Supabase. Uporabnik je potrdil izvedbo SQL in dodal uporabnika ter konfiguracijo. Povezava z Auth in zavrnitev anonimnega dostopa do tabele sta preverjeni. Prijavo z dejanskim geslom mora preveriti uporabnik.
- Izvedba: prijava z e-pošto in geslom obstoječih uporabnikov, ena vrstica odgovora na uporabnika, učbenik in stabilni identifikator polja ter RLS za lastne odgovore. Mape in oznake se prav tako shranjujejo v Supabase po uporabniku. Gumb Uvozi v moj račun prenese stare lokalne odgovore; že obstoječi Supabase odgovori se ohranijo.

### Prijava in zanesljivost odgovorov (2026-11-15)

- Vsako spremenjeno polje se po kratkem zamiku samodejno shrani. Zaporedni zapisi istega polja se obdelujejo po vrsti in ohranijo zadnji vnos. Prazna vrednost se shrani kot izbris vsebine odgovora.
- Vmesnik kaže nalaganje, shranjevanje, čakajoče spremembe ali napako z gumbom za ponovni poskus. Ob povrnitvi povezave se shranjevanje ponovno poskusi.
- Lokalni varnostni zapis in čakajoče spremembe so vezani na user_id. Po odjavi se stanje prejšnjega uporabnika odstrani iz aplikacije. Njegovi čakajoči zapisi ostanejo za naslednjo prijavo istega uporabnika.
- Uvoz demo odgovorov je izrecno dejanje prijavljenega uporabnika. Izvede se z ohranitvijo že obstoječih vrstic v Supabase. Stari lokalni podatki se ohranijo. Po uspešnem uvozu se v tem brskalniku označi lastnik uvoza, da se isti demo podatki ne ponujajo drugim računom.
- Gradivo ostaja v datotekah projekta. Izvirniki v public/material ostanejo statične datoteke; prijava in RLS varujeta uporabniške odgovore. Dodatna zaščita neposrednega dostopa do gradiva trenutno ni vgrajena.
- Preverjanje shranjevanja vključuje hitre zaporedne spremembe, vnos med nalaganjem, prekinjeno povezavo, obnovo čakajočih zapisov in ločitev računov. Ukaz je node --experimental-transform-types --test scripts/answer-store.test.mjs.

### Oznake – popravek in barve (2026-11-15)

- Potrjeno: gumb »Dodaj oznako« mora delovati, barvna paleta oznak je razširjena.
- Izvedba: na voljo je 18 barv v prilagodljivi mreži. Dodajanje podpira tudi Enter v polju imena. Nova ali ponovno uporabljena oznaka se izbere in pokaže potrditev. Dodelitev elementom potrdi gumb »Shrani«. Identifikatorji oznak in map se ustvarijo tudi pri dostopu prek HTTP brez podpore za `crypto.randomUUID`.


### Volentieri – dokončanje uvoda in enote 1 (2026-11-16)

- Potrjeno: po tiskani strani 10 dodamo celotno nadaljevanje do PDF strani 23 oziroma tiskane strani 28. Obseg vključuje konec enote 0 (tiskane 11–13), enoto 1 Benvenuto! (14–24), projekt (25–26) in obe strani povzetkov (27–28). Takratni obseg se je zaključil pred enoto 2; poznejša razširitev enot 2–3 je opisana spodaj.
- Potrjeno: pri nalogah z manjkajočim videom ali zvokom ohranimo izvirno navodilo in vnosna polja ter jasno označimo manjkajoči posnetek. Posnetkov, njihovih prepisov in rešitev ne izmišljamo.
- Potrjeno: tombola Che cos’è? uporablja ločene izvirne risbe. Gumb kartico označi, drugi klik jo odznači. Stanje je dostopno s tipkovnico in se shrani med odgovore.
- Potrjeno: projekt profila ima urejevalnik in sprotni predogled. Profilno sliko in druge fotografije za zdaj predstavimo z besedilnimi opisi, ki se shranijo skupaj z odgovori. Nalaganje slik ni del te izvedbe.
- Potrjeno: ob novi ali nejasni vrsti naloge vprašamo uporabnika in potrjeni dogovor dodamo pravilom za prihodnje gradivo.
- Izvedba: razvrščanje fotografij uporablja polje za položaj vsake izvirne označene fotografije; več pravilnih povezav uporablja potrditvena polja; intonacija izbiro ?, . ali !; izbira glagola je neposredno v povedi, vnos končnice ostane za izvirno osnovo. Proste predstavitve, igre in pogovori imajo besedilna polja; brez nezanesljivega samodejnega ocenjevanja.
- Izvedba: novih 18 strani uporablja podatke v lib/volentieri.ts in namenski slovar lib/volentieri-lexicon.ts. Vsa nova polja imajo stabilne ključe v-p{tiskana stran}-{naloga}; knjižnica in obstoječi odgovori ostanejo ohranjeni.
- Izvirniki in slikovni izrezi so v public/material/volentieri; izvorne strani nastanejo s scripts/volentieri-assets.mjs iz lokalnega PDF-ja. Pregled se izvede z node scripts/check-volentieri.mjs ter obstoječim node scripts/check-content.mjs in buildom.
- Lokalni naslov, ki uporabniku deluje: http://127.0.0.1:3000.


### Tablice in navigacija (potrjeno 2026-11-16)

- Aplikacija mora biti uporabna tudi na manjši Samsung tablici s tipkovnico, v pokončni in ležeči legi. Točna velikost naprave ni znana. Postavitev se prilagaja razpoložljivi širini, brez raztezanja celotne strani ali odvisnosti od hoverja.
- Gumba Prejšnja stran in Naslednja stran sta na vrhu in dnu vsake učne strani, tako pri Volentieri kot pri delovnem listu. Obe mesti kažeta isti položaj in upoštevata prvo ter zadnjo stran.
- Levi meni uporablja zložljiva poglavja. Volentieri se deli na enoti 0 in 1; enota 1 vsebuje uvod, tri lekcije, projekt in povzetke. Delovni list uporablja svoje poglavje 6. Aktivna pot se ob menjavi strani odpre, stran je označena.
- Izvedba: pri širini do 900 px je meni zložen nad učno stranjo pod gumbom Vsebina učbenika. Izbira strani meni zapre in vrne fokus na njegov gumb. Pri večji širini ostane levo in ima svoje drsenje.
- Izvedba: pri širini do 1199 px je raziskovalnik besed spodnje okno; od 1200 px je desno. Prelom se uporablja tudi za fokus, Escape in zaklep drsenja ter se posodobi ob obračanju naprave.
- Izvedba: na tabličnih širinah so običajni gumbi in vnosna polja visoki najmanj 44 px, polja imajo pisavo 16 px. Besede v učnem besedilu ohranijo inline obliko. Široke tabele se pomikajo znotraj svojega okvirja, ki je dosegljiv tudi s tipkovnico.
- Izvirnik obeh gradiv uporablja dostopno pogovorno okno z gumbom Zapri, tipko Escape, zaklepom drsenja ozadja in vrnitvijo fokusa.
- Preverjanje vključuje knjižnico, prijavo, vseh 20 strani Volentieri in vseh 7 strani delovnega lista; preverijo se širine 390, 600, 800, 960, 1024 in 1280 px ter upravljanje z dotikom in tipkovnico. To je brskalniška simulacija, ne preizkus na uporabnikovi fizični tablici.


### Volentieri – enoti 2 in 3 (potrjeno 2026-11-16)

- Potrjeno: dodamo drugo in tretje poglavje v celoti. Enota 2 In giro per Bologna obsega tiskane strani 29–42 oziroma PDF 24–37; enota 3 È tardi! obsega tiskane strani 43–56 oziroma PDF 38–51. Vključeni so uvodi, vse tri lekcije, oba projekta in povzetki. Skupaj ima učbenik zdaj 48 učnih strani (tiskane 9–56).
- Potrjeno: projekt četrti uporablja izvirni načrt. Stavbo in barvo izberemo, nato jo s klikom ali dotikom postavimo na mesto. Naslednji izbor jo zamenja; način Odstranjevanje jo odstrani. Dovoljena je tudi stavba z lastnim imenom. Park, kiosk in kino iz izvirnika ostanejo. Načrt se shrani kot odgovor.
- Potrjeno: digitalna igra na tiskani strani 48 uporablja dve kocki in polje za odgovor. Prva izbere glagol, druga osebo; izid in odgovor se shranita. Izvirnik ima kartico in eno kocko, kar je ob komponenti jasno povedano. Italijansko navodilo ostane ohranjeno.
- Potrjeno: naloge s podčrtavanjem imajo preklop Razišči besede / Označi glagole. V drugem načinu besede označimo ali odznačimo; v prvem ostanejo na voljo slovarske razlage. Označbe se shranijo, tiskani zgledi pa ostanejo podčrtani. Pri izbiranju objave za označevanje je na voljo izbirnik.
- Izvedba: podatek enote je del vsake nove strani. Navigacija ima enoti 2 in 3 z uvodom, lekcijami, projektom in povzetki; zgornji in spodnji prehod uporabljata celotno število strani. Obstoječi identifikatorji odgovorov ostanejo nespremenjeni, nova polja so ločena po tiskani strani in izvirni oznaki naloge.
- Izvedba: podatki so v lib/volentieri-unit2.ts in lib/volentieri-unit3.ts; dodatni slovar v lib/volentieri-units-lexicon.ts. Slikovni izrezi se ponovljivo ustvarijo iz lokalnega PDF-ja prek scripts/volentieri-assets.mjs in scripts/volentieri-unit-crops.mjs.
- Omejitve ostajajo: posnetki niso priloženi, zato so naloge z videom in zvokom označene, polja pa ostanejo uporabna. Dejavnosti v skupinah in igre po učiteljevih navodilih ohranijo navodila, tiskane zglede ter polja za zapis. Sklicev na dodatke ne preštevilčujemo in ne izmišljamo manjkajočih pravil.
- Preverjanje: vseh 48 strani Volentieri in knjižnica so pregledani v brskalniški simulaciji pri širinah 390, 600, 800, 960, 1024 in 1280 px; preverijo se slike, širina strani, nove interakcije in ohranitev vnosov med stranmi. Vsebinski pregled zajema številčenje, prevode praznin, oblike tabel, slovarsko pokritost in šestosebne spregatve.


### Navigacija in knjižnica v računu (potrjeno 2026-11-16)

- Pristajalna stran s prijavo je brez navigacije. Po prijavi uporabnik pride na /moji_ucbeniki. Izbrani učbenik je nivo globlje: /moji_ucbeniki/volentieri ali /moji_ucbeniki/worksheet.
- Glava vsebuje povezavo Moji učbeniki. Pot pod glavo kaže knjižnico, nadrejene mape in trenutni učbenik. Vračanje iz učbenika odpre njegovo mapo. Dejanski URL ohrani mapo in tiskano stran; delujejo osvežitev, neposredni naslov ter brskalnikova Nazaj in Naprej.
- Čakajoče spremembe imajo lokalno varnostno kopijo po uporabniku. Napaka shranjevanja je vidna in ponovni poskus je mogoč. Pri vrnitvi v okno ali po obnovi povezave se podatki osvežijo. Ponudnika stanja ostaneta aktivna med navigacijo.

### Relacijska baza knjižnice (uporabnikov popravek 2026-11-16)

- Mape in oznake ne sodijo v user_answers. Prejšnja izvedba z book_id __library__ je nadomeščena.
- library_folders: id, user_id, parent_id, name, sort_order in časovni oznaki. library_tags: id, user_id, name, color in časovni oznaki.
- textbooks vsebuje skupni katalog gradiv. library_books vsebuje uporabnikovo ime gradiva, folder_id in sort_order. library_folder_tags in library_book_tags povezujeta elemente z oznakami prek tujih ključev. ID-jev oznak ne shranjujemo v besedilne sezname.
- Sestavljeni tuji ključi vključujejo user_id in preprečujejo povezave med različnimi računi. Tabele imajo RLS, indekse za nadrejene mape, vrstni red in oznake ter preverjanje krožnih map. Izbris mape odstrani organizacijo njene vsebine in povezave; učni odgovori in katalog gradiv ostanejo.
- library_settings označi inicializirano knjižnico, zato se izbrisana gradiva ob naslednji prijavi ne ustvarijo ponovno.
- Branje je enoten posnetek prek library_read. Spremembe elementa in njegovih oznak se zapišejo v eni transakciji prek library_apply_changes. Knjižnica ima samostojen LibraryStore in lokalno vrsto, ločeno od AnswerStore.
- SQL-spremembe uporabnik izvede iz datoteke supabase/20261116_library.sql v Supabase SQL Editorju. Skripta prenese stare zapise __library__, preveri integriteto, jih šele nato odstrani iz odgovorov in prepreči njihovo ponovno vstavljanje. Ob napaki se celotna migracija razveljavi. Ponovni zagon je varen.
- Stara lokalna knjižnica se uvozi le v še neinicializiran račun. Obstoječa knjižnica v bazi ima prednost. Čakajoče spremembe prejšnje različice dobijo svojo vrsto za novo shranjevanje; stari lokalni izvirniki ostanejo ohranjeni.
- Pred izvedbo SQL aplikacija jasno pokaže manjkajočo pripravo baze in ne omogoči urejanja nenaložene knjižnice.
- Preverjanje: scripts/library-database.test.mjs izvaja dejanski PostgreSQL v PGlite (migracija, ponovni zagon, transakcije, RLS, tuji ključi, oznake, cikli in izbris). scripts/library-store.test.mjs preveri ločeno shranjevanje, več odjemalcev, prekinjeno povezavo, staro čakalno vrsto in naslove strani.
