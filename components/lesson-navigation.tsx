'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, List } from 'lucide-react';

export function PageNavigation({ page, total, onGo, position = 'bottom' }: {
  page: number; total: number; onGo: (page: number) => void; position?: 'top' | 'bottom';
}) {
  return <nav className={`page-navigation page-navigation-${position}`} aria-label={position === 'top' ? 'Strani – zgoraj' : 'Strani – spodaj'}>
    <button type="button" disabled={page === 1} onClick={() => onGo(page - 1)}><ArrowLeft size={17}/><span>Prejšnja stran</span></button>
    <span aria-live="polite">{page} / {total}</span>
    <button type="button" disabled={page === total} onClick={() => onGo(page + 1)}><span>Naslednja stran</span><ArrowRight size={17}/></button>
  </nav>;
}

export type Chapter = { id: string; title: string; subtitle?: string; pages?: { page: number; label: string; detail?: string }[]; children?: Chapter[] };

function activePath(chapters: Chapter[], page: number): string[] {
  for (const chapter of chapters) {
    if (chapter.pages?.some(item => item.page === page)) return [chapter.id];
    const path = activePath(chapter.children || [], page);
    if (path.length) return [chapter.id, ...path];
  }
  return [];
}

export function ChapterMenu({ title, chapters, page, onGo }: {title: string; chapters: Chapter[]; page: number; onGo: (page: number) => void}) {
  const id = useId();
  const [open, setOpen] = useState(() => activePath(chapters, page));
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const active = activePath(chapters, page);
  const pathKey = active.join('/');
  useEffect(() => { setOpen(pathKey.split('/').filter(Boolean)); }, [page, pathKey]);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const update = () => setCompact(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  function go(next: number) {
    onGo(next);
    if (compact) { setExpanded(false); toggle.current?.focus(); }
  }
  function render(items: Chapter[], level = 0): React.ReactNode {
    return items.map(chapter => {
      const opened = open.includes(chapter.id);
      const region = `${id}-${chapter.id}`;
      return <div className={`chapter-group chapter-level-${level}`} key={chapter.id}>
        <button type="button" className={`chapter-toggle ${active.includes(chapter.id) ? 'chapter-current' : ''}`} aria-expanded={opened} aria-controls={region} onClick={() => setOpen(previous => opened ? previous.filter(item => item !== chapter.id) : [...previous, chapter.id])}>
          <span>{chapter.title}{chapter.subtitle && <small>{chapter.subtitle}</small>}</span><ChevronDown size={17} className={opened ? 'chapter-chevron-open' : ''}/>
        </button>
        <div id={region} hidden={!opened} className="chapter-pages">
          {chapter.children && render(chapter.children, level + 1)}
          {chapter.pages?.map(item => <button type="button" key={item.page} className={`chapter-page ${page === item.page ? 'selected' : ''}`} aria-current={page === item.page ? 'page' : undefined} onClick={() => go(item.page)}><span>{item.label}{item.detail && <small>{item.detail}</small>}</span>{page === item.page && <ChevronRight size={16}/>}</button>)}
        </div>
      </div>;
    });
  }
  return <aside className="sidebar chapter-sidebar" aria-label={`Vsebina: ${title}`}>
    <span className="eyebrow chapter-book-title">{title}</span>
    <button type="button" ref={toggle} className="chapter-mobile-toggle" aria-expanded={expanded} aria-controls={`${id}-contents`} onClick={() => setExpanded(!expanded)}><List size={18}/><span>Vsebina učbenika</span><ChevronDown size={17} className={expanded ? 'chapter-chevron-open' : ''}/></button>
    <div id={`${id}-contents`} hidden={compact && !expanded} className="chapter-tree">{render(chapters)}</div>
  </aside>;
}
