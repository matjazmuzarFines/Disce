import type { Entry } from './lexicon';

export const worksheetLexicon: Record<string, Entry> = {};
const persons = ['io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'];
const pronouns = ['mi', 'ti', 'si', 'ci', 'vi', 'si'];

function addVerb(lemma: string, meaning: string, forms: string[], translations: string[], example: [string, string]) {
  const table = persons.map((person, index) => [person, forms[index]] as [string, string]);
  worksheetLexicon[lemma] = { kind: 'glagol', lemma, meaning, forms: table, example, note: 'Povedni sedanjik · indicativo presente' };
  forms.forEach((form, index) => {
    const key = form.replace(/^(mi|ti|si|ci|vi) /, '');
    const previous = worksheetLexicon[key];
    worksheetLexicon[key] = {
      kind: 'glagol', lemma, meaning: previous?.lemma === lemma ? `${previous.meaning} / ${translations[index]}` : translations[index],
      forms: table, example,
      note: previous?.lemma === lemma ? `${previous.note}; tudi ${index + 1}. oblika v tabeli.` : `${index % 3 + 1}. oseba ${index < 3 ? 'ednine' : 'množine'} · povedni sedanjik`,
    };
    if (form.includes(' ')) worksheetLexicon[form] = { ...worksheetLexicon[key] };
  });
}

function regularVerb(row: string, isc = false) {
  const [lemma, meaning, translations, it, sl] = row.split('|');
  const reflexive = lemma.endsWith('si');
  const infinitive = reflexive ? lemma.slice(0, -2) + 'e' : lemma;
  const group = infinitive.slice(-3);
  const stem = infinitive.slice(0, -3);
  const endings = group === 'are' ? ['o', 'i', 'a', 'iamo', 'ate', 'ano'] : group === 'ere' ? ['o', 'i', 'e', 'iamo', 'ete', 'ono'] : isc ? ['isco', 'isci', 'isce', 'iamo', 'ite', 'iscono'] : ['o', 'i', 'e', 'iamo', 'ite', 'ono'];
  const forms = endings.map((ending, index) => {
    let root = stem;
    if (group === 'are' && /[cg]$/.test(stem) && ending.startsWith('i')) root += 'h';
    if (group === 'are' && stem.endsWith('i') && ending.startsWith('i')) root = stem.slice(0, -1);
    return `${reflexive ? pronouns[index] + ' ' : ''}${root}${ending}`;
  });
  addVerb(lemma, meaning, forms, translations.split(','), [it, sl]);
}

