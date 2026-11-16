import type { Chapter } from '../components/lesson-navigation';

const pages = (start: number, labels: string[]) => labels.map((label, index) => ({ page: start + index, label, detail: `Tiskana str. ${start + index}` }));
export const volentieriChapters: Chapter[] = [
  { id: 'unit-0', title: '0 · In classe!', subtitle: 'V razredu · str. 9–13', pages: pages(9, ['Mi presento', 'Comunicare in classe', 'Comunicare in classe', 'L’alfabeto', 'I numeri da 0 a 20']) },
  { id: 'unit-1', title: '1 · Benvenuto!', subtitle: 'Dobrodošel! · str. 14–28', children: [
    { id: 'introduction', title: 'Uvod', pages: pages(14, ['Benvenuto! · osebe', 'Benvenuto! · predstavitve']) },
    { id: 'lesson-1', title: '1 · Piacere!', subtitle: 'Me veseli!', pages: pages(16, ['Fotografije in video', 'Osebe in poklici', 'Pogovori in intonacija']) },
    { id: 'lesson-2', title: '2 · Come ti chiami?', subtitle: 'Kako ti je ime?', pages: pages(19, ['Predstavitve v razredu', 'Glagoli in narodnosti', 'Števila in identiteta']) },
    { id: 'lesson-3', title: '3 · Nuovi amici', subtitle: 'Novi prijatelji', pages: pages(22, ['Profili in interesi', 'Colinov blog', 'Opisovanje in pozdravi']) },
    { id: 'project', title: 'Projekt · Profil', pages: pages(25, ['Sarin profil', 'Ustvari svoj profil']) },
    { id: 'reference', title: 'Povzetki', pages: pages(27, ['Sporazumevanje', 'Besedišče in slovnica']) },
  ] },
  { id: 'unit-2', title: '2 · In giro per Bologna', subtitle: 'Naokrog po Bologni · str. 29–42', children: [
    { id: 'unit-2-intro', title: 'Uvod', pages: pages(29,['Zemljevid Bologne']) },
    { id: 'unit-2-lesson-1', title: '1 · Dov’è la fermata dell’autobus?', subtitle: 'Kje je avtobusna postaja?', pages: pages(30,['Vožnja po mestu','Prevoz in mestni kraji','Glasbila in glagoli']) },
    { id: 'unit-2-lesson-2', title: '2 · Un caffè, grazie!', subtitle: 'Kavo, prosim!', pages: pages(33,['Hrana in pijača','Naročanje in množina','Vrste barov in ure']) },
    { id: 'unit-2-lesson-3', title: '3 · Ma che bella città!', subtitle: 'Kako lepo mesto!', pages: pages(36,['Colinov blog o Bologni','Opisovanje mesta','Družina in glagoli']) },
    { id: 'unit-2-project', title: 'Projekt · Četrt', pages: pages(39,['Načrt idealne četrti','Prebivalci in predstavitev']) },
    { id: 'unit-2-reference', title: 'Povzetki', pages: pages(41,['Sporazumevanje in besedišče','Slovnica']) },
  ] },
  { id: 'unit-3', title: '3 · È tardi!', subtitle: 'Pozno je! · str. 43–56', children: [
    { id: 'unit-3-intro', title: 'Uvod', pages: pages(43,['Deli dneva in opravila']) },
    { id: 'unit-3-lesson-1', title: '1 · Il lunedì ho la mattina libera', subtitle: 'Ob ponedeljkih imam prosto dopoldne', pages: pages(44,['Delo in dnevni urnik','Dnevi in pogostost','Prosti čas in pogovori']) },
    { id: 'unit-3-lesson-2', title: '2 · E voi che programmi avete?', subtitle: 'Kakšne načrte pa imate vi?', pages: pages(47,['Forum o koncu tedna','Spreganje in igra s kockama','Povratni glagoli in rutina']) },
    { id: 'unit-3-lesson-3', title: '3 · Vuoi venire con me?', subtitle: 'Bi šel z menoj?', pages: pages(50,['Urnik in povabilo','Predlogi in kraji','Klepet in naklonski glagoli']) },
    { id: 'unit-3-project', title: 'Projekt · Konec tedna', pages: pages(53,['Mesto in dogodki','Program in povabilo']) },
    { id: 'unit-3-reference', title: 'Povzetki', pages: pages(55,['Sporazumevanje in besedišče','Slovnica']) },
  ] },
];
