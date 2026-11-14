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
- Slovar je lokalni in pregledljiv v `lib/lexicon.ts`; brez sprotnih AI klicev. Manjkajočega prevoda ne izmišljaj: označi manjkajoči vnos in ga dopolni pred razširitvijo gradiva.
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
- Prijava je demo, brez gesla; ne prikazuj je kot pravo avtentikacijo.
- Obstoječe odgovore ohrani pri oblikovnih spremembah. Za zdaj se hranijo v localStorage tega brskalnika; niso sinhronizirani in niso vezani na uporabniški račun.
- Ne dodajaj novih učbenikov ali izmišljenega napredka kot vizualnega polnila.

## Potrjevanje in zgodovina

- Učne strani se lahko v prihodnje razdelijo po posameznih nalogah, neodvisno od razdelitve PDF-ja. Ohranimo izvirno številčenje nalog in sklice na tiskano stran ter PDF. Trenutno ostaneta obstoječi dve učni strani.
- 2026-11-14: dodana odmik desnega modula med drsenjem in hkratni prikaz prevedenega navodila z manjšim klikljivim izvirnikom.
- 2026-11-14: dodane potrjene zahteve za temno minimalistično večjezično aplikacijo, prevajanje besed in preverjanje številčenja. Predlagana ime Disce in klik v desni modul še čakata na uporabnikovo oceno.