const regularRows = `abitare|stanovati|stanujem,stanuješ,stanuje,stanujemo,stanujete,stanujejo|Abito a Roma.|Stanujem v Rimu.
amare|ljubiti|ljubim,ljubiš,ljubi,ljubimo,ljubite,ljubijo|Amo la musica.|Ljubim glasbo.
arrivare|prispeti|prispem,prispeš,prispe,prispemo,prispete,prispejo|Arrivo a casa.|Prispem domov.
aspettare|čakati|čakam,čakaš,čaka,čakamo,čakate,čakajo|Aspetto un amico.|Čakam prijatelja.
camminare|hoditi|hodim,hodiš,hodi,hodimo,hodite,hodijo|Cammino in città.|Hodim po mestu.
cantare|peti|pojem,poješ,poje,pojemo,pojete,pojejo|Canto ogni giorno.|Pojem vsak dan.
chiamare|klicati|kličem,kličeš,kliče,kličemo,kličete,kličejo|Chiamo un amico.|Pokličem prijatelja.
chiamarsi|imenovati se|imenujem se,imenuješ se,imenuje se,imenujemo se,imenujete se,imenujejo se|Mi chiamo Laura.|Ime mi je Laura.
diventare|postati|postanem,postaneš,postane,postanemo,postanete,postanejo|Divento grande.|Postajam velik.
domandare|vprašati|vprašam,vprašaš,vpraša,vprašamo,vprašate,vprašajo|Domando il nome.|Vprašam za ime.
entrare|vstopiti|vstopim,vstopiš,vstopi,vstopimo,vstopite,vstopijo|Entro in casa.|Vstopim v hišo.
lavorare|delati|delam,delaš,dela,delamo,delate,delajo|Lavoro a scuola.|Delam v šoli.
pensare|misliti|mislim,misliš,misli,mislimo,mislite,mislijo|Penso a te.|Mislim nate.
portare|prinesti|prinesem,prineseš,prinese,prinesemo,prinesete,prinesejo|Porto un libro.|Prinesem knjigo.
sperare|upati|upam,upaš,upa,upamo,upate,upajo|Spero di venire.|Upam, da pridem.
tornare|vrniti se|vrnem se,vrneš se,vrne se,vrnemo se,vrnete se,vrnejo se|Torno a casa.|Vrnem se domov.
accendere|prižgati|prižgem,prižgeš,prižge,prižgemo,prižgete,prižgejo|Accendo la luce.|Prižgem luč.
chiedere|vprašati|vprašam,vprašaš,vpraša,vprašamo,vprašate,vprašajo|Chiedo un consiglio.|Vprašam za nasvet.
chiudere|zapreti|zaprem,zapreš,zapre,zapremo,zaprete,zaprejo|Chiudo la porta.|Zaprem vrata.
credere|verjeti|verjamem,verjameš,verjame,verjamemo,verjamete,verjamejo|Credo a Laura.|Verjamem Lauri.
leggere|brati|berem,bereš,bere,beremo,berete,berejo|Leggo il giornale.|Berem časopis.
mettere|postaviti|postavim,postaviš,postavi,postavimo,postavite,postavijo|Metto il libro sul tavolo.|Položim knjigo na mizo.
perdere|izgubiti|izgubim,izgubiš,izgubi,izgubimo,izgubite,izgubijo|Perdo le chiavi.|Izgubim ključe.
prendere|vzeti|vzamem,vzameš,vzame,vzamemo,vzamete,vzamejo|Prendo un caffè.|Spijem kavo.
ripetere|ponoviti|ponovim,ponoviš,ponovi,ponovimo,ponovite,ponovijo|Ripeto la frase.|Ponovim poved.
rispondere|odgovoriti|odgovorim,odgovoriš,odgovori,odgovorimo,odgovorite,odgovorijo|Rispondo alla domanda.|Odgovorim na vprašanje.
scrivere|pisati|pišem,pišeš,piše,pišemo,pišete,pišejo|Scrivo una lettera.|Pišem pismo.
vedere|videti|vidim,vidiš,vidi,vidimo,vidite,vidijo|Vedo un gatto.|Vidim mačka.
vivere|živeti|živim,živiš,živi,živimo,živite,živijo|Vivo a Milano.|Živim v Milanu.
aprire|odpreti|odprem,odpreš,odpre,odpremo,odprete,odprejo|Apro la porta.|Odprem vrata.
dormire|spati|spim,spiš,spi,spimo,spite,spijo|Dormo bene.|Dobro spim.
partire|oditi|odidem,odideš,odide,odidemo,odidete,odidejo|Parto domani.|Odidem jutri.
sentire|slišati|slišim,slišiš,sliši,slišimo,slišite,slišijo|Sento la musica.|Slišim glasbo.
parlare|govoriti|govorim,govoriš,govori,govorimo,govorite,govorijo|Parlo italiano.|Govorim italijansko.
ricordarsi|spomniti se|spomnim se,spomniš se,spomni se,spomnimo se,spomnite se,spomnijo se|Mi ricordo di te.|Spomnim se tebe.
vestirsi|obleči se|oblečem se,oblečeš se,obleče se,oblečemo se,oblečete se,oblečejo se|Mi vesto presto.|Zgodaj se oblečem.
ballare|plesati|plešem,plešeš,pleše,plešemo,plešete,plešejo|Ballo il tango.|Plešem tango.
comprare|kupiti|kupim,kupiš,kupi,kupimo,kupite,kupijo|Compro una borsa.|Kupim torbo.
progettare|načrtovati|načrtujem,načrtuješ,načrtuje,načrtujemo,načrtujete,načrtujejo|Progetto una casa.|Načrtujem hišo.
viaggiare|potovati|potujem,potuješ,potuje,potujemo,potujete,potujejo|Viaggio per lavoro.|Potujem zaradi dela.
svegliarsi|zbuditi se|zbudim se,zbudiš se,zbudi se,zbudimo se,zbudite se,zbudijo se|Mi sveglio alle sei.|Zbudim se ob šestih.
svegliare|zbuditi|zbudim,zbudiš,zbudi,zbudimo,zbudite,zbudijo|Sveglio i bambini.|Zbudim otroke.
studiare|študirati|študiram,študiraš,študira,študiramo,študirate,študirajo|Studio danza.|Študiram ples.
insegnare|poučevati|poučujem,poučuješ,poučuje,poučujemo,poučujete,poučujejo|Insegno italiano.|Poučujem italijanščino.
ospitare|gostiti|gostim,gostiš,gosti,gostimo,gostite,gostijo|Ospito un’amica.|Gostim prijateljico.
preparare|pripraviti|pripravim,pripraviš,pripravi,pripravimo,pripravite,pripravijo|Preparo la colazione.|Pripravim zajtrk.
alzarsi|vstati|vstanem,vstaneš,vstane,vstanemo,vstanete,vstanejo|Mi alzo alle sei.|Vstanem ob šestih.
lavarsi|umiti se|umijem se,umiješ se,umije se,umijemo se,umijete se,umijejo se|Mi lavo le mani.|Umijem si roke.
lavare|prati|perem,pereš,pere,peremo,perete,perejo|Lavo i vestiti.|Perem oblačila.
mangiare|jesti|jem,ješ,je,jemo,jeste,jedo|Mangio la pasta.|Jem testenine.
giocare|igrati se|igram se,igraš se,igra se,igramo se,igrate se,igrajo se|Gioco con i bambini.|Igram se z otroki.
cenare|večerjati|večerjam,večerjaš,večerja,večerjamo,večerjate,večerjajo|Ceno a casa.|Večerjam doma.
guardare|gledati|gledam,gledaš,gleda,gledamo,gledate,gledajo|Guardo la televisione.|Gledam televizijo.
telefonare|telefonirati|telefoniram,telefoniraš,telefonira,telefoniramo,telefonirate,telefonirajo|Telefono a un’amica.|Telefoniram prijateljici.
incontrare|srečati|srečam,srečaš,sreča,srečamo,srečate,srečajo|Incontro le amiche.|Srečam prijateljice.
stirare|likati|likam,likaš,lika,likamo,likate,likajo|Stiro i vestiti.|Likam oblačila.
attraversare|prečkati|prečkam,prečkaš,prečka,prečkamo,prečkate,prečkajo|Attraverso la strada.|Prečkam cesto.
cambiare|spremeniti|spremenim,spremeniš,spremeni,spremenimo,spremenite,spremenijo|Cambio direzione.|Spremenim smer.
passare|iti mimo|grem mimo,greš mimo,gre mimo,gremo mimo,greste mimo,gredo mimo|Passo sotto una scala.|Grem pod lestvijo.
rompersi|razbiti se|razbijem se,razbiješ se,razbije se,razbijemo se,razbijete se,razbijejo se|Lo specchio si rompe.|Ogledalo se razbije.
cadere|pasti|padem,padeš,pade,pademo,padete,padejo|Il sale cade.|Sol pade.
regalare|podariti|podarim,podariš,podari,podarimo,podarite,podarijo|Regalo un libro.|Podarim knjigo.
ricevere|prejeti|prejmem,prejmeš,prejme,prejmemo,prejmete,prejmejo|Ricevo un regalo.|Prejmem darilo.
pagare|plačati|plačam,plačaš,plača,plačamo,plačate,plačajo|Pago un caffè.|Plačam kavo.
esprimere|izraziti|izrazim,izraziš,izrazi,izrazimo,izrazite,izrazijo|Esprimo un desiderio.|Izrazim željo.
usare|uporabljati|uporabljam,uporabljaš,uporablja,uporabljamo,uporabljate,uporabljajo|Uso il computer.|Uporabljam računalnik.
fumare|kaditi|kadim,kadiš,kadi,kadimo,kadite,kadijo|Non fumo.|Ne kadim.
suonare|igrati na glasbilo|igram,igraš,igra,igramo,igrate,igrajo|Suono il pianoforte.|Igram klavir.
cucinare|kuhati|kuham,kuhaš,kuha,kuhamo,kuhate,kuhajo|Cucino bene.|Dobro kuham.
nuotare|plavati|plavam,plavaš,plava,plavamo,plavate,plavajo|Nuoto in mare.|Plavam v morju.
guidare|voziti|vozim,voziš,vozi,vozimo,vozite,vozijo|Guido la macchina.|Vozim avto.
ricordare|zapomniti si|zapomnim si,zapomniš si,zapomni si,zapomnimo si,zapomnite si,zapomnijo si|Ricordo il nome.|Zapomnim si ime.
imparare|naučiti se|naučim se,naučiš se,nauči se,naučimo se,naučite se,naučijo se|Imparo l’italiano.|Učim se italijanščine.
significare|pomeniti|pomenim,pomeniš,pomeni,pomenimo,pomenite,pomenijo|Sapere significa conoscere.|Sapere pomeni vedeti.
parcheggiare|parkirati|parkiram,parkiraš,parkira,parkiramo,parkirate,parkirajo|Parcheggio qui.|Parkiram tukaj.
correre|teči|tečem,tečeš,teče,tečemo,tečete,tečejo|Corro ogni giorno.|Tečem vsak dan.`;
regularRows.split('\n').forEach(row => regularVerb(row));
const iscRows = `capire|razumeti|razumem,razumeš,razume,razumemo,razumete,razumejo|Capisco la frase.|Razumem poved.
finire|končati|končam,končaš,konča,končamo,končate,končajo|Finisco i compiti.|Končam domačo nalogo.
preferire|imeti raje|imam raje,imaš raje,ima raje,imamo raje,imate raje,imajo raje|Preferisco la pasta.|Raje imam testenine.
pulire|čistiti|čistim,čistiš,čisti,čistimo,čistite,čistijo|Pulisco la cucina.|Čistim kuhinjo.`;
iscRows.split('\n').forEach(row => regularVerb(row, true));

