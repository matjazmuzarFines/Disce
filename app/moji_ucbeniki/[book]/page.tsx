import {notFound} from 'next/navigation';
export default async function BookPage({params}:{params:Promise<{book:string}>}){
  const {book}=await params;
  if(book!=='volentieri'&&book!=='worksheet')notFound();
  return null;
}
