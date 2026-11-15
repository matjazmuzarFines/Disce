'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckSquare, Folder, FolderPlus, Pencil, Search, Tag, Trash2, X } from 'lucide-react';

type Item = { id: string; name: string; kind: 'book' | 'folder'; parent: string | null; labels: string[] };
type Label = { id: string; name: string; color: string };
type LibraryData = { items: Item[]; labels: Label[] };
const initial: LibraryData = { items: [
  { id: 'volentieri', name: 'Volentieri! A1', kind: 'book', parent: null, labels: [] },
  { id: 'worksheet', name: 'Delovni list 1', kind: 'book', parent: null, labels: [] },
], labels: [] };
const colors = ['#82a8fa', '#be9cff', '#ed9bc7', '#efa987', '#dfc377', '#9aa6ba'];
export function Library({ onOpen, userId }: { onOpen: (id: string) => void; userId: string }) {
  const storageKey = `disce-library-v1:${userId}`;
  const [data, setData] = useState<LibraryData>(initial);
  const [loaded, setLoaded] = useState(false);
  const [folder, setFolder] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [dialog, setDialog] = useState<'create' | 'rename' | 'labels' | 'delete' | 'move' | null>(null);
  const [title, setTitle] = useState('');
  const [labelName, setLabelName] = useState('');
  const [color, setColor] = useState(colors[0]);
  const [chosenLabels, setChosenLabels] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    try {
      let stored = localStorage.getItem(storageKey);
      const owner = localStorage.getItem('disce-legacy-library-owner');
      if (!stored && (!owner || owner === userId)) {
        stored = localStorage.getItem('disce-library-v1');
        if (stored) localStorage.setItem('disce-legacy-library-owner', userId);
      }
      const saved = JSON.parse(stored || 'null');
      if (saved && Array.isArray(saved.items) && Array.isArray(saved.labels)) setData(saved);
    } catch {}
    setLoaded(true);
  }, [storageKey, userId]);
  useEffect(() => { if (loaded) localStorage.setItem(storageKey, JSON.stringify(data)); }, [data, loaded, storageKey]);
  useEffect(() => {
    if (dialog) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [dialog]);
  const current = data.items.find(item => item.id === folder);
  const visible = data.items.filter(item => item.parent === folder && item.name.toLocaleLowerCase('sl').includes(query.toLocaleLowerCase('sl')) && (!filter || item.labels.includes(filter)));
  const selection = data.items.filter(item => selected.includes(item.id));
  const allSelected = visible.length > 0 && visible.every(item => selected.includes(item.id));
  const single = selection.length === 1 ? selection[0] : undefined;
  const toggle = (id: string) => setSelected(value => value.includes(id) ? value.filter(key => key !== id) : [...value, id]);
  const navigate = (id: string | null) => { setFolder(id); setSelected([]); setQuery(''); setFilter(''); };
  const open = (mode: typeof dialog) => {
    setError(''); setTitle(mode === 'rename' ? single?.name || '' : '');
    setLabelName(''); setChosenLabels(single?.labels || []); setDestination(''); setDialog(mode);
  };
  const descendants = (ids: string[]) => {
    const result = new Set(ids);
    let previous = -1;
    while (previous !== result.size) {
      previous = result.size;
      data.items.forEach(item => { if (item.parent && result.has(item.parent)) result.add(item.id); });
    }
    return result;
  };
  const excluded = descendants(selected);
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if ((dialog === 'create' || dialog === 'rename') && !title.trim()) { setError('Vnesi ime.'); return; }
    if (dialog === 'create') setData(value => ({ ...value, items: [...value.items, { id: crypto.randomUUID(), name: title.trim(), kind: 'folder', parent: folder, labels: chosenLabels }] }));
    if (dialog === 'rename' && single) setData(value => ({ ...value, items: value.items.map(item => item.id === single.id ? { ...item, name: title.trim() } : item) }));
    if (dialog === 'labels') setData(value => ({ ...value, items: value.items.map(item => selected.includes(item.id) ? { ...item, labels: chosenLabels } : item) }));
    if (dialog === 'delete') { setData(value => ({ ...value, items: value.items.filter(item => !excluded.has(item.id)) })); setSelected([]); }
    if (dialog === 'move') { setData(value => ({ ...value, items: value.items.map(item => selected.includes(item.id) ? { ...item, parent: destination || null } : item) })); setSelected([]); }
    setDialog(null);
  };
  const addLabel = () => {
    const name = labelName.trim();
    if (!name || Array.from(name).length > 8) { setError('Oznaka naj vsebuje od 1 do 8 znakov.'); return; }
    const existing = data.labels.find(label => label.name.toLocaleLowerCase('sl') === name.toLocaleLowerCase('sl'));
    const id = existing?.id || crypto.randomUUID();
    if (!existing) setData(value => ({ ...value, labels: [...value.labels, { id, name, color }] }));
    setChosenLabels(value => value.includes(id) ? value : [...value, id]); setLabelName(''); setError('');
  };
  return <main className="library library-manager">
    <h1>Moji učbeniki</h1>
    <div className="library-filters"><label className="library-search"><Search size={17}/><input aria-label="Išči po imenu" placeholder="Išči učbenike in mape…" value={query} onChange={event => { setQuery(event.target.value); setSelected([]); }}/></label><select aria-label="Filtriraj po oznaki" value={filter} onChange={event => { setFilter(event.target.value); setSelected([]); }}><option value="">Vse oznake</option>{data.labels.map(label => <option value={label.id} key={label.id}>{label.name}</option>)}</select></div>
    <div className="library-location"><button onClick={() => navigate(null)}>Vsi učbeniki</button>{current && <><span>/</span><button onClick={() => navigate(current.parent)}><ArrowLeft size={13}/> Nazaj</button><span>{current.name}</span></>}<small className={selected.length ? 'selection-count' : ''} role="status">{selected.length ? `${selected.length} izbranih` : `${visible.length} elementov`}</small></div>
    <div className="library-layout"><aside className="library-tools" aria-label="Upravljanje knjižnice">
      <button disabled={!visible.length} aria-pressed={allSelected} onClick={() => setSelected(allSelected ? [] : visible.map(item => item.id))}><CheckSquare size={19}/><span>{allSelected ? 'Deselect all' : 'Select all'}</span></button>
      <button onClick={() => open('create')}><FolderPlus size={19}/><span>Create</span></button>
      <button disabled={!selected.length} onClick={() => open('move')}><Folder size={19}/><span>Premakni</span></button>
      <button disabled={!selected.length} onClick={() => open('labels')}><Tag size={19}/><span>Oznake</span></button>
      <button disabled={!single} onClick={() => open('rename')}><Pencil size={19}/><span>Rename</span></button>
      <button disabled={!selected.length} onClick={() => open('delete')}><Trash2 size={19}/><span>Delete</span></button>
    </aside><div className="library-grid">{visible.map(item => <article className={'library-card ' + (selected.includes(item.id) ? 'is-selected' : '')} key={item.id}>
      <input className="card-checkbox" type="checkbox" aria-label={`Izberi ${item.name}`} checked={selected.includes(item.id)} onChange={() => toggle(item.id)}/>
      <button className="card-open" onClick={() => item.kind === 'folder' ? navigate(item.id) : onOpen(item.id)}><span className={'library-cover ' + item.kind}>{item.kind === 'folder' ? <Folder size={38}/> : <BookOpen size={35}/>}</span><h2>{item.name}</h2><p>{item.kind === 'folder' ? `${data.items.filter(child => child.parent === item.id).length} elementov` : item.id === 'worksheet' ? 'Il presente indicativo · 7 strani' : 'Italijanščina · A1'}</p></button>
      <div className="card-labels">{item.labels.map(id => { const label = data.labels.find(value => value.id === id); return label && <span key={id} className="color-label" style={{ color: label.color, borderColor: label.color + '66', background: label.color + '15' }}>{label.name}</span>; })}<button className="add-label" aria-label={`Uredi oznake za ${item.name}`} onClick={() => { setSelected([item.id]); setChosenLabels(item.labels); setLabelName(''); setError(''); setDialog('labels'); }}><Tag size={13}/> Oznaka</button></div>
    </article>)}{!visible.length && <p className="library-empty">{query || filter ? 'Ni zadetkov za izbrane filtre.' : 'Mapa je prazna.'}</p>}</div></div>
    <dialog ref={dialogRef} className="library-dialog" onCancel={() => setDialog(null)} onClick={event => { if (event.target === event.currentTarget) setDialog(null); }}><form onSubmit={save}><div className="dialog-heading"><h2>{dialog === 'create' ? 'Nova mapa' : dialog === 'rename' ? 'Preimenuj' : dialog === 'labels' ? 'Oznake' : dialog === 'move' ? 'Premakni v mapo' : 'Izbriši izbor'}</h2><button type="button" aria-label="Zapri" onClick={() => setDialog(null)}><X size={19}/></button></div>
      {(dialog === 'create' || dialog === 'rename') && <label>Ime<input autoFocus maxLength={120} value={title} onChange={event => setTitle(event.target.value)}/></label>}
      {dialog === 'move' && <label>Ciljna mapa<select value={destination} onChange={event => setDestination(event.target.value)}><option value="">Vsi učbeniki</option>{data.items.filter(item => item.kind === 'folder' && !excluded.has(item.id)).map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
      {(dialog === 'create' || dialog === 'labels') && <fieldset><legend>Oznake</legend><div className="label-options">{data.labels.map(label => <label key={label.id} className="color-label" style={{ color: label.color }}><input type="checkbox" checked={chosenLabels.includes(label.id)} onChange={() => setChosenLabels(value => value.includes(label.id) ? value.filter(id => id !== label.id) : [...value, label.id])}/>{label.name}</label>)}</div><label>Nova oznaka · največ 8 znakov<input value={labelName} maxLength={8} onChange={event => setLabelName(event.target.value)}/></label><div className="label-colors">{colors.map(value => <button type="button" key={value} aria-label={`Barva ${value}`} aria-pressed={color === value} style={{ background: value }} onClick={() => setColor(value)}/>)}<button className="label-create" type="button" onClick={addLabel}>Dodaj oznako</button></div>{dialog === 'labels' && selection.length > 1 && <p className="muted">Izbrane oznake bodo veljale za vse izbrane elemente.</p>}</fieldset>}
      {dialog === 'delete' && <p>Izbrišem {selected.length} izbranih elementov? Izbris mape odstrani tudi njeno vsebino iz knjižnice.</p>}
      {error && <p role="alert" className="incorrect">{error}</p>}<div className="dialog-actions"><button type="button" onClick={() => setDialog(null)}>Prekliči</button><button className="primary" type="submit">{dialog === 'delete' ? 'Izbriši' : 'Shrani'}</button></div>
    </form></dialog>
  </main>;
}