const irregularRows = `essere|biti|sono,sei,è,siamo,siete,sono|sem,si,je,smo,ste,so|Sono a casa.|Sem doma.
avere|imeti|ho,hai,ha,abbiamo,avete,hanno|imam,imaš,ima,imamo,imate,imajo|Ho un gatto.|Imam mačka.
volere|hoteti|voglio,vuoi,vuole,vogliamo,volete,vogliono|hočem,hočeš,hoče,hočemo,hočete,hočejo|Voglio un caffè.|Hočem kavo.
dovere|morati|devo,devi,deve,dobbiamo,dovete,devono|moram,moraš,mora,moramo,morate,morajo|Devo partire.|Moram oditi.
potere|moči|posso,puoi,può,possiamo,potete,possono|lahko,lahko,lahko,lahko,lahko,lahko|Posso entrare?|Smem vstopiti?
andare|iti|vado,vai,va,andiamo,andate,vanno|grem,greš,gre,gremo,greste,gredo|Vado a scuola.|Grem v šolo.
dire|reči|dico,dici,dice,diciamo,dite,dicono|rečem,rečeš,reče,rečemo,rečete,rečejo|Dico la verità.|Povem resnico.
bere|piti|bevo,bevi,beve,beviamo,bevete,bevono|pijem,piješ,pije,pijemo,pijete,pijejo|Bevo acqua.|Pijem vodo.
fare|delati|faccio,fai,fa,facciamo,fate,fanno|delam,delaš,dela,delamo,delate,delajo|Faccio i compiti.|Delam domačo nalogo.
sapere|vedeti / znati|so,sai,sa,sappiamo,sapete,sanno|vem / znam,veš / znaš,ve / zna,vemo / znamo,veste / znate,vedo / znajo|So nuotare.|Znam plavati.
stare|biti / počutiti se|sto,stai,sta,stiamo,state,stanno|sem,si,je,smo,ste,so|Sto bene.|Dobro se počutim.
venire|priti|vengo,vieni,viene,veniamo,venite,vengono|pridem,prideš,pride,pridemo,pridete,pridejo|Vengo da Milano.|Prihajam iz Milana.
dare|dati|do,dai,dà,diamo,date,danno|dam,daš,da,damo,daste,dajo|Do un libro a Laura.|Lauri dam knjigo.
uscire|iti ven|esco,esci,esce,usciamo,uscite,escono|grem ven,greš ven,gre ven,gremo ven,greste ven,gredo ven|Esco di casa.|Grem iz hiše.
riuscire|uspeti|riesco,riesci,riesce,riusciamo,riuscite,riescono|uspem,uspeš,uspe,uspemo,uspete,uspejo|Riesco a capire.|Uspem razumeti.
produrre|proizvajati|produco,produci,produce,produciamo,producete,producono|proizvajam,proizvajaš,proizvaja,proizvajamo,proizvajate,proizvajajo|Producono la pasta.|Proizvajajo testenine.
nascere|roditi se|nasco,nasci,nasce,nasciamo,nascete,nascono|rodim se,rodiš se,rodi se,rodimo se,rodite se,rodijo se|Verdi nasce nel 1813.|Verdi se rodi leta 1813.
uccidere|ubiti|uccido,uccidi,uccide,uccidiamo,uccidete,uccidono|ubijem,ubiješ,ubije,ubijemo,ubijete,ubijejo|Nel film uccide cinque banditi.|V filmu ubije pet razbojnikov.
offrire|ponuditi|offro,offri,offre,offriamo,offrite,offrono|ponudim,ponudiš,ponudi,ponudimo,ponudite,ponudijo|Offro un caffè.|Ponudim kavo.`;
irregularRows.split('\n').forEach(row => {
  const [lemma, meaning, forms, translations, it, sl] = row.split('|');
  addVerb(lemma, meaning, forms.split(','), translations.split(','), [it, sl]);
});

function words(kind: string, rows: string) {
  rows.split('\n').forEach(row => {
    const [word, meaning, note] = row.split('|');
    if (word) worksheetLexicon[word] = { meaning, kind, note };
  });
}

