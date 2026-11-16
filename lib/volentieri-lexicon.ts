import type { Entry } from './lexicon';
import {unitLexicon} from './volentieri-units-lexicon';

export const volentieriLexicon: Record<string, Entry> = {};
function entries(kind:string, rows:string) {
  for(const row of rows.split('\n')){const [word,meaning,note]=row.split('|');if(word)volentieriLexicon[word]={kind,meaning,note};}
}
entries('samostalnik',`tombola|tombola|la tombola · igra z označevanjem izžrebanih podob
disegni|risbe|il disegno · množina i disegni
aula|učilnica|l’aula · ženski spol · množina le aule
dialogo|pogovor|il dialogo · množina i dialoghi
disegno|risba|il disegno · množina i disegni
tabella|tabela|la tabella · množina le tabelle
box|okvirček|il box · tu kulturni okvirček
cultura|kultura|la cultura
consegne|navodila|la consegna · množina le consegne
testo|besedilo|il testo · množina i testi
risposta|odgovor|la risposta · množina le risposte
alfabeto|abeceda|l’alfabeto · moški spol
palla|žoga|la palla · množina le palle
lettera|črka|la lettera · množina le lettere
istruzioni|navodila|l’istruzione · ženski spol
lettere|črke|la lettera
nomi|imena|il nome
cartina|zemljevid|la cartina · množina le cartine
caccia|lov|la caccia · caccia alle lettere = lov na črke
parola|beseda|la parola · množina le parole
numeri|števila|il numero
lingue|jeziki|la lingua
posto|mesto|il posto · al posto di = namesto
indirizzi|naslovi|l’indirizzo · moški spol
mail|e-poštni naslov|la mail · pogovorno
compagno|sošolec|il compagno · množina i compagni
chiocciola|afna|la chiocciola · znak @ v e-poštnem naslovu
punto|pika|il punto · znak .
maiuscolo|velika črka|il maiuscolo
minuscolo|mala črka|il minuscolo
video|video|il video · množina i video
unità|enota|l’unità · ženski spol · množina le unità
lezione|lekcija|la lezione · množina le lezioni
amici|prijatelji|l’amico · množina gli amici
profilo|profil|il profilo · množina i profili
informatico|informatik|l’informatico · množina gli informatici
pasticcere|slaščičar|il pasticcere · množina i pasticceri
università|univerza|l’università · ženski spol
storia|zgodovina|la storia
arte|umetnost|l’arte · ženski spol
calcio|nogomet|il calcio
cane|pes|il cane · množina i cani
bar|bar|il bar · množina i bar
pasticceria|slaščičarna|la pasticceria
papà|oče|il papà · množina i papà
teatro|gledališče|il teatro
audio|zvok|l’audio · moški spol
oggetti|predmeti|l’oggetto · moški spol
soggiorno|dnevna soba|il soggiorno
stanza|soba|la stanza · množina le stanze
piatto|jed|il piatto · tudi krožnik
ragù|ragu|il ragù · mesna omaka
signor|gospod|pred imenom; polna oblika signore
signora|gospa|la signora
vicino|sostanovalec|il vicino di stanza · sicer sosed
fame|lakota|la fame · avere fame = biti lačen
appetito|tek|l’appetito · buon appetito = dober tek
elenco|seznam|l’elenco · moški spol
attenzione|pozor|l’attenzione · ženski spol
ristorante|restavracija|il ristorante
dialoghi|pogovori|il dialogo
mano|roka|la mano · ženski spol · množina le mani
grassetto|krepki tisk|il grassetto
gesti|kretnje|il gesto
intonazione|intonacija|l’intonazione · ženski spol
passione|strast|la passione
corso|tečaj|il corso
settimane|tedni|la settimana
mese|mesec|il mese · množina i mesi
cuoco|kuhar|il cuoco · množina i cuochi
informazioni|podatki|l’informazione · ženski spol
stage|praksa|uno stage · prevzeta beseda; praktično usposabljanje
accademia|akademija|l’accademia · ženski spol
chef|kuharski mojster|lo chef
mesi|meseci|il mese
medico|zdravnik|il medico · množina i medici
specializzazione|specializacija|la specializzazione
infermiera|medicinska sestra|l’infermiera · množina le infermiere
aggettivo|pridevnik|l’aggettivo · moški spol
desinenza|končnica|la desinenza
gruppo|skupina|il gruppo
identità|identiteta|l’identità · ženski spol
carta|izkaznica|la carta; tudi kartica ali papir
nazionalità|državljanstvo|la nazionalità · tudi narodnost
sesso|spol|il sesso
femmina|ženska|la femmina · v osebni izkaznici ženski spol
professione|poklic|la professione
astronauta|astronavt/-ka|l’astronauta · oba spola
tandem|jezikovni tandem|il tandem · izmenjava pri učenju jezikov
profili|profili|il profilo
letto|postelja|il letto · andare a letto = iti spat
messaggio|sporočilo|il messaggio
blog|blog|il blog
stilista|modni oblikovalec/-ka|lo/la stilista · množina gli/le stilisti/e
compagna|sošolka|la compagna
ingegnere|inženir|l’ingegnere · moški spol
ragazza|dekle|la ragazza
fotografo|fotograf|il fotografo · množina i fotografi
descrizioni|opisi|la descrizione
regina|kraljica|la regina
presidente|predsednik|il presidente
calciatore|nogometaš|il calciatore
aggettivi|pridevniki|l’aggettivo
segretaria|tajnica|la segretaria
pronuncia|izgovarjava|la pronuncia
ortografia|pravopis|l’ortografia · ženski spol
testi|besedila|il testo
dolci|sladice|il dolce
animali|živali|l’animale · moški spol
parco|park|il parco
macchina|avtomobil|la macchina
bicicletta|kolo|la bicicletta
slogan|slogan|lo slogan
principe|princ|il principe
miniatura|miniatura|la miniatura
museo|muzej|il museo
scienza|znanost|la scienza
tecnologia|tehnologija|la tecnologia
cognome|priimek|il cognome
nickname|vzdevek|il nickname · prevzeto iz angleščine
data|datum|la data
nascita|rojstvo|la nascita
età|starost|l’età · ženski spol
gusti|okusi|il gusto · gusti musicali = glasbeni okus
luoghi|kraji|il luogo
cuore|srce|il cuore · luoghi del cuore = ljubi kraji
creatività|ustvarjalnost|la creatività
fantasia|domišljija|la fantasia
ingegneria|inženirstvo|l’ingegneria · ženski spol
videografia|videografija|la videografia
surf|deskanje|il surf
passioni|strasti|la passione
neve|sneg|la neve
rap|rap|il rap · glasbena zvrst
paradiso|raj|il paradiso
personalità|osebnost|la personalità
immagine|slika|l’immagine · ženski spol
descrizione|opis|la descrizione
amore|ljubezen|l’amore · moški spol
cellulare|mobilni telefon|il cellulare
grammatica|slovnica|la grammatica
cibi|hrana|il cibo · množina i cibi
bevande|pijače|la bevanda
pasticcini|drobno pecivo|il pasticcino
pizza|pica|la pizza
marito|mož|il marito
fidanzata|zaročenka|la fidanzata · tudi dekle v partnerski zvezi
professioni|poklici|la professione
chitarra|kitara|la chitarra
contrasto|nasprotje|il contrasto
ruolo|položaj|il ruolo
figli|otroci|il figlio · lahko tudi sinovi
paura|strah|la paura · avere paura = biti prestrašen
preposizioni|predlogi|la preposizione
congiunzioni|vezniki|la congiunzione
sax|saksofon|il sax · skrajšano od sassofono`);
entries('izraz',`chi|kdor|tudi kdo v vprašanju
sulla|na|su + la
qual|kateri|qual è = kateri/kakšen je
quelli|tisti
benvenuto|dobrodošel
fino|do|fino a = do
social|na družbenem omrežju|profilo social = profil na družbenem omrežju
altro|drugo
senza|brez
te|tebi|secondo te = po tvojem mnenju
questi|ti
ecco|izvoli|ecco a voi = izvolite
allora|potem
buon|dober|buon appetito = dober tek
dopo|pozneje|a dopo = se vidimo pozneje
grazie|hvala
wow|vau
altre|druge
altri|drugi
alcune|nekatere
quanto|koliko|da quanto = kako dolgo
dall|iz|da + l’
anch|tudi|anch’io = tudi jaz
nostro|naš
alcuni|nekateri
comuni|pogosti
corrispondente|ustrezen
on|na spletu|on-line = spletno; angleški izraz
line|spletno|on-line; angleški izraz
presto|zgodaj
adesso|zdaj
suo|njegov|lahko tudi njen; odvisno od sobesedila
tanti|veliko
grazie|hvala
arrivederci|nasvidenje
su|na
male|slabo
prego|prosim|v odgovoru na zahvalo
musicali|glasbeni
maschile|moški spol
femminile|ženski spol
informale|neformalno
formale|formalno
informali|neformalni
formali|formalni
personali|osebni
obbligatori|obvezni
giovani|mladi
anziane|starejše
superiore|višji
generali|splošni
importanti|pomembne
preferiti|najljubši
preferito|najljubši
simili|podobni
multipli|večkratniki
pari|soda|numeri pari = soda števila
dispari|liha|numeri dispari = liha števila`);
const persons=['io','tu','lui / lei','noi','voi','loro'];
function verb(lemma:string, meaning:string, forms:string[], translations:string[], example:[string,string]){
  const table=persons.map((p,i)=>[p,forms[i]] as [string,string]);
  volentieriLexicon[lemma]={kind:'glagol',lemma,meaning,forms:table,example};
  forms.forEach((f,i)=>volentieriLexicon[f]={kind:'glagol',lemma,meaning:translations[i],forms:table,example,note:`${i%3+1}. oseba ${i<3?'ednine':'množine'} · sedanjik`});
}
function regular(lemma:string,meaning:string,translations:string,example:[string,string]){
  const stem=lemma.slice(0,-3),group=lemma.slice(-3);
  const endings=group==='are'?['o','i','a','iamo','ate','ano']:group==='ere'?['o','i','e','iamo','ete','ono']:['o','i','e','iamo','ite','ono'];
  verb(lemma,meaning,endings.map(e=>{
    let root=stem;
    if(group==='are'&&/[cg]$/.test(stem)&&e.startsWith('i'))root+='h';
    if(group==='are'&&stem.endsWith('i')&&e.startsWith('i'))root=stem.slice(0,-1);
    return root+e;
  }),translations.split(','),example);
}
regular('cerchiare','obkrožiti','obkrožim,obkrožiš,obkroži,obkrožimo,obkrožite,obkrožijo',['Cerchia i disegni.','Obkroži risbe.']);
regular('riordinare','urediti','uredim,urediš,uredi,uredimo,uredite,uredijo',['Riordina le foto.','Razvrsti fotografije.']);
regular('tirare','vreči','vržem,vržeš,vrže,vržemo,vržete,vržejo',['Tira la palla.','Vrzi žogo.']);
regular('cercare','iskati','iščem,iščeš,išče,iščemo,iščete,iščejo',['Cercate le lettere.','Poiščite črke.']);
regular('iniziare','začeti','začnem,začneš,začne,začnemo,začnete,začnejo',['Inizia il corso.','Začne tečaj.']);
regular('mancare','manjkati','manjkam,manjkaš,manjka,manjkamo,manjkate,manjkajo',['Mancano due numeri.','Manjkata dve števili.']);
regular('contare','šteti','štejem,šteješ,šteje,štejemo,štejete,štejejo',['Contiamo fino a venti.','Štejmo do dvajset.']);
regular('calcolare','računati','računam,računaš,računa,računamo,računate,računajo',['Calcoliamo i numeri.','Računamo s števili.']);
regular('salutare','pozdravljati','pozdravljam,pozdravljaš,pozdravlja,pozdravljamo,pozdravljate,pozdravljajo',['Saluto un amico.','Pozdravim prijatelja.']);
regular('creare','ustvariti','ustvarim,ustvariš,ustvari,ustvarimo,ustvarite,ustvarijo',['Crea un profilo.','Ustvari profil.']);
regular('passeggiare','sprehajati se','sprehajam se,sprehajaš se,sprehaja se,sprehajamo se,sprehajate se,sprehajajo se',['Mi piace passeggiare.','Rad se sprehajam.']);
regular('controllare','preveriti','preverim,preveriš,preveri,preverimo,preverite,preverijo',['Controlla le risposte.','Preveri odgovore.']);
regular('riascoltare','poslušati znova','poslušam znova,poslušaš znova,posluša znova,poslušamo znova,poslušate znova,poslušajo znova',['Riascolta il dialogo.','Znova poslušaj pogovor.']);
regular('girare','hoditi naokrog','hodim naokrog,hodiš naokrog,hodi naokrog,hodimo naokrog,hodite naokrog,hodijo naokrog',['Gira per la classe.','Sprehodi se po razredu.']);
regular('trovare','najti','najdem,najdeš,najde,najdemo,najdete,najdejo',['Trova le informazioni.','Poišči podatke.']);
regular('cominciare','začeti','začnem,začneš,začne,začnemo,začnete,začnejo',['Il nome comincia con M.','Ime se začne z M.']);
regular('sembrare','zdeti se','zdim se,zdiš se,zdi se,zdimo se,zdite se,zdijo se',['Sembri giovane.','Videti si mlad.']);
regular('osservare','opazovati','opazujem,opazuješ,opazuje,opazujemo,opazujete,opazujejo',['Osserva le frasi.','Oglej si povedi.']);
regular('inventare','izmisliti si','izmislim si,izmisliš si,izmisli si,izmislimo si,izmislite si,izmislijo si',['Inventa una nuova identità.','Izmisli si novo identiteto.']);
regular('pescare','izvleči','izvlečem,izvlečeš,izvleče,izvlečemo,izvlečete,izvlečejo',['Pescate una carta.','Izvlecite kartico.']);
regular('formare','tvoriti','tvorim,tvoriš,tvori,tvorimo,tvorite,tvorijo',['Formate una frase.','Tvorite poved.']);
regular('immaginare','predstavljati si','predstavljam si,predstavljaš si,predstavlja si,predstavljamo si,predstavljate si,predstavljajo si',['Immagina una persona.','Predstavljaj si osebo.']);
regular('indovinare','uganiti','uganem,uganeš,ugane,uganemo,uganete,uganejo',['Indovina il nome.','Ugani ime.']);
regular('caratterizzare','oblikovati značaj','oblikujem značaj,oblikuješ značaj,oblikuje značaj,oblikujemo značaj,oblikujete značaj,oblikujejo značaj',['Caratterizza la personalità.','Oblikuj osebnost.']);
regular('ringraziare','zahvaliti se','zahvalim se,zahvališ se,zahvali se,zahvalimo se,zahvalite se,zahvalijo se',['Ringrazio un amico.','Zahvalim se prijatelju.']);
regular('affermare','pritrditi','pritrdim,pritrdiš,pritrdi,pritrdimo,pritrdite,pritrdijo',['Affermo una cosa.','Potrdim neko stvar.']);
regular('negare','zanikati','zanikam,zanikaš,zanika,zanikamo,zanikate,zanikajo',['Nego una cosa.','Zanikam neko stvar.']);
verb('scegliere','izbrati',['scelgo','scegli','sceglie','scegliamo','scegliete','scelgono'],['izberem','izbereš','izbere','izberemo','izberete','izberejo'],['Scegli la risposta.','Izberi odgovor.']);
verb('vincere','zmagati',['vinco','vinci','vince','vinciamo','vincete','vincono'],['zmagam','zmagaš','zmaga','zmagamo','zmagate','zmagajo'],['Vince chi finisce per primo.','Zmaga, kdor prvi konča.']);
verb('conoscere','poznati',['conosco','conosci','conosce','conosciamo','conoscete','conoscono'],['poznam','poznaš','pozna','poznamo','poznate','poznajo'],['Conosci gli amici?','Poznaš prijatelje?']);
verb('sostituire','zamenjati',['sostituisco','sostituisci','sostituisce','sostituiamo','sostituite','sostituiscono'],['zamenjam','zamenjaš','zamenja','zamenjamo','zamenjate','zamenjajo'],['Sostituite il nome.','Zamenjajte ime.']);
verb('aggiungere','dodati',['aggiungo','aggiungi','aggiunge','aggiungiamo','aggiungete','aggiungono'],['dodam','dodaš','doda','dodamo','dodate','dodajo'],['Aggiungi i tuoi hobby.','Dodaj svoje konjičke.']);
for(const [form,meaning] of Object.entries({cerchia:'obkroži',riordina:'uredi',scegli:'izberi',tira:'vrzi',cercate:'poiščite',contiamo:'štejmo',calcoliamo:'računajmo',crea:'ustvari',controlla:'preveri',riascolta:'poslušaj znova',gira:'sprehodi se',trova:'poišči',osserva:'oglej si',inventa:'izmisli si',pescate:'izvlecite',formate:'tvorite',immagina:'predstavljaj si',indovina:'ugani',caratterizza:'oblikuj',sostituite:'zamenjajte',aggiungi:'dodaj'})){
  volentieriLexicon[form]={...volentieriLexicon[form],meaning,note:'V navodilu: velelnik. Tabela prikazuje povedni sedanjik.'};
}
entries('glagolska oblika',`cerchiale|obkroži jih|cerchiare + le; velelnik z zaimkom za risbe oziroma mesta
scrivile|napiši jih|scrivere + le; velelnik z zaimkom
presentarti|predstaviti se|presentarsi, nedoločnik z zaimkom ti
conoscerti|spoznati te|conoscere + ti; piacere di conoscerti = me veseli, da sva se spoznala
fatto|naredil|pretekli deležnik fare; hai fatto buon viaggio = si dobro potoval
scoprire|odkriti|nedoločnik; sedanjik: scopro, scopri, scopre, scopriamo, scoprite, scoprono
iscritto|vpisan|pretekli deležnik iscrivere; si è iscritto = vpisal se je
fatevi|postavljajte si|fare + vi; fatevi le domande = postavljajte si vprašanja
incontrarsi|srečati se|povratni glagol; mi incontro, ti incontri, si incontra, ci incontriamo, vi incontrate, si incontrano
conoscersi|spoznati se|povratna oblika conoscere; ci conosciamo = spoznavamo se`);
function adjective(lemma:string,meaning:string,forms:string[]){
  const labels=['moška ednina','ženska ednina','moška množina','ženska množina'];
  const table=labels.map((label,i)=>[label,forms[i]] as [string,string]);
  const nationality:Record<string,string>={tedesco:'Nemec',indiano:'Indijec',brasiliano:'Brazilec',americano:'Američan',argentino:'Argentinec',marocchino:'Maročan',polacco:'Poljak',turco:'Turek',cileno:'Čilenec',russo:'Rus',cinese:'Kitajec',canadese:'Kanadčan',olandese:'Nizozemec'};
  for(const f of forms)volentieriLexicon[f]={kind:'pridevnik',lemma,meaning,forms:table,example:[`Lui è ${forms[0]}.`,`On je ${nationality[lemma]||meaning}.`]};
}
for(const [base,meaning] of Object.entries({tedesco:'nemški',indiano:'indijski',brasiliano:'brazilski',americano:'ameriški',argentino:'argentinski',marocchino:'maroški',polacco:'poljski',turco:'turški',cileno:'čilski',russo:'ruski',simpatico:'prijeten',timido:'sramežljiv',carino:'ljubek',bravo:'dober',allegro:'vesel',goloso:'sladkosneden',pigro:'len',stanco:'utrujen',tipico:'značilen',classico:'klasičen'}))adjective(base,meaning,[base,base.slice(0,-1)+'a',base.slice(0,-1)+'i',base.slice(0,-1)+'e']);
for(const [base,meaning] of Object.entries({giovane:'mlad',cinese:'kitajski',divertente:'zabaven',intelligente:'pameten',elegante:'eleganten',gentile:'prijazen',importante:'pomemben',forte:'močan',canadese:'kanadski',olandese:'nizozemski',breve:'kratek',geniale:'genialen'}))adjective(base,meaning,[base,base,base.slice(0,-1)+'i',base.slice(0,-1)+'i']);
const stems:Record<string,string>={cuoc:'cuoco',infermier:'infermiera',brasilian:'brasiliano',indian:'indiano',spagnol:'spagnolo',fotograf:'fotografo',italian:'italiano',australian:'australiano',segretari:'segretaria',cilen:'cileno',turc:'turco',guid:'guida',russ:'russo',american:'americano',informatic:'informatico',tedesc:'tedesco',marocchin:'marocchino'};
const stemMeanings:Record<string,string>={spagnolo:'španski',italiano:'italijanski',australiano:'avstralski',guida:'vodnik'};
for(const [stem,lemma] of Object.entries(stems))volentieriLexicon[stem]={...volentieriLexicon[lemma],lemma,kind:'nedokončana oblika',meaning:volentieriLexicon[lemma]?.meaning||stemMeanings[lemma],note:`Osnova za dopolnjevanje končnice; celotna beseda: ${lemma}.`};
const numbers='zero|nič;uno|ena;due|dve;tre|tri;quattro|štiri;cinque|pet;sei|šest;sette|sedem;otto|osem;nove|devet;dieci|deset;undici|enajst;dodici|dvanajst;tredici|trinajst;quattordici|štirinajst;quindici|petnajst;sedici|šestnajst;diciassette|sedemnajst;diciotto|osemnajst;diciannove|devetnajst;venti|dvajset;ventuno|enaindvajset;ventidue|dvaindvajset;ventitré|triindvajset;ventiquattro|štiriindvajset;venticinque|petindvajset;ventotto|osemindvajset;trenta|trideset;quaranta|štirideset;cinquanta|petdeset;sessanta|šestdeset;settanta|sedemdeset;ottanta|osemdeset;novanta|devetdeset;cento|sto;duecento|dvesto;trecento|tristo;quattrocento|štiristo;cinquecento|petsto;seicento|šeststo;settecento|sedemsto;ottocento|osemsto;novecento|devetsto';
for(const pair of numbers.split(';')){const [word,meaning]=pair.split('|');if(word!=='sei')volentieriLexicon[word]={kind:'števnik',meaning};}
const names='Aosta Torino Genova Trento Trieste Ancona Perugia Campobasso Bari Napoli Potenza Catanzaro Cagliari Vaticano Mario Alice Edoardo Bianca Claudia Lorenzo Sara Colin Liverpool Ferrari Mauricio Daya Berlino Klara Pavel Asia Andy New York Conchita Alberto Alicia Diego Santiago Cile Mislina Istanbul Olga San Pietroburgo Tom Boston Ahmed Casablanca Carla Martino Andrea Marco Sonia WhatsApp Angela Spaziale Pisa Pablo Leonardo Alessandro Giovanni Sofia Martina Ito Tokyo Fellini Julie Lione Toscana Parigi Carlo Yuyi Shanghai Émilie Bath Christian Londra Dylan Franco Julia Paul Fumina Karl Yan Elisa Meister Alina Celia Paoli Sergio Pazzoni Vasco Kolors Canada Rimini Vinci Roberts Harry Potter Pompei Barcellona Disneyland Marte Beatles Sheeran Blake';
for(const name of names.split(' '))volentieriLexicon[name.toLocaleLowerCase('it')]={kind:'lastno ime',meaning:({Berlino:'Berlin',Napoli:'Neapelj',Lione:'Lyon',Parigi:'Pariz',Londra:'London',Cile:'Čile',Marte:'Mars',Asia:'Azija'} as Record<string,string>)[name]||name,note:'Osebno, zemljepisno ali drugo lastno ime iz učnega besedila.'};
entries('tuji izraz',`um|ena|portugalščina
one|ena|angleščina
eins|ena|nemščina
director|režiser|angleščina
prazer|me veseli|portugalščina
pleased|vesel|angleščina: pleased to meet you = me veseli
to|nedoločniški členek|angleščina: pleased to meet you
meet|spoznati|angleščina
you|tebe|angleščina
happy|srečen|angleščina
the|določni člen|angleščina; v imenu skupine The Kolors
tropical|tropski|angleščina; zvrst tropical house
house|house|angleški naziv glasbene zvrsti
hunger|lakota|angleščina; naslov Hunger Games
games|igre|angleščina; naslov Hunger Games
boom|bum|medmet pri igri s števili
gmail|Gmail|ime e-poštne storitve
com|com|del spletne domene
virgilio|Virgilio|ime e-poštne storitve
mariotto|mariotto|del izvirnega e-poštnega naslova
edodz|edoDZ|del izvirnega e-poštnega naslova
claudina|claudina|del izvirnega e-poštnega naslova
franciab|franciAb|del izvirnega e-poštnega naslova`);
for(const [sound,letter] of Object.entries({bi:'B',ci:'C',di:'D',effe:'F',gi:'G',acca:'H',elle:'L',emme:'M',enne:'N',pi:'P',cu:'Q',erre:'R',esse:'S',ti:'T',vu:'V',zeta:'Z'})){
  // Existing words di/ti keep their grammatical meaning outside spelling.
  if(!['di','ti','ci'].includes(sound))volentieriLexicon[sound]={kind:'ime črke',meaning:`črka ${letter}`,note:`Italijansko poimenovanje črke ${letter}.`};
}
for(const letter of 'bdfghmnqrstuvzx')volentieriLexicon[letter]={kind:'črka / oznaka',meaning:`črka ${letter.toUpperCase()}`,note:'Črka ali oznaka možnosti v nalogi.'};
volentieriLexicon.italia={kind:'lastno ime',meaning:'Italija'};
volentieriLexicon.aquila={kind:'lastno ime',meaning:'L’Aquila',note:'Ime italijanskega mesta.'};
volentieriLexicon.n={kind:'črka',meaning:'črka N'};
adjective('turistico','turističen',['turistico','turistica','turistici','turistiche']);
adjective('internazionale','mednaroden',['internazionale','internazionale','internazionali','internazionali']);
entries('lastno ime',`venezia|Benetke|italijansko mesto
ligure|Ligursko|Mar Ligure = Ligursko morje
tirreno|Tirensko|Mar Tirreno = Tirensko morje
mediterraneo|Sredozemsko|Mar Mediterraneo = Sredozemsko morje
adriatico|Jadransko|Mare Adriatico = Jadransko morje
ionio|Jonsko|Mar Ionio = Jonsko morje`);
volentieriLexicon.mar={meaning:'morje',kind:'samostalnik',lemma:'mare',note:'Skrajšana oblika mare v imenih morij.'};
for(const [form,lemma,forms,example] of [
  ['cerchiale','cerchiare',['cerchio','cerchi','cerchia','cerchiamo','cerchiate','cerchiano'],['Cerchia le città.','Obkroži mesta.']],
  ['scrivile','scrivere',['scrivo','scrivi','scrive','scriviamo','scrivete','scrivono'],['Scrivi le parole.','Napiši besede.']],
  ['presentarti','presentarsi',['mi presento','ti presenti','si presenta','ci presentiamo','vi presentate','si presentano'],['Mi presento.','Predstavim se.']],
  ['conoscerti','conoscere',['conosco','conosci','conosce','conosciamo','conoscete','conoscono'],['Piacere di conoscerti.','Me veseli, da sva se spoznala.']],
  ['fatto','fare',['faccio','fai','fa','facciamo','fate','fanno'],['Hai fatto buon viaggio?','Si dobro potoval/-a?']],
  ['fatevi','fare',['faccio','fai','fa','facciamo','fate','fanno'],['Fatevi le domande.','Drug drugemu postavljajte vprašanja.']],
  ['scoprire','scoprire',['scopro','scopri','scopre','scopriamo','scoprite','scoprono'],['Scopri una nuova identità.','Odkrij novo identiteto.']],
  ['iscritto','iscriversi',['mi iscrivo','ti iscrivi','si iscrive','ci iscriviamo','vi iscrivete','si iscrivono'],['Paolo si è iscritto.','Paolo se je vpisal.']],
  ['incontrarsi','incontrarsi',['mi incontro','ti incontri','si incontra','ci incontriamo','vi incontrate','si incontrano'],['Ci incontriamo a Bologna.','Srečamo se v Bologni.']],
  ['conoscersi','conoscersi',['mi conosco','ti conosci','si conosce','ci conosciamo','vi conoscete','si conoscono'],['Ci conosciamo in classe.','Spoznamo se v razredu.']],
] as [string,string,string[],[string,string]][])volentieriLexicon[form]={...volentieriLexicon[form],kind:'glagol',lemma,forms:persons.map((person,i)=>[person,forms[i]]),example};
export function lookupVolentieri(word: string, context: string): Entry | undefined {
  const key=word.toLocaleLowerCase('it');
  const sentence=context.toLocaleLowerCase('it');
  if(key==='dispiace'&&/mi dispiace/.test(sentence))return {...unitLexicon.dispiace,meaning:'žal mi je'};
  const haveForms:Record<string,string>={ho:'sem star/-a',hai:'si star/-a',ha:'je star/-a'};
  if(haveForms[key]&&(new RegExp(`\\b${key}\\s+\\d+\\s+anni`).test(sentence)||new RegExp(`quanti anni ${key}`).test(sentence)))return {meaning:haveForms[key],kind:'glagol',lemma:'avere',forms:[['io','ho'],['tu','hai'],['lui / lei','ha'],['noi','abbiamo'],['voi','avete'],['loro','hanno']],note:'V zvezi avere … anni izraža starost; dobesedno imeti … let.',example:['Ho 23 anni.','Star/-a sem 23 let.']};
  if(key==='mi'&&/mi piac/.test(sentence))return {meaning:'mi',kind:'osebni zaimek',note:'Mi piace = všeč mi je; mi piacciono = všeč so mi.'};
  if(key==='che'&&/che cosa|che lavoro|che informazioni/.test(sentence))return {meaning:'kaj / kateri',kind:'vprašalni zaimek',note:'Che cosa = kaj; che lavoro = kateri poklic; che informazioni = kateri podatki.'};
  if(key==='di'&&/di (roma|bologna|liverpool|palermo|lione|berlino|madrid|sydney|new york|tokyo|shanghai|londra|parigi|boston|casablanca|perugia)/.test(sentence))return {meaning:'iz',kind:'predlog',note:'Pred imenom kraja označuje izvor: di Roma = iz Rima.'};
  if(key==='da'&&/da (due|tre|un|sei)/.test(sentence))return {meaning:'že',kind:'predlog',note:'Pred trajanjem: da due giorni = že dva dni; da un anno = že eno leto.'};
  if(/\/[ao]$/.test(key)){
    const base=key.slice(0,-2),entry=volentieriLexicon[base]||unitLexicon[base];
    if(entry)return {...entry,note:`${base}/${key.slice(-1)} je skrajšan zapis moške in ženske oblike. ${entry.note||''}`};
  }
  if(/^([A-Z] \(|\([A-Z]\))/.test(context.slice('volentieri:'.length))||context.includes('A (a)')){
    const sounds:Record<string,string>={a:'A',bi:'B',ci:'C',di:'D',e:'E',effe:'F',gi:'G',acca:'H',i:'I',elle:'L',emme:'M',enne:'N',o:'O',pi:'P',cu:'Q',erre:'R',esse:'S',ti:'T',u:'U',vu:'V',zeta:'Z'};
    if(sounds[key]||/^[a-z]$/.test(key))return {kind:'črka',meaning:`črka ${sounds[key]||key.toUpperCase()}`};
  }
  if(key==='sei'&&(/v-p13-1a|v-p27-reference-5|\(6\) sei/.test(context)))return {kind:'števnik',meaning:'šest'};
  if((key==='ho'||key==='hai'||key==='ha')&&/capito/.test(context))return {meaning:key==='ho'?'sem':key==='hai'?'si':'je',kind:'pomožni glagol',lemma:'avere',note:'S preteklim deležnikom capito tvori passato prossimo: ho capito = razumel/-a sem.'};
  return volentieriLexicon[key]||unitLexicon[key]||unitLexicon[key.replace(/-/g,'')];
}
