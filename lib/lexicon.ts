import {worksheetLexicon,lookupWorksheet} from './worksheet-lexicon';
﻿export type Entry={meaning:string;kind:string;lemma?:string;note?:string;forms?:[string,string][];example?:[string,string]};
export const lexicon:Record<string,Entry>={};
function basic(kind:string, rows:string){for(const row of rows.split('\n')){const [word,meaning,note]=row.split('|');if(word)lexicon[word]={meaning,kind,note};}}
basic('samostalnik',`studente|študent|lo studente · moški spol · množina: gli studenti
studenti|študenti|ednina: lo studente
studentessa|študentka|la studentessa · ženski spol · množina: le studentesse
insegnante|učitelj/-ica|l’insegnante · oba spola · množina: gli/le insegnanti
fotografa|fotografinja|la fotografa · množina: le fotografe
presentazioni|predstavitve|ednina: la presentazione
parole|besede|ednina: la parola
immagini|slike|ednina: l’immagine (ženski spol)
domande|vprašanja|ednina: la domanda
risposte|odgovori|ednina: la risposta
gruppi|skupine|ednina: il gruppo
turno|vrsta|a turno = izmenično
esercizio|vaja|l’esercizio · moški spol · množina: gli esercizi
compagni|sošolci|ednina: il compagno
lingua|jezik|la lingua · množina: le lingue
pagina|stran|la pagina · množina: le pagine
lavagna|tabla|la lavagna · množina: le lavagne
coppia|par|la coppia · in coppia = v parih
appendice|dodatek|l’appendice · ženski spol
computer|računalnik|il computer · množina: i computer
gelato|sladoled|il gelato · množina: i gelati
economia|ekonomija|l’economia · ženski spol
classe|razred|la classe · množina: le classi`);
basic('izraz',`buongiorno|dober dan
ciao|živjo
come|kako
di|iz|V predstavitvi di Roma = iz Rima; v drugih zvezah lahko pomeni od.
dove|kje|di dove = od kod
che|kaj|che cosa = kaj
cosa|kaj|v vprašalni zvezi che cosa
cos|kaj|cos’è = kaj je
e|in
anche|tudi
tu|ti
mi|se / mi|mi chiamo = ime mi je; mi piace = všeč mi je
ti|se / ti|ti chiami = ime ti je
si|se|si dice = se reče
sì|da
non|ne
in|v
a|na|a pagina = na strani; a turno = izmenično
ai|sošolcem / k|a + i; ai compagni = sošolcem
alle|s / k|a + le; associa alle immagini = poveži s slikami
poi|nato
nella|v|in + la
nella tua lingua|v tvojem jeziku
per|za
queste|te|ženska množina kazalnega zaimka questa
le|določni člen|ženska množina: le parole
la|določni člen|ženska ednina: la lavagna
lo|določni člen|moška ednina: lo studente
l|določni člen|l’ pred samoglasnikom
il|določni člen|moška ednina: il computer
dell|od / pripadnost|di + l’; dell’insegnante = učiteljice
 della|od / pripadnost
degli|od / pripadnost|di + gli; degli studenti = študentov
p|stran|okrajšava za pagina
it|italijanščina
sl|slovenščina`);
const persons=['io','tu','lui / lei','noi','voi','loro'];
function verb(lemma:string,meaning:string,forms:string[],example:[string,string],variants:Record<string,[string,string]>={}){const table=persons.map((p,i)=>[p,forms[i]] as [string,string]);lexicon[lemma]={meaning,kind:'glagol',lemma,forms:table,example,note:'Sedanjik · indicativo presente'};for(let i=0;i<forms.length;i++){const key=forms[i].replace(/^(mi|ti|si|ci|vi) /,'');lexicon[key]={meaning,kind:'glagol',lemma,forms:table,example,note:`${i%3+1}. oseba ${i<3?'ednine':'množine'} · sedanjik`};}for(const [key,[m,n]] of Object.entries(variants))lexicon[key]={meaning:m,kind:'glagol',lemma,forms:table,example,note:n};}
verb('essere','biti',['sono','sei','è','siamo','siete','sono'],['Sono studente.','Sem študent.'],{sono:['sem','1. oseba ednine v predstavitvah na tej strani; lahko tudi 3. oseba množine.'],sei:['si','2. oseba ednine · sedanjik'],è:['je','3. oseba ednine · sedanjik']});
verb('chiamarsi','imenovati se',['mi chiamo','ti chiami','si chiama','ci chiamiamo','vi chiamate','si chiamano'],['Mi chiamo Silvia.','Ime mi je Silvia.'],{chiamo:['imenujem se','Mi chiamo = ime mi je. 1. oseba ednine.'],chiami:['imenuješ se','Come ti chiami? = Kako ti je ime? 2. oseba ednine.']});
verb('fare','delati',['faccio','fai','fa','facciamo','fate','fanno'],['Faccio la fotografa.','Delam kot fotografinja.'],{faccio:['delam','1. oseba ednine · sedanjik'],fai:['delaš','2. oseba ednine · sedanjik'],fate:['postavljajte','V navodilu: fate le domande = postavljajte vprašanja. 2. oseba množine, velelnik.']});
verb('ascoltare','poslušati',['ascolto','ascolti','ascolta','ascoltiamo','ascoltate','ascoltano'],['Ascolto l’insegnante.','Poslušam učiteljico.'],{ascolta:['poslušaj','V navodilu: 2. oseba ednine, velelnik.']});
verb('leggere','brati',['leggo','leggi','legge','leggiamo','leggete','leggono'],['Leggo un libro.','Berem knjigo.'],{leggi:['preberi','V navodilu: 2. oseba ednine, velelnik.']});
verb('parlare','govoriti',['parlo','parli','parla','parliamo','parlate','parlano'],['Parlo italiano.','Govorim italijansko.']);
verb('scrivere','pisati',['scrivo','scrivi','scrive','scriviamo','scrivete','scrivono'],['Scrivo una parola.','Napišem besedo.'],{scrivi:['napiši','V navodilu: 2. oseba ednine, velelnik.'],scrive:['piše','Come si scrive? = Kako se napiše? 3. oseba ednine.']});
verb('guardare','gledati',['guardo','guardi','guarda','guardiamo','guardate','guardano'],['Guardo la lavagna.','Gledam tablo.']);
verb('studiare','študirati',['studio','studi','studia','studiamo','studiate','studiano'],['Studio Economia.','Študiram ekonomijo.'],{studio:['študiram','1. oseba ednine · sedanjik']});
verb('lavorare','delati',['lavoro','lavori','lavora','lavoriamo','lavorate','lavorano'],['Lavoro a Roma.','Delam v Rimu.'],{lavoro:['delam','1. oseba ednine · sedanjik']});
verb('rispondere','odgovoriti',['rispondo','rispondi','risponde','rispondiamo','rispondete','rispondono'],['Rispondo alla domanda.','Odgovorim na vprašanje.'],{rispondi:['odgovori','V navodilu: 2. oseba ednine, velelnik.'],rispondete:['odgovarjajte','V navodilu: 2. oseba množine, velelnik.']});
verb('associare','povezati',['associo','associ','associa','associamo','associate','associano'],['Associa le parole alle immagini.','Poveži besede s slikami.'],{associa:['poveži','V navodilu: 2. oseba ednine, velelnik.']});
verb('dire','reči',['dico','dici','dice','diciamo','dite','dicono'],['Come si dice “gelato”?','Kako se reče »sladoled«?'],{dice:['reče','Si dice = se reče. 3. oseba ednine.'],dicono:['rečejo','Come si dicono? = Kako se rečejo? 3. oseba množine.']});
verb('chiedere','vprašati',['chiedo','chiedi','chiede','chiediamo','chiedete','chiedono'],['Chiedete come si dice.','Vprašajte, kako se reče.'],{chiedete:['vprašajte','V navodilu: 2. oseba množine, velelnik.']});
verb('significare','pomeniti',['significo','significhi','significa','significhiamo','significate','significano'],['Che cosa significa “lavagna”?','Kaj pomeni »lavagna«?'],{significa:['pomeni','3. oseba ednine · sedanjik']});
verb('capire','razumeti',['capisco','capisci','capisce','capiamo','capite','capiscono'],['Hai capito?','Si razumel/-a?'],{capito:['razumel/-a','Pretekli deležnik glagola capire. Hai capito = si razumel/-a (passato prossimo).']});
verb('avere','imeti',['ho','hai','ha','abbiamo','avete','hanno'],['Ho capito.','Razumel/-a sem.'],{hai:['si (pomožni glagol)','Hai capito: avere je pomožni glagol v 2. osebi ednine. Celota pomeni si razumel/-a.'],ho:['sem (pomožni glagol)','Ho capito = razumel/-a sem; avere je pomožni glagol.']});
verb('piacere','biti všeč',['piaccio','piaci','piace','piacciamo','piacete','piacciono'],['Mi piace il gelato.','Všeč mi je sladoled.'],{piace:['je všeč','Mi piace = všeč mi je. 3. oseba ednine.']});
verb('scusare','oprostiti',['scuso','scusi','scusa','scusiamo','scusate','scusano'],['Scusi, non ho capito.','Oprostite, nisem razumel/-a.'],{scusi:['oprostite','Vljudni velelnik (Lei); nagovor eni osebi.']});
function adjective(base:string,meaning:string,forms:[string,string,string,string],example:[string,string]){const table:[string,string][]=[['moška ednina',forms[0]],['ženska ednina',forms[1]],['moška množina',forms[2]],['ženska množina',forms[3]]];for(const f of new Set(forms))lexicon[f]={meaning,kind:'pridevnik',lemma:base,forms:table,example};}
adjective('italiano','italijanski',['italiano','italiana','italiani','italiane'],['Sono italiana.','Sem Italijanka.']);
adjective('australiano','avstralski',['australiano','australiana','australiani','australiane'],['Sono australiano.','Sem Avstralec.']);
adjective('spagnolo','španski',['spagnolo','spagnola','spagnoli','spagnole'],['Sono spagnola.','Sem Španka.']);
adjective('francese','francoski',['francese','francese','francesi','francesi'],['Parlo francese.','Govorim francosko.']);
adjective('portoghese','portugalski',['portoghese','portoghese','portoghesi','portoghesi'],['Parlo portoghese.','Govorim portugalsko.']);
adjective('tuo','tvoj',['tuo','tua','tuoi','tue'],['Nella tua lingua.','V tvojem jeziku.']);
adjective('mio','moj',['mio','mia','miei','mie'],['La mia lingua.','Moj jezik.']);
adjective('vostro','vaš',['vostro','vostra','vostri','vostre'],['Sono la vostra insegnante.','Sem vaša učiteljica.']);
for(const name of ['Silvia','Joey','Norma','Roma','Sydney','Madrid'])lexicon[name.toLowerCase()]={meaning:name==='Roma'?'Rim':name,kind:'lastno ime',note:['Roma','Sydney','Madrid'].includes(name)?'Ime mesta.':'Osebno ime; se ne prevaja.'};
basic('tuji izraz',`i|jaz|angleščina: I like = všeč mi je
like|imeti rad|angleščina: I like = všeč mi je
blackboard|tabla|angleška beseda
ice|led|angleščina: ice-cream = sladoled
cream|smetana|angleščina: ice-cream = sladoled
ordinateur|računalnik|francoska beseda
comment|kako|francoščina
de|od|portugalščina: de onde = od kod
onde|kje|portugalščina: de onde = od kod
qué|kaj|španščina
c|črka C|pri črkovanju besede ciao
o|črka O|pri črkovanju besede ciao`);
export function lookup(word:string){return lexicon[word.toLocaleLowerCase('it')];}
verb('presentarsi','predstaviti se',['mi presento','ti presenti','si presenta','ci presentiamo','vi presentate','si presentano'],['Mi presento.','Predstavim se.'],{presento:['predstavim se','Mi presento = predstavim se. 1. oseba ednine.']});
verb('comunicare','sporazumevati se',['comunico','comunichi','comunica','comunichiamo','comunicate','comunicano'],['Comunicare in classe.','Sporazumevanje v razredu.']);
lexicon.insegnante.meaning='učitelj';
lexicon.insegnante.note='l’insegnante · oba spola; v predstavitvi Silvie: učiteljica. Množina: gli/le insegnanti.';
lexicon.italiana.meaning='Italijanka';
lexicon.italiana.note='Ženska ednina pridevnika italiano (italijanski); sono italiana = sem Italijanka.';
lexicon.australiano.meaning='Avstralec';
lexicon.australiano.note='Moška ednina pridevnika australiano (avstralski); sono australiano = sem Avstralec.';
lexicon.spagnola.meaning='Španka';
lexicon.spagnola.note='Ženska ednina pridevnika spagnolo (španski); sono spagnola = sem Španka.';
lexicon.della={meaning:'od / pripadnost',kind:'predlog s členom',note:'di + la'};
export function lookupInContext(word:string,context:string):Entry|undefined{const key=word.toLocaleLowerCase('it');if(context.startsWith('worksheet:')){const normalized=key.replace(/-/g,'');return lookupWorksheet(word,context)||lookup(normalized);}const entry=lookup(word);if(context==='italiano'||context==='francese'||context==='portoghese'||context==='spagnolo'){const meaning:Record<string,string>={italiano:'italijanščina',francese:'francoščina',portoghese:'portugalščina',spagnolo:'španščina'};if(meaning[key])return {...entry!,meaning:meaning[key],note:'V glavi tabele: ime jezika.'};}if(key==='a'&&context==='C, i, a, o.')return {meaning:'črka A',kind:'črka'};if(key==='i'&&context==='C, i, a, o.')return {meaning:'črka I',kind:'črka'};return entry;}

for(const [word,entry] of Object.entries(worksheetLexicon)){if(!lexicon[word])lexicon[word]=entry;}