words('slovnični izraz', `presente|sedanjik|il presente · moški spol
indicativo|povedni naklon|l’indicativo · moški spol
forme|oblike|la forma · množina le forme
verbi|glagoli|il verbo · množina i verbi
verbo|glagol|il verbo · množina i verbi
uso|raba|l’uso · moški spol
pronomi|zaimki|il pronome · množina i pronomi
riflessivi|povratni|Moška množina pridevnika riflessivo; verbi riflessivi = povratni glagoli.
regolare|pravilen|Oblika za oba spola v ednini; množina regolari.
regolari|pravilni|Množina pridevnika regolare.
irregolare|nepravilen|Oblika za oba spola v ednini; množina irregolari.
irregolari|nepravilni|Množina pridevnika irregolare.
frequenti|pogosti|Množina pridevnika frequente.
coniugazione|spreganje|la coniugazione · ženski spol
schema|preglednica|lo schema · moški spol
soggetto|osebek|il soggetto · moški spol
oggetto|predmet|l’oggetto · moški spol
persona|oseba|la persona · množina le persone
singolare|ednina|il singolare · moški spol
plurale|množina|il plurale · moški spol
infinito|nedoločnik|l’infinito · moški spol
accento|naglas|l’accento · moški spol
are|glagolska končnica -are|Prva italijanska spregatev.
ere|glagolska končnica -ere|Druga italijanska spregatev.
ire|glagolska končnica -ire|Tretja italijanska spregatev.
isco|končnica -isco|Prva oseba ednine pri delu glagolov na -ire.
isc|pripona -isc-|V sedanjiku glagolov kot capire v ednini in tretji osebi množine.
ano|končnica -ano|Tretja oseba množine glagolov na -are.
ono|končnica -ono|Tretja oseba množine glagolov na -ere in -ire.`);
words('samostalnik', `momento|trenutek|il momento · množina i momenti
telefono|telefon|il telefono · množina i telefoni
passato|preteklost|il passato · moški spol
film|film|il film · množina i film
tempo|čas|il tempo · množina i tempi
futuro|prihodnost|il futuro · moški spol
banditi|razbojniki|il bandito · množina i banditi
cinema|kino|il cinema · množina i cinema
differenze|razlike|la differenza · množina le differenze
possibilità|možnost|la possibilità · množina le possibilità
permesso|dovoljenje|il permesso · množina i permessi
bambini|otroci|il bambino · množina i bambini
capacità|sposobnost|la capacità · množina le capacità
competenza|usposobljenost|la competenza · ženski spol
abilità|spretnost|l’abilità · ženski spol
caratteri|črke|il carattere · množina i caratteri
persone|ljudje|la persona · množina le persone
paese|država|il paese · množina i paesi
conclusione|zaključek|la conclusione · ženski spol
metri|metri|il metro · množina i metri
secondi|sekunde|il secondo · množina i secondi
spazio|prostor|lo spazio · množina gli spazi
frasi|povedi|la frase · množina le frasi
esempio|primer|l’esempio · množina gli esempi
foto|fotografija|la foto · množina le foto
nome|ime|il nome · množina i nomi
personaggio|oseba|il personaggio · množina i personaggi
personaggi|osebe|il personaggio · množina i personaggi
cantante|pevec|il cantante · množina i cantanti
libro|knjiga|il libro · množina i libri
libri|knjige|il libro · množina i libri
borsa|torba|la borsa · množina le borse
tv|televizija|la TV · ženski spol
tango|tango|il tango · moški spol
panino|sendvič|il panino · množina i panini
musica|glasba|la musica · ženski spol
compiti|domače naloge|il compito · množina i compiti
porta|vrata|la porta · množina le porte
concerto|koncert|il concerto · množina i concerti
birra|pivo|la birra · množina le birre
giornale|časopis|il giornale · množina i giornali
fratelli|bratje|il fratello · množina i fratelli
regista|režiser|il regista · množina i registi
oscar|oskar|il premio Oscar · filmska nagrada
pasta|testenine|la pasta · ženski spol
industria|industrijsko podjetje|l’industria · množina le industrie
musei|muzeji|il museo · množina i musei
aeroporti|letališča|l’aeroporto · množina gli aeroporti
auditorium|avditoriji|l’auditorium · oblika se v množini ne spremeni
stadi|stadioni|lo stadio · množina gli stadi
attore|igralec|l’attore · množina gli attori
stilisti|modni oblikovalci|lo stilista · množina gli stilisti
moda|moda|la moda · ženski spol
romanzi|romani|il romanzo · množina i romanzi
anni|leta|l’anno · množina gli anni
provincia|pokrajina|la provincia · množina le province
figlia|hčerka|la figlia · množina le figlie
giorno|dan|il giorno · množina i giorni
giorni|dnevi|il giorno · množina i giorni
sera|večer|la sera · množina le sere
tagliatelle|široki rezanci|le tagliatelle · ženska množina
vino|vino|il vino · množina i vini
volta|krat|la volta · qualche volta = včasih
volte|krat|due volte = dvakrat
generazione|generacija|la generazione · množina le generazioni
azienda|podjetje|l’azienda · množina le aziende
mondo|svet|il mondo · množina i mondi
produzione|proizvodnja|la produzione · ženski spol
sport|šport|lo sport · množina gli sport
filosofia|filozofija|la filosofia · ženski spol
danza|ples|la danza · ženski spol
cose|stvari|la cosa · množina le cose
inizi|začetki|l’inizio · množina gli inizi
email|elektronsko sporočilo|l’email · ženski spol
liste|seznama|la lista · množina le liste
appartamento|stanovanje|l’appartamento · množina gli appartamenti
centro|središče|il centro · množina i centri
scuola|šola|la scuola · množina le scuole
matematica|matematika|la matematica · ženski spol
città|mesto|la città · množina le città
mare|morje|il mare · množina i mari
sole|sonce|il sole · množina i soli
anno|leto|l’anno · množina gli anni
cucina|kuhinja|la cucina · množina le cucine
abbraccio|objem|l’abbraccio · množina gli abbracci
notizie|novice|la notizia · množina le notizie
gatto|maček|il gatto · množina i gatti
amica|prijateljica|l’amica · množina le amiche
amiche|prijateljice|l’amica · množina le amiche
bacio|poljub|il bacio · množina i baci
mamma|mama|la mamma · množina le mamme
mamme|mami|la mamma · množina le mamme
giornata|dan|la giornata · potek dneva
colazione|zajtrk|la colazione · ženski spol
pranzo|kosilo|il pranzo · množina i pranzi
cena|večerja|la cena · množina le cene
caffè|kava|il caffè · množina i caffè
spesa|nakupi|la spesa · fare la spesa = nakupovati
casa|dom|la casa · množina le case
bagno|kopalnica|il bagno · fare il bagno = kopati se
televisione|televizija|la televisione · ženski spol
famiglia|družina|la famiglia · množina le famiglie
negozio|trgovina|il negozio · množina i negozi
pomeriggio|popoldne|il pomeriggio · množina i pomeriggi
vestiti|oblačila|il vestito · množina i vestiti
nazioni|države|la nazione · množina le nazioni
superstizioni|vraževerja|la superstizione · množina le superstizioni
lenticchie|leča|la lenticchia · množina le lenticchie
strada|cesta|la strada · množina le strade
direzione|smer|la direzione · množina le direzioni
scala|lestev|la scala · ženski spol; Scala di Milano je ime operne hiše
specchio|ogledalo|lo specchio · množina gli specchi
sfortuna|nesreča|la sfortuna · ženski spol
sale|sol|il sale · moški spol
tavola|miza|la tavola · a tavola = pri mizi
fazzoletto|robček|il fazzoletto · množina i fazzoletti
spilla|broška|la spilla · množina le spille
coltello|nož|il coltello · množina i coltelli
dolore|bolečina|il dolore · množina i dolori
regalo|darilo|il regalo · množina i regali
monetina|kovanček|la monetina · množina le monetine
centesimo|cent|il centesimo · množina i centesimi
numero|število|il numero · množina i numeri
venerdì|petek|il venerdì · množina i venerdì
quadrifoglio|štiriperesna deteljica|il quadrifoglio · množina i quadrifogli
ferro|železo|il ferro di cavallo = podkev
cavallo|konj|il cavallo · množina i cavalli
cornetto|rožiček|il cornetto · tukaj zaščitni amulet v obliki roga
fortuna|sreča|la fortuna · ženski spol
stella|zvezda|la stella · množina le stelle
desiderio|želja|il desiderio · množina i desideri
amico|prijatelj|l’amico · množina gli amici
esame|izpit|l’esame · množina gli esami
colloquio|razgovor|il colloquio · množina i colloqui
bocca|usta|la bocca · množina le bocche
lupo|volk|il lupo · množina i lupi
errore|napaka|l’errore · množina gli errori
colonna|stolpec|la colonna · množina le colonne
file|datoteka|il file · množina i file
paziente|pacient|il paziente · množina i pazienti
dottore|zdravnik|il dottore · množina i dottori
droghe|droge|la droga · množina le droghe
sigarette|cigarete|la sigaretta · množina le sigarette
acqua|voda|l’acqua · ženski spol
bicchieri|kozarci|il bicchiere · množina i bicchieri
vita|življenje|la vita · množina le vite
modo|način|il modo · množina i modi
medicine|zdravila|la medicina · množina le medicine
farmaci|zdravila|il farmaco · množina i farmaci
hobby|hobi|l’hobby · množina gli hobby
passatempi|prostočasne dejavnosti|il passatempo · množina i passatempi
litri|litri|il litro · množina i litri
mercato|trg|il mercato · množina i mercati
settimana|teden|la settimana · množina le settimane
ordine|vrstni red|l’ordine · moški spol
pianoforte|klavir|il pianoforte · množina i pianoforti
testa|glava|la testa · množina le teste
gola|grlo|la gola · množina le gole
tiramisù|tiramisu|il tiramisù · množina i tiramisù
ore|ure|l’ora · množina le ore
patente|vozniško dovoljenje|la patente · ženski spol
indirizzo|naslov|l’indirizzo · množina gli indirizzi
poker|poker|il poker · moški spol`);

