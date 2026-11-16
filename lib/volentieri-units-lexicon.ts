import type {Entry} from './lexicon';
import {worksheetLexicon} from './worksheet-lexicon';
export const unitLexicon:Record<string,Entry>={};
function add(kind:string,rows:string){for(const row of rows.split('\n')){const [word,meaning,note]=row.split('|');if(word)unitLexicon[word]={kind,meaning,note};}}
add('samostalnik','tabacchi|tobačni izdelki|i tabacchi · bar-tabacchi je bar, kjer prodajajo tudi tobačne izdelke in nekatere druge storitve.');
add('samostalnik',`fermata|postajališče|la fermata · množina le fermate
autobus|avtobus|l’autobus · moški spol · množina gli autobus
quartiere|četrt|il quartiere · množina i quartieri
mappa|zemljevid|la mappa · množina le mappe
edicola|kiosk|l’edicola · ženski spol · množina le edicole
piazza|trg|la piazza · množina le piazze
torre|stolp|la torre · množina le torri
chiesa|cerkev|la chiesa · množina le chiese
stazione|železniška postaja|la stazione · množina le stazioni
ospedale|bolnišnica|l’ospedale · moški spol · množina gli ospedali
biglietti|vozovnice|il biglietto · množina i biglietti
fetta|kos|la fetta · una fetta di torta = kos torte
torta|torta|la torta · množina le torte
nonno|dedek|il nonno · množina i nonni
biglietto|vozovnica|il biglietto · množina i biglietti
palazzo|palača|il palazzo · množina i palazzi
brioche|rogljiček|la brioche · množina le brioche
marmellata|marmelada|la marmellata
fondo|konec|il fondo · là in fondo = tam na koncu
mezzi|sredstva|il mezzo · mezzi di trasporto = prevozna sredstva
trasporto|prevoz|il trasporto
mezzo|sredstvo|il mezzo · mezzo di trasporto = prevozno sredstvo
automobile|avtomobil|l’automobile · ženski spol · množina le automobili
nave|ladja|la nave · množina le navi
motorino|moped|il motorino · množina i motorini
aereo|letalo|l’aereo · moški spol · množina gli aerei
treno|vlak|il treno · množina i treni
metropolitana|podzemna železnica|la metropolitana
articoli|členi|l’articolo · množina gli articoli
vocale|samoglasnik|la vocale · množina le vocali
fontana|vodnjak|la fontana · množina le fontane
pizzeria|picerija|la pizzeria · množina le pizzerie
supermercato|supermarket|il supermercato
carte|karte|la carta · giocare a carte = kartati
conoscente|znanec|il/la conoscente · oba spola
figlio|sin|il figlio · tudi otrok
strumenti|glasbila|lo strumento musicale · množina gli strumenti musicali
strumento|glasbilo|lo strumento · tudi orodje
tamburo|boben|il tamburo · množina i tamburi
violino|violina|il violino · množina i violini
tromba|trobenta|la tromba · množina le trombe
madre|mati|la madre · množina le madri
padre|oče|il padre · množina i padri
chiacchierone|klepetulja|il chiacchierone · moški spol; pridevniško klepetav
aranciata|pomarančna pijača|l’aranciata · ženski spol
clienti|stranke|il cliente / la cliente · množina i/le clienti
arancia|pomaranča|l’arancia · ženski spol
limone|limona|il limone · množina i limoni
crema|krema|la crema
cioccolato|čokolada|il cioccolato
prosciutto|šunka|il prosciutto
tè|čaj|il tè · množina i tè
spremuta|sveže iztisnjen sok|la spremuta · množina le spremute
pasticcino|drobno pecivo|il pasticcino · množina i pasticcini
pizze|pice|la pizza
bicchiere|kozarec|il bicchiere · množina i bicchieri
panini|sendviči|il panino
spremute|sveže iztisnjeni sokovi|la spremuta
colazioni|zajtrki|la colazione
dado|kocka|il dado · množina i dadi
cameriere|natakar|il cameriere · množina i camerieri
biscotti|piškoti|il biscotto
pane|kruh|il pane
cappuccino|kapučino|il cappuccino · množina i cappuccini
euro|evro|l’euro · moški spol · množina gli euro
aperitivo|aperitiv|l’aperitivo · pijača pred obrokom
alcolici|alkoholne pijače|l’alcolico
analcolico|brezalkoholna pijača|l’analcolico · tudi pridevnik brezalkoholen
favore|usluga|il favore · per favore = prosim
sorella|sestra|la sorella · množina le sorelle
patatine|čips|le patatine · lahko tudi ocvrt krompirček
olive|olive|l’oliva
tipi|vrste|il tipo
servizi|storitve|il servizio
francobolli|poštne znamke|il francobollo
ricarica|dobroimetje|la ricarica · ricarica per il cellulare = polnitev dobroimetja
menù|jedilnik|il menù · množina i menù
prezzi|cene|il prezzo
orari|urniki|l’orario
tabelle|tabele|la tabella
mezzogiorno|poldne|il mezzogiorno
mezzanotte|polnoč|la mezzanotte
pausa|odmor|la pausa
shopping|nakupovanje|lo shopping · angleška izposojenka
posti|kraji|il posto
palazzi|palače|il palazzo
concerti|koncerti|il concerto
mercati|tržnice|il mercato
portici|arkade|il portico · pokriti obokani hodniki ob stavbah
motorini|mopedi|il motorino
bolognesi|Bolonjčani|il bolognese / la bolognese
biblioteca|knjižnica|la biblioteca · množina le biblioteche
fotografia|fotografija|la fotografia
ristoranti|restavracije|il ristorante
lasagne|lazanje|la lasagna · v italijanščini pogosto množina
tortellini|tortelini|il tortellino · polnjene testenine
signore|gospod|il signore · množina i signori
negozi|trgovine|il negozio
locali|lokali|il locale
alberi|drevesa|l’albero · moški spol
chiese|cerkve|la chiesa
contrari|nasprotja|il contrario · tu protipomenski pridevniki
minuti|minute|il minuto
coppie|pari|la coppia
esempi|zgledi|l’esempio · moški spol
genitori|starši|il genitore · množina i genitori
fratello|brat|il fratello · množina i fratelli
zio|stric|lo zio · množina gli zii
moglie|žena|la moglie · množina le mogli
oca|goska|l’oca · ženski spol; tu ime namizne igre
videogiochi|videoigre|il videogioco
edifici|stavbe|l’edificio · moški spol
colori|barve|il colore
vie|ulice|la via
piazze|trgi|la piazza
barista|natakar/-ica|il/la barista · oba spola
negoziante|trgovec/-ka|il/la negoziante · oba spola
abitanti|prebivalci|l’abitante · oba spola
vestito|obleka|il vestito · množina i vestiti
frac|frak|il frac
camicia|srajca|la camicia · množina le camicie
occhiali|očala|gli occhiali · množinska beseda
musicista|glasbenik/-ica|il/la musicista
uomo|moški|l’uomo · množina gli uomini
donna|ženska|la donna · množina le donne
capelli|lasje|il capello
barba|brada|la barba
cappello|klobuk|il cappello
succo|sok|il succo
frutta|sadje|la frutta · zbirni samostalnik
nonna|babica|la nonna
sassofono|saksofon|il sassofono
espressioni|izrazi|l’espressione · ženski spol
sintesi|povzetek|la sintesi · množina le sintesi
aeroporto|letališče|l’aeroporto · moški spol
tazza|skodelica|la tazza · množina le tazze
lunedì|ponedeljek|il lunedì · množina i lunedì
martedì|torek|il martedì · množina i martedì
mercoledì|sreda|il mercoledì · množina i mercoledì
giovedì|četrtek|il giovedì · množina i giovedì
venerdì|petek|il venerdì · množina i venerdì
sabato|sobota|il sabato · množina i sabati
domenica|nedelja|la domenica · množina le domeniche
mattina|jutro / dopoldne|la mattina · množina le mattine
programmi|načrti|il programma
fine|konec|il fine · il fine settimana = konec tedna; la fine = zaključek
notte|noč|la notte · množina le notti
problema|težava|il problema · moški spol · množina i problemi
chiavi|ključi|la chiave
azioni|dejanja|l’azione · ženski spol
soluzione|rešitev|la soluzione
taxi|taksi|il taxi · množina i taxi
collega|sodelavec/-ka|il/la collega · oba spola
riunioni|sestanki|la riunione
turisti|turisti|il turista
traffico|promet|il traffico
uffici|pisarne|l’ufficio · moški spol
orario|urnik|l’orario · moški spol
avverbi|prislovi|l’avverbio
frequenza|pogostost|la frequenza
grafico|prikaz|il grafico · tu lestvica pogostosti
avverbio|prislov|l’avverbio
attività|dejavnost|l’attività · ženski spol · množina le attività
ufficio|pisarna|l’ufficio · moški spol
palestra|telovadnica|la palestra
serie|serija|la serie · serie TV = televizijska nadaljevanka
bici|kolo|la bici · skrajšano od bicicletta
proposito|tema|a proposito di = glede / mimogrede o
feste|prazniki|la festa · tudi zabave
gita|izlet|la gita · množina le gite
forum|forum|il forum
weekend|konec tedna|il weekend · angleška izposojenka
programma|načrt|il programma · tudi program
cani|psi|il cane
mercatino|sejem|il mercatino · majhna tržnica
re|kralj|il re
leone|lev|il leone
cappuccini|kapučini|il cappuccino
via|ulica|la via
commesso|prodajalec|il commesso
tennis|tenis|il tennis
mostra|razstava|la mostra · množina le mostre
borgo|manjši kraj|il borgo · pogosto zgodovinsko naselje
band|glasbena skupina|la band · angleška izposojenka
consigli|nasveti|il consiglio
post|objava|il post · spletna objava
mimo|pantomima|il mimo · tudi mimik
vacanza|dopust|la vacanza
novembre|november|novembre · ime meseca
foglio|list|il foglio · množina i fogli
infiniti|nedoločniki|l’infinito
dormigliona|zaspanka|la dormigliona
mattiniera|zgodnja oseba|la mattiniera · ženska, ki zgodaj vstaja
mattine|jutra|la mattina
fretta|naglica|la fretta · in fretta = hitro
ritardo|zamuda|il ritardo · in ritardo = prepozno
doccia|prha|la doccia · fare la doccia = prhati se
piedi|stopala|il piede · a piedi = peš
intervallo|odmor|l’intervallo · moški spol
cortile|dvorišče|il cortile
tipo|vrsta|il tipo · giornata tipo = običajen dan
papa|papež|il papa · razlikuj papà = oče
agenda|rokovnik|l’agenda · ženski spol
colleghi|sodelavci|il collega
spettacolo|predstava|lo spettacolo
corsa|tek|la corsa
riunione|sestanek|la riunione
piscina|bazen|la piscina
impegno|obveznost|l’impegno · tudi dogovor ali načrt
maggio|maj|maggio · ime meseca
voglia|želja|la voglia · avere voglia di = želeti si
funzione|funkcija|la funzione · tu sporazumevalna vloga
proposta|predlog|la proposta
discoteca|diskoteka|la discoteca
montagna|gora|la montagna · in montagna = v gorah
mensa|menza|la mensa
passeggiata|sprehod|la passeggiata
moto|motor|la moto · ženski spol
battute|replike|la battuta
chat|klepet|la chat · spletni pogovor
ragazze|dekleta|la ragazza
ragazzi|fantje|il ragazzo; v nagovoru tudi skupina obeh spolov
peccato|škoda|il peccato · vzklik peccato! = škoda!
disordine|nered|il disordine
camera|soba|la camera
eventi|dogodki|l’evento · moški spol
serata|večer|la serata · kot dogodek ali preživet večer
gara|tekmovanje|la gara · gara di corsa = tekaško tekmovanje
autunno|jesen|l’autunno · moški spol
tour|ogled|il tour · tudi organiziran izlet
fidanzati|partnerji|il fidanzato · tudi zaročenci
sorelle|sestre|la sorella
picnic|piknik|il picnic
partenza|odhod|la partenza
incertezza|negotovost|l’incertezza · ženski spol
ginnastica|gimnastika|la ginnastica
pallacanestro|košarka|la pallacanestro
pallavolo|odbojka|la pallavolo
sci|smučanje|lo sci
pulizie|čiščenje|le pulizie
piatti|krožniki / posoda|il piatto · lavare i piatti = pomivati posodo
denti|zobje|il dente
sere|večeri|la sera
jeans|kavbojke|i jeans · množinska beseda
maglietta|majica|la maglietta`);
add('izraz',`on-line|spletno|angleščina; on-line = na spletu
falso|ne drži|pri izbiri vero / falso; pridevnik lažen
quella|tista|ženska ednina kazalnega zaimka quello
là|tam
ah|a|medmet
quale|kateri
poco|malo
poche|malo|pred samostalnikom ženskega spola v množini
sua|njegova / njena|svojilni zaimek
agli|k / z|a + gli; associa agli strumenti = poveži z glasbili
quant|koliko|quant’è = koliko stane
niente|nič
già|že
meno|manj|pri uri: meno venti = dvajset do
dello|od / za|di + lo
eccomi|tukaj sem|ecco + mi
davanti|pred|davanti a = pred
estate|poletje|l’estate · d’estate = poleti
soprattutto|zlasti
tantissimi|zelo veliko
tante|veliko
pochi|malo
negli|v|in + gli
ecc|itd.|eccetera = in tako dalje
utili|uporabne|množina utile
sul|na|su + il
volentieri|z veseljem
ok|prav|prevzeti izraz
qualcuno|nekdo
espressione|izraz
sull|na|su + l’
essi|oni|osebni zaimek, 3. oseba množine
singolari|edninske|množina singolare
ad|k / za|različica predloga a pred samoglasnikom
quasi|skoraj
interrogative|vprašalne
quest|ta|quest’orario = ta urnik; skrajšani questo
nessuna|nobena
spesso|pogosto
ieri|včeraj
nooo|neee|poudarjen zapis no
tranne|razen
beh|no|medmet
massimo|največ|tu: najpozneje
intorno|okoli|intorno alle 17.30 = okoli 17.30
boh|ne vem|pogovorni medmet
relax|sprostitev|angleška izposojenka
super|odličen|pogovorni poudarek
lì|tam
oppure|ali pa
tantissimo|zelo veliko
tanto|veliko
subito|takoj
hip|hip|angleščina; zvrst hip hop
hop|hop|angleščina; zvrst hip hop
proprio|sploh|non mi piace proprio = sploh mi ni všeč
vabbè|prav|pogovorno va bene
verso|okoli|verso le nove = okoli devetih
sui|o|su + i; informarsi sui programmi = pozanimati se o načrtih
altra|druga
incerti|negotovi
però|vendar
assolutamente|vsekakor
altrimenti|sicer
nord|sever
sud|jug
gratis|brezplačno
quotidiane|vsakdanje
sugli|o|su + gli
ª|vrstilno število|oznaka ženskega spola pri 1ª, 2ª, 3ª
ʃ|glas š|fonetični znak: finisci, finisce
sk|glas sk|fonetični zapis: finisco, finiscono`);
const persons=['io','tu','lui / lei','noi','voi','loro'];
function verb(lemma:string,meaning:string,forms:string[],translations:string[],example:[string,string]){
 const table=persons.map((p,i)=>[p,forms[i]] as [string,string]);unitLexicon[lemma]={kind:'glagol',lemma,meaning,forms:table,example};
 forms.forEach((form,i)=>{const key=form.replace(/^(mi|ti|si|ci|vi) /,'');const previous=unitLexicon[key];unitLexicon[key]={kind:'glagol',lemma,meaning:previous?.lemma===lemma?`${previous.meaning} / ${translations[i]}`:translations[i],forms:table,example,note:`${i%3+1}. oseba ${i<3?'ednine':'množine'} · sedanjik`};});
}
function regular(lemma:string,meaning:string,translations:string,example:[string,string],isc=false){
 const reflexive=lemma.endsWith('si'),infinitive=reflexive?lemma.slice(0,-2)+'e':lemma,stem=infinitive.slice(0,-3),group=infinitive.slice(-3);
 const endings=group==='are'?['o','i','a','iamo','ate','ano']:group==='ere'?['o','i','e','iamo','ete','ono']:isc?['isco','isci','isce','iamo','ite','iscono']:['o','i','e','iamo','ite','ono'];
 const pronouns=['mi','ti','si','ci','vi','si'];verb(lemma,meaning,endings.map((ending,i)=>{let root=stem;if(group==='are'&&/[cg]$/.test(stem)&&ending.startsWith('i'))root+='h';if(group==='are'&&stem.endsWith('i')&&ending.startsWith('i'))root=stem.slice(0,-1);return (reflexive?pronouns[i]+' ':'')+root+ending;}),translations.split(','),example);
}
for(const [lemma,meaning,translations,it,sl,isc] of [
 ['ordinare','naročiti','naročim,naročiš,naroči,naročimo,naročite,naročijo','Ordino un caffè.','Naročim kavo.'],
 ['costare','stati','stanem,staneš,stane,stanemo,stanete,stanejo','Quanto costa il biglietto?','Koliko stane vozovnica?'],
 ['sottolineare','podčrtati','podčrtam,podčrtaš,podčrta,podčrtamo,podčrtate,podčrtajo','Sottolinea il verbo.','Podčrtaj glagol.'],
 ['rileggere','znova prebrati','znova preberem,znova prebereš,znova prebere,znova preberemo,znova preberete,znova preberejo','Rileggi il testo.','Znova preberi besedilo.'],
 ['riguardare','znova pogledati','znova pogledam,znova pogledaš,znova pogleda,znova pogledamo,znova pogledate,znova pogledajo','Riguarda il video.','Znova si oglej video.'],
 ['completare','dopolniti','dopolnim,dopolniš,dopolni,dopolnimo,dopolnite,dopolnijo','Completo la tabella.','Dopolnim tabelo.'],
 ['pranzare','kositi','kosim,kosiš,kosi,kosimo,kosite,kosijo','Pranziamo alle 13.','Kosimo ob enih.'],
 ['invitare','povabiti','povabim,povabiš,povabi,povabimo,povabite,povabijo','Invito un amico.','Povabim prijatelja.'],
 ['disegnare','narisati','narišem,narišeš,nariše,narišemo,narišete,narišejo','Disegnate il quartiere.','Narišite četrt.'],
 ['votare','glasovati','glasujem,glasuješ,glasuje,glasujemo,glasujete,glasujejo','Votate il progetto.','Glasujte za projekt.'],
 ['decidere','odločiti se','odločim se,odločiš se,odloči se,odločimo se,odločite se,odločijo se','Decidiamo insieme.','Odločimo se skupaj.'],
 ['dipingere','pobarvati','pobarvam,pobarvaš,pobarva,pobarvamo,pobarvate,pobarvajo','Dipingo gli edifici.','Pobarvam stavbe.'],
 ['accettare','sprejeti','sprejmem,sprejmeš,sprejme,sprejmemo,sprejmete,sprejmejo','Accetto un invito.','Sprejmem povabilo.'],
 ['rifiutare','zavrniti','zavrnem,zavrneš,zavrne,zavrnemo,zavrnete,zavrnejo','Rifiuto un invito.','Zavrnem povabilo.'],
 ['indicare','pokazati','pokažem,pokažeš,pokaže,pokažemo,pokažete,pokažejo','Indico la piazza.','Pokažem trg.'],
 ['localizzare','določiti položaj','določim položaj,določiš položaj,določi položaj,določimo položaj,določite položaj,določijo položaj','Localizzo il museo.','Določim položaj muzeja.'],
 ['programmare','načrtovati','načrtujem,načrtuješ,načrtuje,načrtujemo,načrtujete,načrtujejo','Programmiamo il weekend.','Načrtujemo konec tedna.'],
 ['accompagnare','spremljati','spremljam,spremljaš,spremlja,spremljamo,spremljate,spremljajo','Accompagno Anna al lavoro.','Anno peljem v službo.'],
 ['visitare','obiskati','obiščem,obiščeš,obišče,obiščemo,obiščete,obiščejo','Visitiamo Bologna.','Obiščemo Bologno.'],
 ['intervistare','izprašati','izprašam,izprašaš,izpraša,izprašamo,izprašate,izprašajo','Intervistate il compagno.','Izprašajte sošolca.'],
 ['ricominciare','znova začeti','znova začnem,znova začneš,znova začne,znova začnemo,znova začnete,znova začnejo','Ricomincio a lavorare.','Spet začnem delati.'],
 ['rilassarsi','sproščati se','sproščam se,sproščaš se,sprošča se,sproščamo se,sproščate se,sproščajo se','Mi rilasso a casa.','Sproščam se doma.'],
 ['divertirsi','zabavati se','zabavam se,zabavaš se,zabava se,zabavamo se,zabavate se,zabavajo se','Ci divertiamo insieme.','Skupaj se zabavamo.'],
 ['riposarsi','počivati','počivam,počivaš,počiva,počivamo,počivate,počivajo','Mi riposo il pomeriggio.','Popoldne počivam.'],
 ['vedersi','videti se','vidim se,vidiš se,vidi se,vidimo se,vidite se,vidijo se','Ci vediamo domani.','Se vidimo jutri.'],
 ['pettinarsi','česati se','češem se,češeš se,češe se,češemo se,češete se,češejo se','Sara si pettina.','Sara se češe.'],
 ['truccarsi','ličiti se','ličim se,ličiš se,liči se,ličimo se,ličite se,ličijo se','Mi trucco la domenica.','Ob nedeljah se ličim.'],
 ['annoiarsi','dolgočasiti se','dolgočasim se,dolgočasiš se,dolgočasi se,dolgočasimo se,dolgočasite se,dolgočasijo se','Mi annoio a casa.','Doma se dolgočasim.'],
 ['mimare','pokazati z gibi','pokažem z gibi,pokažeš z gibi,pokaže z gibi,pokažemo z gibi,pokažete z gibi,pokažejo z gibi','Mimate il verbo.','Glagol pokažite z gibi.'],
 ['recitare','odigrati','odigram,odigraš,odigra,odigramo,odigrate,odigrajo','Recitate il dialogo.','Odigrajte pogovor.'],
 ['informarsi','pozanimati se','pozanimam se,poz an imaš se,poz anim a se,pozanimamo se,pozanimate se,pozanimajo se'.replaceAll('poz an imaš','pozanimaš').replaceAll('poz anim a','pozanima'),'Mi informo sugli orari.','Pozanimam se o urniku.'],
 ['festeggiare','praznovati','praznujem,praznuješ,praznuje,praznujemo,praznujete,praznujejo','Festeggiamo l’esame.','Praznujemo opravljen izpit.'],
 ['organizzare','organizirati','organiziram,organiziraš,organizira,organiziramo,organizirate,organizirajo','Organizzate il weekend.','Organizirajte konec tedna.'],
 ['appendere','obesiti','obesim,obesiš,obesi,obesimo,obesite,obesijo','Appendete il programma.','Obesite program.'],
 ['spostarsi','premikati se','premikam se,premikaš se,premika se,premikamo se,premikate se,premikajo se','Ci spostiamo in treno.','Potujemo z vlakom.'],
 ['vendere','prodajati','prodajam,prodajaš,prodaja,prodajamo,prodajate,prodajajo','Vendono cibi e bevande.','Prodajajo hrano in pijačo.'],
 ['dipendere','biti odvisen','sem odvisen,si odvisen,je odvisen,smo odvisni,ste odvisni,so odvisni','Dipende dal lavoro.','Odvisno je od dela.'],
] as [string,string,string,string,string,boolean?][])regular(lemma,meaning,translations,[it,sl],isc);
verb('salire','vstopiti',['salgo','sali','sale','saliamo','salite','salgono'],['vstopim','vstopiš','vstopi','vstopimo','vstopite','vstopijo'],['Saliamo sull’autobus.','Vstopimo na avtobus.']);
verb('scendere','izstopiti',['scendo','scendi','scende','scendiamo','scendete','scendono'],['izstopim','izstopiš','izstopi','izstopimo','izstopite','izstopijo'],['Scendiamo qui.','Izstopimo tukaj.']);
for(const [form,meaning] of Object.entries({sottolinea:'podčrtaj',sottolineate:'podčrtajte',rileggi:'znova preberi',riguarda:'znova poglej',disegnate:'narišite',votate:'glasujte',decidete:'odločite se',intervistate:'izprašajte',mimate:'pokažite z gibi',recitate:'odigrajte',organizzate:'organizirajte',invitate:'povabite'}))unitLexicon[form]={...unitLexicon[form],meaning,note:'V navodilu: velelnik. Tabela prikazuje povedni sedanjik.'};
regular('trovare','najti','najdem,najdeš,najde,najdemo,najdete,najdejo',['Trovo un amico.','Najdem prijatelja.']);
verb('piacere','biti všeč',['piaccio','piaci','piace','piacciamo','piacete','piacciono'],['sem všeč','si všeč','je všeč','smo všeč','ste všeč','so všeč'],['Mi piace leggere.','Rad/-a berem.']);
const variants:Record<string,[string,string,string]>={
 vorrei:['volere','rad/-a bi','Pogojnik · 1. oseba ednine, vljudna želja.'],vorrebbe:['volere','rad/-a bi','Pogojnik · 3. oseba ednine.'],offrirle:['offrire','ponuditi vam','Nedoločnik offrire z vljudnostnim zaimkom Le.'],leggili:['leggere','preberi jih','Velelnik leggi + li.'],completando:['completare','z dopolnjevanjem','Gerundij.'],arrivati:['arrivare','prispeli','Pretekli deležnik · moška množina; siamo arrivati = smo prispeli.'],visto:['vedere','videl/-a','Pretekli deležnik; ho visto = videl/-a sem.'],andato:['andare','šel','Pretekli deležnik; è andato = je šel.'],perso:['perdere','izgubil/-a','Pretekli deležnik; ha perso l’autobus = zamudil/-a je avtobus.'],detto:['dire','rekli','Pretekli deležnik; mi hanno detto = rekli so mi.'],pensavo:['pensare','mislil/-a sem','Imperfetto · 1. oseba ednine.'],raccontatemi:['raccontare','povejte mi','Velelnik 2. osebe množine z zaimkom mi.'],vederlo:['vedere','videti ga','Nedoločnik vedere + lo.'],vederla:['vedere','videti jo','Nedoločnik vedere + la.'],vederci:['vedersi','videti se','Vzajemna raba: possiamo vederci = se lahko vidimo.'],trovarci:['trovare','obiskati nas','Venite a trovarci = pridite nas obiskat.'],spostarvi:['spostarsi','premikati se','Nedoločnik z zaimkom vi.'],appendetelo:['appendere','obesite ga','Velelnik appendete + lo.'],invitarlo:['invitare','povabiti ga','Nedoločnik invitare + lo.'],vedrai:['vedere','boš videl/-a','Prihodnjik · 2. oseba ednine.'],piacerebbe:['piacere','bi bilo všeč','Pogojnik · 3. oseba ednine.']};
