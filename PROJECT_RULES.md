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

- Volentieri! A1: PDF 11 = tiskana 9 (1a, 1b, 1c); PDF 12 = tiskana 10 (1, 2a, 2b).
- Ločuj številko naloge, številko postavke in oznako zvočnega posnetka.
- Prijava uporablja Supabase Auth z e-pošto in geslom obstoječega uporabnika. Seje se hranijo v piškotkih in osvežujejo prek Next.js proxy.ts. V aplikaciji ni nove registracije.
- Obstoječe odgovore ohrani pri oblikovnih spremembah. Odgovori se shranjujejo v Supabase public.user_answers po uporabniku, učbeniku in polju. Čakajoče spremembe imajo lokalni varnostni zapis, ločen po user_id.
- Ne dodajaj novih učbenikov ali izmišljenega napredka kot vizualnega polnila.

## Potrjevanje in zgodovina

- Učne strani se lahko v prihodnje razdelijo po posameznih nalogah, neodvisno od razdelitve PDF-ja. Ohranimo izvirno številčenje nalog in sklice na tiskano stran ter PDF. Trenutno ostaneta obstoječi dve učni strani.
- 2026-11-14: dodana odmik desnega modula med drsenjem in hkratni prikaz prevedenega navodila z manjšim klikljivim izvirnikom.
- 2026-11-14: dodane potrjene zahteve za temno minimalistično večjezično aplikacijo, prevajanje besed in preverjanje številčenja. Predlagana ime Disce in klik v desni modul še čakata na uporabnikovo oceno.

### Knjižnica učbenikov (potrjeno 2026-11-15)

- Mape in učbeniki so v skupni mreži. Ozek levi meni ima Select all, Create, Premakni, Oznake, Rename in Delete. Izbor poteka s potrditvenimi polji. Rename je omogočen za en izbran element.
- Create odpre pogovorno okno za ime mape in njene oznake. Izbrane učbenike in mape je mogoče premakniti v drugo mapo; premik mape vase ali v njene podmape je onemogočen.
- Pod naslovom sta besedilni filter po imenih in izbira oznake. Filtra veljata za trenutno mapo.
- Barvne oznake vsebujejo največ 8 znakov. Seznam se dopolnjuje ob dodajanju, obstoječe oznake je mogoče ponovno uporabiti. Oznake je mogoče dodati tudi obstoječim učbenikom in mapam.
- Organizacija knjižnice in oznake se hranijo v localStorage tega brskalnika, ločeno po prijavljenem user_id. Prejšnja demo knjižnica se lokalno prenese prvemu prijavljenemu uporabniku in se ohrani tudi v starem ključu.
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
- Izvedba: prijava z e-pošto in geslom obstoječih uporabnikov, ena vrstica odgovora na uporabnika, učbenik in stabilni identifikator polja ter RLS za lastne odgovore. Mape in oznake ostanejo lokalne po uporabniku. Gumb Uvozi v moj račun prenese stare lokalne odgovore; že obstoječi Supabase odgovori se ohranijo.

### Prijava in zanesljivost odgovorov (2026-11-15)

- Vsako spremenjeno polje se po kratkem zamiku samodejno shrani. Zaporedni zapisi istega polja se obdelujejo po vrsti in ohranijo zadnji vnos. Prazna vrednost se shrani kot izbris vsebine odgovora.
- Vmesnik kaže nalaganje, shranjevanje, čakajoče spremembe ali napako z gumbom za ponovni poskus. Ob povrnitvi povezave se shranjevanje ponovno poskusi.
- Lokalni varnostni zapis in čakajoče spremembe so vezani na user_id. Po odjavi se stanje prejšnjega uporabnika odstrani iz aplikacije. Njegovi čakajoči zapisi ostanejo za naslednjo prijavo istega uporabnika.
- Uvoz demo odgovorov je izrecno dejanje prijavljenega uporabnika. Izvede se z ohranitvijo že obstoječih vrstic v Supabase. Stari lokalni podatki se ohranijo. Po uspešnem uvozu se v tem brskalniku označi lastnik uvoza, da se isti demo podatki ne ponujajo drugim računom.
- Gradivo ostaja v datotekah projekta. Izvirniki v public/material ostanejo statične datoteke; prijava in RLS varujeta uporabniške odgovore. Dodatna zaščita neposrednega dostopa do gradiva trenutno ni vgrajena.
- Preverjanje shranjevanja vključuje hitre zaporedne spremembe, vnos med nalaganjem, prekinjeno povezavo, obnovo čakajočih zapisov in ločitev računov. Ukaz je node --experimental-transform-types --test scripts/answer-store.test.mjs.