function adjective(lemma: string, meaning: string, forms: string[], example: [string, string]) {
  const labels = ['moška ednina', 'ženska ednina', 'moška množina', 'ženska množina'];
  forms.forEach(form => { worksheetLexicon[form] = { kind: 'pridevnik', lemma, meaning, forms: forms.map((word, index) => [labels[index], word]), example }; });
}
const adjectiveRows = `italiano|italijanski|italiano,italiana,italiani,italiane|Un’azienda italiana.|Italijansko podjetje.
storico|zgodovinski|storico,storica,storici,storiche|Il presente storico.|Zgodovinski sedanjik.
abituale|običajen|abituale,abituale,abituali,abituali|Un gesto abituale.|Običajna kretnja.
sicuro|gotov|sicuro,sicura,sicuri,sicure|Un futuro sicuro.|Gotova prihodnost.
possibile|mogoč|possibile,possibile,possibili,possibili|È possibile.|Mogoče je.
russo|ruski|russo,russa,russi,russe|Parlo russo.|Govorim rusko.
cirillico|ciriličen|cirillico,cirillica,cirillici,cirilliche|I caratteri cirillici.|Cirilične črke.
incredibile|neverjeten|incredibile,incredibile,incredibili,incredibili|È incredibile!|Neverjetno je!
molto|veliko|molto,molta,molti,molte|Molte persone.|Veliko ljudi.
piccolo|majhen|piccolo,piccola,piccoli,piccole|Un piccolo spazio.|Majhen prostor.
nuovo|nov|nuovo,nuova,nuovi,nuove|I nuovi inizi.|Novi začetki.
libero|prost|libero,libera,liberi,libere|Il tempo libero.|Prosti čas.
famoso|znan|famoso,famosa,famosi,famose|Siamo famosi.|Znani smo.
privato|zaseben|privato,privata,privati,private|Cose private.|Zasebne stvari.
contento|zadovoljen|contento,contenta,contenti,contente|Sono contenta.|Zadovoljna sem.
stesso|isti|stesso,stessa,stessi,stesse|La stessa scuola.|Ista šola.
rumoroso|hrupen|rumoroso,rumorosa,rumorosi,rumorose|Una città rumorosa.|Hrupno mesto.
bellissimo|čudovit|bellissimo,bellissima,bellissimi,bellissime|È bellissima!|Čudovita je!
azzurro|moder|azzurro,azzurra,azzurri,azzurre|Il mare azzurro.|Modro morje.
siciliano|sicilijanski|siciliano,siciliana,siciliani,siciliane|La cucina siciliana.|Sicilijanska kuhinja.
buonissimo|izvrsten|buonissimo,buonissima,buonissimi,buonissime|È buonissima.|Izvrstna je.
moderno|sodoben|moderno,moderna,moderni,moderne|Una mamma moderna.|Sodobna mama.
antico|nekdanji|antico,antica,antichi,antiche|Una mamma antica.|Nekdanja mama.
felice|srečen|felice,felice,felici,felici|Sono felice.|Srečen sem.
vero|pravi|vero,vera,veri,vere|Un vero amico.|Pravi prijatelj.
superstizioso|vraževeren|superstizioso,superstiziosa,superstiziosi,superstiziose|È superstizioso.|Vraževeren je.
ricco|bogat|ricco,ricca,ricchi,ricche|Sono ricchi.|Bogati so.
nero|črn|nero,nera,neri,nere|Un gatto nero.|Črn maček.
rosso|rdeč|rosso,rossa,rossi,rosse|Il vino rosso.|Rdeče vino.
sfortunato|nesrečen|sfortunato,sfortunata,sfortunati,sfortunate|Un giorno sfortunato.|Nesrečen dan.
cadente|padajoč|cadente,cadente,cadenti,cadenti|Una stella cadente.|Zvezdni utrinek.
giusto|pravilen|giusto,giusta,giusti,giuste|L’ordine giusto.|Pravilen vrstni red.
lontano|oddaljen|lontano,lontana,lontani,lontane|Sta lontano dal vino.|Izogiba se vinu.
sessuale|spolni|sessuale,sessuale,sessuali,sessuali|La vita sessuale.|Spolno življenje.
sano|zdrav|sano,sana,sani,sane|Un modo sano.|Zdrav način.
semplice|preprost|semplice,semplice,semplici,semplici|È semplice.|Preprosto je.
difficile|težek|difficile,difficile,difficili,difficili|Le forme difficili.|Težke oblike.
eccezionale|izjemen|eccezionale,eccezionale,eccezionali,eccezionali|Un tiramisù eccezionale.|Izjemen tiramisu.
giapponese|japonski|giapponese,giapponese,giapponesi,giapponesi|Parlo giapponese.|Govorim japonsko.
sposato|poročen|sposato,sposata,sposati,sposate|Sono sposato.|Poročen sem.
bello|lep|bello,bella,belli,belle|Che bello!|Kako lepo!`;
adjectiveRows.split('\n').forEach(row => { const [lemma, meaning, forms, it, sl] = row.split('|'); adjective(lemma, meaning, forms.split(','), [it, sl]); });

