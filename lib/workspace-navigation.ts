export type BookId='volentieri'|'worksheet';
export type WorkspaceRoute={book:BookId|null;folder:string|null;page:number};
export const LIBRARY_PATH='/moji_ucbeniki';
export function workspaceRoute(pathname:string,params:Pick<URLSearchParams,'get'>):WorkspaceRoute {
  const segment=pathname.split('/')[2];
  const book:BookId|null=segment==='volentieri'||segment==='worksheet'?segment:null;
  const start=book==='worksheet'?1:9,end=book==='worksheet'?7:56;
  const input=Number(params.get('stran'));
  return {book,folder:params.get('mapa')||null,page:Number.isInteger(input)&&input>=start&&input<=end?input:start};
}
export function libraryHref(folder:string|null=null){const q=new URLSearchParams();if(folder)q.set('mapa',folder);return LIBRARY_PATH+(q.size?'?'+q:'');}
export function bookHref(book:BookId,folder:string|null=null,page?:number){const q=new URLSearchParams();if(folder)q.set('mapa',folder);if(page!==undefined)q.set('stran',String(page));return `${LIBRARY_PATH}/${book}`+(q.size?'?'+q:'');}