for(const [form,[lemma,meaning,note]] of Object.entries(variants))unitLexicon[form]={...(unitLexicon[lemma]||worksheetLexicon[lemma]),kind:'glagol',lemma,meaning,note};
function adjective(lemma:string,meaning:string,forms:string[]){const labels=['moška ednina','ženska ednina','moška množina','ženska množina'];for(const f of forms)unitLexicon[f]={kind:'pridevnik',lemma,meaning,forms:labels.map((label,i)=>[label,forms[i]]),example:[`È ${forms[0]}.`,`Je ${meaning}.`]};}
for(const row of `corretto|pravilen|corretta|corretti|corrette
alto|visok|alta|alti|alte
freddo|hladen|fredda|freddi|fredde
gasato|gaziran|gasata|gasati|gasate
macchiato|z malo mleka|macchiata|macchiati|macchiate
lungo|dolg|lunga|lunghi|lunghe
diverso|različen|diversa|diversi|diverse
grande|velik|grande|grandi|grandi
medievale|srednjeveški|medievale|medievali|medievali
colorato|pisan|colorata|colorati|colorate
preferito|najljubši|preferita|preferiti|preferite
interessante|zanimiv|interessante|interessanti|interessanti
caro|drag|cara|cari|care
buono|dober|buona|buoni|buone
bolognese|bolonjski|bolognese|bolognesi|bolognesi
vecchio|star|vecchia|vecchi|vecchie
curioso|radoveden|curiosa|curiosi|curiose
tranquillo|miren|tranquilla|tranquilli|tranquille
conosciuto|znan|conosciuta|conosciuti|conosciute
economico|poceni|economica|economici|economiche
antipatico|neprijeten|antipatica|antipatici|antipatiche
noioso|dolgočasen|noiosa|noiosi|noiose
basso|nizek|bassa|bassi|basse
caldo|topel|calda|caldi|calde
brutto|grd|brutta|brutti|brutte
antico|starodaven|antica|antichi|antiche
moderno|sodoben|moderna|moderni|moderne
piccolo|majhen|piccola|piccoli|piccole
ideale|idealen|ideale|ideali|ideali
immaginario|izmišljen|immaginaria|immaginari|immaginarie
acquatico|vodni|acquatica|acquatici|acquatiche
speciale|poseben|speciale|speciali|speciali
particolare|nenavaden|particolare|particolari|particolari
corto|kratek|corta|corti|corte
magro|suh|magra|magri|magre
grasso|debel|grassa|grassi|grasse
minerale|mineralen|minerale|minerali|minerali
liscio|negaziran|liscia|lisci|lisce
scarico|prazen|scarica|scarichi|scariche
calmo|miren|calma|calmi|calme
nervoso|živčen|nervosa|nervosi|nervose
chiuso|zaprt|chiusa|chiusi|chiuse
sportivo|športen|sportiva|sportivi|sportive
perfetto|popoln|perfetta|perfetti|perfette
pieno|poln|piena|pieni|piene
universitario|univerziteten|universitaria|universitari|universitarie
fantastico|fantastičen|fantastica|fantastici|fantastiche
commerciale|trgovski|commerciale|commerciali|commerciali
prossimo|naslednji|prossima|prossimi|prossime
pubblico|javen|pubblica|pubblici|pubbliche
teatrale|gledališki|teatrale|teatrali|teatrali
gratuito|brezplačen|gratuita|gratuiti|gratuite
modale|naklonski|modale|modali|modali
culturale|kulturen|culturale|culturali|culturali
enogastronomico|kulinaričen|enogastronomica|enogastronomici|enogastronomiche
giallo|rumen|gialla|gialli|gialle
blu|moder|blu|blu|blu
verde|zelen|verde|verdi|verdi
bianco|bel|bianca|bianchi|bianche`.split('\n')){const [lemma,meaning,f,mpl,fpl]=row.split('|');adjective(lemma,meaning,[lemma,f,mpl,fpl]);}
add('besedna osnova',`grand|velik|osnova pridevnika grande; množina grandi
modern|sodoben|osnova pridevnika moderno; moderna, moderni, moderne`);
add('izraz',`basta|dovolj|basta così? = bo to vse?
bel|lep|skrajšana oblika bello pred samostalnikom
iniziale|začetni|lettera iniziale = začetna črka
particolare|poseben
calma|mirnost|con calma = počasi, brez naglice
ultimo|zadnji
ultima|zadnja
coniugato|spregan|pretekli deležnik coniugare; un verbo coniugato = spregan glagol
determinativi|določni|articoli determinativi = določni členi
indeterminativi|nedoločni|articoli indeterminativi = nedoločni členi
ricevuto|prejeli|pretekli deležnik ricevere; avete ricevuto = ste prejeli
margherita|margerita|pizza margherita = pica s paradižnikom, mocarelo in baziliko
memory|spomin|ime igre; angleška beseda
rock|rock|ime glasbene zvrsti
live|v živo|angleška beseda
hip|hip|angleščina; hip hop
hop|hop|angleščina; hip hop
coca-cola|kokakola|ime pijače
fb|Facebook|okrajšava imena družbenega omrežja
twitter|Twitter|ime družbenega omrežja iz izvirnika`);
for(const name of ['Asinelli','Maggiore','Petronio','Alma','Mater','Studiorum','Salaborsa','MAMbo','Piero','Lucia','Anna','Imola','Pasquetta','Matis','Montagnola','Lux','Fiocco','Rizzoli','Giardini','Margherita','Anja','Brisighella','Flora','Modigliani','Reale','Madonna','Obama','Greta','Thunberg','Mary','Poppins','Victoria','David','Beckham','Arizona','Erasmus'])unitLexicon[name.toLocaleLowerCase('it')]={kind:'lastno ime',meaning:name==='Pasquetta'?'velikonočni ponedeljek':name,note:'Lastno ime iz učnega gradiva; ohranjamo izvirnik.'};
add('tuji izraz',`université|univerza|francoščina
uniwersytet|univerza|poljščina
market|tržnica|angleščina
hospital|bolnišnica|angleščina
szpital|bolnišnica|poljščina
school|šola|angleščina
szkoła|šola|poljščina
musée|muzej|francoščina
muzeum|muzej|poljščina
luni|ponedeljek|romunščina
lunes|ponedeljek|španščina
mardi|torek|francoščina
jueves|četrtek|španščina
jeudi|četrtek|francoščina
saturday|sobota|angleščina
sobota|sobota|slovanski izraz iz izvirnega seznama
domingo|nedelja|španščina
winter|zimski|angleščina
party|zabava|angleščina`);
regular('scoprire','odkriti','odkrijem,odkriješ,odkrije,odkrijemo,odkrijete,odkrijejo',['Scopro una città.','Odkrivam mesto.']);
regular('presentare','predstaviti','predstavim,predstaviš,predstavi,predstavimo,predstavite,predstavijo',['Presento un amico.','Predstavim prijatelja.']);
regular('succedere','zgoditi se','zgodim se,zgodiš se,zgodi se,zgodimo se,zgodite se,zgodijo se',['Che cosa succede?','Kaj se dogaja?']);
verb('esserci','biti prisoten',['ci sono','ci sei','c’è','ci siamo','ci siete','ci sono'],['sem tu','si tu','je tu','smo tu','ste tu','so tu'],['C’è un museo.','Tu je muzej.']);
verb('dispiacere','ne biti všeč / biti žal',['dispiaccio','dispiaci','dispiace','dispiacciamo','dispiacete','dispiacciono'],['nisem všeč','nisi všeč','je žal','nismo všeč','niste všeč','niso všeč'],['Mi dispiace.','Žal mi je.']);
adjective('aperto','odprt',['aperto','aperta','aperti','aperte']);
adjective('usato','rabljen',['usato','usata','usati','usate']);
adjective('comunale','občinski',['comunale','comunale','comunali','comunali']);
unitLexicon.ragazzo={kind:'samostalnik',meaning:'fant',note:'il ragazzo · množina i ragazzi; ragazza = dekle.'};
unitLexicon.stamattina={kind:'prislov',meaning:'danes zjutraj / dopoldne'};
unitLexicon.mezza={kind:'pridevnik',lemma:'mezzo',meaning:'pol',note:'Pri uri: e mezza = pol ure čez; sono le sette e mezza = ura je pol osmih.',forms:[['moška ednina','mezzo'],['ženska ednina','mezza'],['moška množina','mezzi'],['ženska množina','mezze']],example:['Sono le sette e mezza.','Ura je pol osmih.']};
for(const key of ['macchiato','macchiata','macchiati','macchiate'])unitLexicon[key].example=['Prendo un caffè macchiato.','Naročim kavo z malo mleka.'];