words('izraz', `io|jaz
tu|ti
lui|on
lei|ona
noi|mi
voi|vi
loro|oni
mi|se|Povratni zaimek ob prvi osebi ednine; mi vesto = oblečem se.
ti|se|Povratni zaimek ob drugi osebi ednine; ti vesti = oblečeš se.
si|se|Povratni zaimek ob tretji osebi ednine ali množine.
ci|se|Povratni zaimek ob prvi osebi množine; ci chiamiamo = imenujemo se.
vi|se|Povratni zaimek ob drugi osebi množine.
il|določni člen|Moška ednina.
lo|določni člen|Moška ednina; lahko tudi zaimek ga/to.
la|določni člen|Ženska ednina.
i|določni člen|Moška množina.
gli|določni člen|Moška množina.
le|določni člen|Ženska množina.
l|določni člen|Skrajšani člen pred samoglasnikom.
un|nedoločni člen|Moška ednina.
una|nedoločni člen|Ženska ednina.
di|od|Predlog; di Roma = iz Rima.
del|od|di + il.
dei|od|di + i.
della|od|di + la.
dell|od|di + l’.
delle|od|di + le.
a|v / na|a Roma = v Rimu; a scuola = v šoli.
al|v / na|a + il.
alla|v / na|a + la.
alle|ob|a + le; alle 6 = ob šestih.
all|po / v|a + l’; all’italiana = po italijansko.
in|v
nel|v|in + il.
nella|v|in + la.
nelle|v|in + le.
nell|v|in + l’.
da|iz / pri|da Milano = iz Milana; da noi = pri nas.
dal|od|da + il.
dalle|od|da + le; dalle 9 = od devetih.
con|z
per|za
fra|med
tra|med
fuori|zunaj
sotto|pod
e|in
ed|in|Različica veznika e pred samoglasnikom.
o|ali
ma|ampak
perché|ker
se|če
che|ki|V vprašanjih lahko kaj.
come|kako
quando|ko / kdaj
dove|kje
dov|kje|dov’è = kje je.
questo|ta|Moška ednina kazalnega zaimka.
quel|tisti|Moška ednina pred samostalnikom.
quello|tisto
questa|ta|Ženska ednina.
qualcosa|nekaj
ogni|vsak
sempre|vedno
non|ne
ora|zdaj
normalmente|običajno
abbastanza|precej / dovolj
più|več
es|primer|Okrajšava za esempio.
anche|tudi
poi|nato
molto|zelo|Prislov; ob samostalniku lahko pomeni veliko.
solito|običajno|di solito = običajno.
tutto|ves
tutti|vsi
tutte|vse
qualche|nekaj|qualche volta = včasih.
tardi|pozno
quarta|četrta|Ženska ednina vrstilnega števnika quarto.
bene|dobro
qui|tukaj
single|samski|Prevzeta beseda, enaka za oba spola in obe števili.
forse|morda
ancora|še
po|malo|un po’ = malo.
così|tako
mai|nikoli
uno|eden
sette|sedem
simbolicamente|simbolično
invece|pa / nasprotno
solo|samo|da solo = sam.
auguri|čestitke / vse najboljše|V nalogi se pred izpitom uporabi In bocca al lupo!
crepi|naj pogine|Odgovor na In bocca al lupo! Celota Crepi il lupo pomeni naj volk pogine.
almeno|vsaj
due|dva
tre|tri
cinque|pet
quante|koliko|Vprašalni pridevnik za žensko množino.
quanti|koliko|Vprašalni pridevnik za moško množino.
sì|da
mah|hm
naturalmente|seveda
neanche|niti
moltissimi|zelo veliko
prima|prva
seconda|druga
terza|tretja
avanti|naprej
indietro|nazaj
benissimo|odlično
oggi|danes
stasera|nocoj
me|meni
insieme|skupaj
mal|bolečina|mal di testa = glavobol; mal di gola = boleče grlo.
bevuto|pil|Pretekli deležnik glagola bere; ho bevuto = pil sem.
vietato|prepovedano|Pretekli deležnik vietare, tukaj kot pridevnik.
lasciato|pustil|Pretekli deležnik lasciare; ho lasciato = pustil sem.
mescolate|pomešani|Ženska množina deležnika mescolare; si sono mescolate = so se pomešali.
buonasera|dober večer
gnammm|njam|Medmet ob okusni hrani.
ahi|joj
ciao|živjo`);
words('navodilo', `completa|dopolni|Velelnik glagola completare, 2. oseba ednine.
ricostruisci|sestavi|Velelnik glagola ricostruire, 2. oseba ednine.
abbina|poveži|Velelnik glagola abbinare, 2. oseba ednine.
riscrivi|prepiši|Velelnik glagola riscrivere, 2. oseba ednine.
segui|sledi|Velelnik glagola seguire, 2. oseba ednine.
inserisci|vstavi|Velelnik glagola inserire, 2. oseba ednine.
coniuga|spregaj|Velelnik glagola coniugare, 2. oseba ednine.
prova|poskusi|Velelnik glagola provare, 2. oseba ednine.
rimettere|znova postaviti|Nedoločnik; rimettere nell’ordine = znova urediti.
trasforma|preoblikuj|Velelnik glagola trasformare, 2. oseba ednine.
usando|z uporabo|Gerundij glagola usare.
memorizzarle|zapomniti si jih|Nedoločnik memorizzare z zaimkom le.
descrive|opisuje|Tretja oseba ednine glagola descrivere.
presentano|predstavijo se|si presentano = predstavijo se.`);

for (const name of ['Giuseppe', 'Verdi', 'Clint', 'Eastwood', 'Giulio', 'Giulia', 'Daniela', 'Alessandra', 'Gabriele', 'Luigi', 'Roberto', 'Emma', 'Vittoria', 'Federico', 'Laura', 'Pausini', 'Paolo', 'Sorrentino', 'Benigni', 'Dolce', 'Gabbana', 'Bolle', 'Barilla', 'Saviano', 'Renzo', 'Piano', 'Faenza', 'Ravenna', 'Paola', 'Guido', 'Luca', 'Casale', 'Monferrato', 'Alessandria', 'Francesca', 'Matteo', 'Antonella', 'Casanova', 'Maria', 'Francesco']) {
  worksheetLexicon[name.toLocaleLowerCase('it')] = { kind: 'lastno ime', meaning: name, note: 'Lastno ime v izvirnem besedilu.' };
}
words('lastno ime', `roma|Rim|Ime mesta.
milano|Milano|Ime mesta.
palermo|Palermo|Ime mesta.
firenze|Firence|Ime mesta.
bologna|Bologna|Ime mesta.
sicilia|Sicilija|Ime otoka in dežele.
natale|božič|Italijansko ime praznika.
pasqua|velika noč|Felice come una Pasqua = zelo srečen, srečen kot otrok.
capodanno|novo leto|Italijansko ime praznika.
excel|Excel|Ime programa za preglednice.`);

for (const [accented, plain] of Object.entries({ parliàmo: 'parliamo', parlàte: 'parlate', scrivéte: 'scrivete', partìte: 'partite', pàrlano: 'parlano', dòrmono: 'dormono' })) {
  worksheetLexicon[accented] = worksheetLexicon[plain];
}

words('samostalnik', `frase|poved|la frase · množina le frasi`);
words('izraz', `no|ne
comunque|vsekakor
quali|kateri
mentre|medtem ko
generale|splošno|in generale = na splošno
domani|jutri`);
regularVerb('raccontare|pripovedovati|pripovedujem,pripoveduješ,pripoveduje,pripovedujemo,pripovedujete,pripovedujejo|Racconto un film.|Pripovedujem vsebino filma.');
adjective('inglese', 'angleški', ['inglese', 'inglese', 'inglesi', 'inglesi'], ['Studio l’inglese.', 'Učim se angleščino.']);


// Worksheet context selects the sense and grammatical form used by the source.
export function lookupWorksheet(word: string, context: string): Entry | undefined {
  const key = word.toLocaleLowerCase('it').replace(/-/g, '');
  const entry = worksheetLexicon[key];
  const sentence = context.replace(/^worksheet:/, '').toLocaleLowerCase('it');
  if (word.startsWith('-') && ['a', 'e', 'ano', 'ono'].includes(key)) return { meaning: `končnica -${key}`, kind: 'slovnični izraz', note: 'Končnica povednega sedanjika v pojasnilu ob nalogi 9.' };
  if (!entry) return undefined;
  const sense = (meaning: string, note?: string): Entry => ({ ...entry, meaning, note: note || entry.note });
  if (key === 'lavoro' && /(?:per|di) lavoro/.test(sentence)) return { meaning: 'delo', kind: 'samostalnik', note: 'il lavoro · moški spol · množina i lavori; per lavoro = zaradi dela.' };
  if (key === 'cucina' && /maria cucina/.test(sentence)) return { ...worksheetLexicon.cucinare, meaning: 'kuha', note: '3. oseba ednine · povedni sedanjik' };
  if (key === 'sono' && /^io .*sono/.test(sentence)) return sense('sem', '1. oseba ednine · povedni sedanjik');
  if (key === 'c' && /c[’']è/.test(sentence)) return { meaning: 'tam', kind: 'zaimek', note: 'Skrajšana oblika ci. Celota c’è pomeni je oziroma obstaja, na primer c’è il sole = sije sonce.' };
  if (key === 'è' && /c[’']è/.test(sentence)) return sense('je', 'V zvezi c’è = je / obstaja.');
  if (key === 'ho' && /ho bevuto|ho lasciato/.test(sentence)) return sense('sem', 'Pomožni glagol avere v 1. osebi ednine, uporabljen v passato prossimo.');
  if (key === 'ho' && /ho (40|39) anni/.test(sentence)) return sense('sem star/-a', 'Ho … anni = star/-a sem … let. Dobesedno imam … let.');
  if (key === 'stai' && /come stai/.test(sentence)) return sense('se počutiš', 'Come stai? = Kako se počutiš?');
  if (key === 'sta' && /sta lontano dal vino/.test(sentence)) return sense('se izogibate', 'Sta lontano dal vino? = Se izogibate vinu? Vljudni nagovor z Lei.');
  if (key === 'fa' && /fa sport/.test(sentence)) return sense('se ukvarjate', 'Fa sport? = Se ukvarjate s športom? Vljudni nagovor z Lei.');
  if (key === 'fa' && /fa il regista/.test(sentence)) return sense('je', 'Fa il regista = po poklicu je režiser.');
  if (key === 'fare' && /fare la spesa/.test(sentence)) return sense('nakupovati', 'Fare la spesa = opravljati nakupe.');
  if (key === 'fare' && /fare il bagno/.test(sentence)) return sense('kopati se', 'Fare il bagno = kopati se.');
  if (key === 'portare' && /a scuola/.test(sentence)) return sense('peljati', 'Portare i bambini a scuola = peljati otroke v šolo.');
  if (key === 'inglese' && /l[’']inglese/.test(sentence)) return sense('angleščina', 'Poimenovanje jezika.');
  if (key === 'italiano' && /io italiano/.test(sentence)) return sense('italijanščina', 'Poimenovanje jezika.');
  if (key === 'russo' && /parlo russo/.test(sentence)) return sense('rusko', 'Parlare russo = govoriti rusko.');
  if (key === 'scala' && /scala di milano/.test(sentence)) return { meaning: 'Scala', kind: 'lastno ime', note: 'Ime milanske operne hiše La Scala.' };
  for (const lemma of ['ricordarsi', 'vestirsi', 'lavarsi', 'svegliarsi', 'alzarsi', 'rompersi']) {
    const verb = worksheetLexicon[lemma];
    const matched = verb.forms?.find(([, form]) => form.endsWith(` ${key}`) && sentence.includes(form));
    if (matched) return { ...worksheetLexicon[matched[1]], note: `Povratna oblika ${matched[1]} · ${matched[0]} · povedni sedanjik` };
  }
  return entry;
}

words('zaimek', `c|tam|Skrajšana oblika ci v c’è = je / obstaja.`);

const instructionVerbs = [
  ['completare|dopolniti|dopolnim,dopolniš,dopolni,dopolnimo,dopolnite,dopolnijo|Completo la tabella.|Dopolnim tabelo.', 'completa', 'dopolni'],
  ['abbinare|povezati|povežem,povežeš,poveže,povežemo,povežete,povežejo|Abbino le parole.|Povežem besede.', 'abbina', 'poveži'],
  ['coniugare|spregati|spregam,spregaš,sprega,spregamo,spregate,spregajo|Coniugo il verbo.|Spregam glagol.', 'coniuga', 'spregaj'],
  ['provare|poskusiti|poskusim,poskusiš,poskusi,poskusimo,poskusite,poskusijo|Provo a rispondere.|Poskusim odgovoriti.', 'prova', 'poskusi'],
  ['trasformare|preoblikovati|preoblikujem,preoblikuješ,preoblikuje,preoblikujemo,preoblikujete,preoblikujejo|Trasformo la frase.|Preoblikujem poved.', 'trasforma', 'preoblikuj'],
] as const;
for (const [row, imperative, meaning] of instructionVerbs) {
  regularVerb(row);
  worksheetLexicon[imperative] = { ...worksheetLexicon[imperative], meaning, note: 'Velelnik · 2. oseba ednine. Tabela prikazuje povedni sedanjik.' };
}
for (const [row, imperative, meaning] of [
  ['ricostruire|sestaviti|sestavim,sestaviš,sestavi,sestavimo,sestavite,sestavijo|Ricostruisco la frase.|Sestavim poved.', 'ricostruisci', 'sestavi'],
  ['inserire|vstaviti|vstavim,vstaviš,vstavi,vstavimo,vstavite,vstavijo|Inserisco una parola.|Vstavim besedo.', 'inserisci', 'vstavi'],
]) {
  regularVerb(row, true);
  worksheetLexicon[imperative] = { ...worksheetLexicon[imperative], meaning, note: 'Velelnik · 2. oseba ednine. Tabela prikazuje povedni sedanjik.' };
}
regularVerb('riscrivere|prepisati|prepišem,prepišeš,prepiše,prepišemo,prepišete,prepišejo|Riscrivo la frase.|Prepišem poved.');
worksheetLexicon.riscrivi = { ...worksheetLexicon.riscrivi, meaning: 'prepiši', note: 'Velelnik · 2. oseba ednine. Tabela prikazuje povedni sedanjik.' };
regularVerb('seguire|slediti|sledim,slediš,sledi,sledimo,sledite,sledijo|Seguo l’esempio.|Sledim primeru.');
worksheetLexicon.segui = { ...worksheetLexicon.segui, meaning: 'sledi', note: 'Velelnik · 2. oseba ednine. Tabela prikazuje povedni sedanjik.' };
regularVerb('descrivere|opisati|opišem,opišeš,opiše,opišemo,opišete,opišejo|Descrivo una persona.|Opišem osebo.');
regularVerb('presentarsi|predstaviti se|predstavim se,predstaviš se,predstavi se,predstavimo se,predstavite se,predstavijo se|Mi presento.|Predstavim se.');
regularVerb('rimettere|znova postaviti|znova postavim,znova postaviš,znova postavi,znova postavimo,znova postavite,znova postavijo|Rimetto il libro sul tavolo.|Knjigo znova položim na mizo.');
for (const [lemma, meaning, forms, it, sl] of [
  ['regolare', 'pravilen', ['regolare', 'regolare', 'regolari', 'regolari'], 'I verbi regolari.', 'Pravilni glagoli.'],
  ['irregolare', 'nepravilen', ['irregolare', 'irregolare', 'irregolari', 'irregolari'], 'I verbi irregolari.', 'Nepravilni glagoli.'],
  ['riflessivo', 'povraten', ['riflessivo', 'riflessiva', 'riflessivi', 'riflessive'], 'I verbi riflessivi.', 'Povratni glagoli.'],
  ['frequente', 'pogost', ['frequente', 'frequente', 'frequenti', 'frequenti'], 'Le forme frequenti.', 'Pogoste oblike.'],
  ['primo', 'prvi', ['primo', 'prima', 'primi', 'prime'], 'La prima persona.', 'Prva oseba.'],
  ['secondo', 'drugi', ['secondo', 'seconda', 'secondi', 'seconde'], 'La seconda persona.', 'Druga oseba.'],
  ['terzo', 'tretji', ['terzo', 'terza', 'terzi', 'terze'], 'La terza persona.', 'Tretja oseba.'],
  ['quarto', 'četrti', ['quarto', 'quarta', 'quarti', 'quarte'], 'La quarta generazione.', 'Četrta generacija.'],
  ['single', 'samski', ['single', 'single', 'single', 'single'], 'Sono single.', 'Sem samska.'],
] as [string, string, string[], string, string][]) adjective(lemma, meaning, forms, [it, sl]);
// In the athletics example secondi is a unit of time.
worksheetLexicon.secondi = { meaning: 'sekunde', kind: 'samostalnik', note: 'il secondo · množina i secondi' };
