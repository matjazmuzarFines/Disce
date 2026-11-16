import type { SupabaseClient } from '@supabase/supabase-js';

export type Answers = Record<string, string>;
export type BookAnswers = Record<string, Answers>;
export type AnswerRow = { book_id: string; field_id: string; answer: string };
export type AnswerBackend = {
  read: () => Promise<AnswerRow[]>;
  write: (rows: AnswerRow[], preserveExisting?: boolean) => Promise<void>;
};

export function answerBackend(client: SupabaseClient, userId: string): AnswerBackend {
  return {
    async read() {
      const rows: AnswerRow[] = [];
      let offset = 0;
      for (;;) {
        const { data, error } = await client.from('user_answers')
          .select('book_id,field_id,answer').eq('user_id', userId).neq('book_id','__library__')
          .order('book_id').order('field_id').range(offset, offset + 999);
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) return rows;
        offset += data.length;
      }
    },
    async write(rows, preserveExisting = false) {
      rows=rows.filter(row=>row.book_id!=='__library__');
      if (!rows.length) return;
      const { error } = await client.from('user_answers').upsert(
        rows.map(row => ({ ...row, user_id: userId })),
        { onConflict: 'user_id,book_id,field_id', ignoreDuplicates: preserveExisting },
      );
      if (error) throw error;
    },
  };
}

function stringAnswers(value: unknown): Answers {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
}

function bookAnswers(value: unknown): BookAnswers {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([book])=>book!=='__library__').map(([book, answers]) => [book, stringAnswers(answers)]));
}

function rowsOf(answers: BookAnswers): AnswerRow[] {
  return Object.entries(answers).flatMap(([book_id, values]) =>
    Object.entries(values).map(([field_id, answer]) => ({ book_id, field_id, answer })),
  );
}

export type AnswerSnapshot = {
  answers: BookAnswers;
  loading: boolean;
  syncing: boolean;
  importing: boolean;
  pendingCount: number;
  legacyCount: number;
  error: string;
};

export class AnswerStore {
  private snapshot: AnswerSnapshot = {
    answers: {}, loading: true, syncing: false, importing: false,
    pendingCount: 0, legacyCount: 0, error: '',
  };
  private pending: BookAnswers = {};
  private listeners = new Set<() => void>();
  private generation = 0;
  private active = false;
  private ready = false;
  private reading = false;
  private inFlight: Promise<boolean> | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private storage: Storage | undefined;
  private storageKey: string;

  constructor(private userId: string, private backend: AnswerBackend) {
    this.storageKey = `disce-answers-v1:${userId}`;
  }

  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };

  private update(patch: Partial<AnswerSnapshot>) {
    this.snapshot = { ...this.snapshot, ...patch, pendingCount: rowsOf(this.pending).length };
    this.listeners.forEach(listener => listener());
  }

  private persist() {
    try {
      this.storage?.setItem(this.storageKey, JSON.stringify({ answers: this.snapshot.answers, pending: this.pending }));
    } catch {
      this.update({ error: 'Lokalnega varnostnega zapisa ni mogoče shraniti. Pusti stran odprto do shranitve v Supabase.' });
    }
  }

  private legacyRows() {
    try {
      if (this.storage?.getItem('disce-legacy-answers-owner')) return [];
      return rowsOf({
        volentieri: stringAnswers(JSON.parse(this.storage?.getItem('parola-answers') || '{}')),
        worksheet: stringAnswers(JSON.parse(this.storage?.getItem('disce-worksheet-answers') || '{}')),
      }).filter(row => row.answer.trim() !== '');
    } catch {
      return [];
    }
  }

  async start(storage?: Storage) {
    this.storage = storage;
    this.active = true;
    this.ready = false;
    this.update({ loading: true, syncing: false, importing: false, error: '' });
    const generation = ++this.generation;
    try {
      const cache = JSON.parse(storage?.getItem(this.storageKey) || '{}');
      if(cache.answers?.__library__||cache.pending?.__library__){
        storage?.setItem('disce-library-legacy-v1:'+this.userId,JSON.stringify({answers:cache.answers?.__library__,pending:cache.pending?.__library__}));
      }
      this.pending = bookAnswers(cache.pending);
      this.update({ answers: bookAnswers(cache.answers), legacyCount: this.legacyRows().length });
    } catch {
      this.pending = {};
    }
    await this.load(generation);
  }

  stop() {
    this.active = false;
    this.generation++;
    this.ready = false;
    this.reading = false;
    this.inFlight = null;
    clearTimeout(this.timer);
  }

  private async load(generation = this.generation) {
    this.reading = true;
    try {
      const rows = await this.backend.read();
      if (!this.active || generation !== this.generation) return false;
      const answers: BookAnswers = {};
      for (const row of [...rows, ...rowsOf(this.pending)]) {
        answers[row.book_id] = { ...answers[row.book_id], [row.field_id]: row.answer };
      }
      this.ready = true;
      this.update({ answers, loading: false, error: '' });
      this.persist();
      return true;
    } catch {
      if (this.active && generation === this.generation) {
        this.update({ loading: false, error: 'Podatkov računa ni mogoče naložiti. Preveri povezavo in poskusi znova.' });
      }
      return false;
    } finally {
      if (this.active && generation === this.generation) {
        this.reading = false;
        if (this.ready && rowsOf(this.pending).length) this.schedule();
      }
    }
  }

  put = (book: string, field: string, answer: string) => {
    if (!this.active||book==='__library__') return;
    this.pending = { ...this.pending, [book]: { ...this.pending[book], [field]: answer } };
    this.update({ answers: { ...this.snapshot.answers, [book]: { ...this.snapshot.answers[book], [field]: answer } } });
    this.persist();
    this.schedule();
  };

  private schedule() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => { void this.flush(); }, 500);
  }

  flush = (): Promise<boolean> => {
    clearTimeout(this.timer);
    if (this.inFlight) return this.inFlight;
    if (!this.active || !this.ready || this.reading) return Promise.resolve(false);
    const generation = this.generation;
    const operation = this.savePending(generation).finally(() => {
      if (this.inFlight === operation) this.inFlight = null;
    });
    this.inFlight = operation;
    return this.inFlight;
  };

  private async savePending(generation: number) {
    this.update({ syncing: rowsOf(this.pending).length > 0 });
    try {
      while (this.active && generation === this.generation) {
        const rows = rowsOf(this.pending);
        if (!rows.length) break;
        await this.backend.write(rows);
        if (!this.active || generation !== this.generation) return false;
        const pending = bookAnswers(this.pending);
        for (const row of rows) {
          if (pending[row.book_id]?.[row.field_id] === row.answer) delete pending[row.book_id][row.field_id];
        }
        this.pending = pending;
        this.update({ error: '' });
        this.persist();
      }
      return true;
    } catch {
      if (this.active && generation === this.generation) this.update({ error: 'Spremembe še niso shranjene v računu. Preveri povezavo in poskusi znova.' });
      return false;
    } finally {
      if (this.active && generation === this.generation) this.update({ syncing: false });
    }
  }

  retry = async () => {
    if (this.reading) return false;
    if (this.inFlight) await this.inFlight;
    if (this.reading) return false;
    if (!await this.load()) return false;
    return this.flush();
  };

  importLegacy = async () => {
    if (this.snapshot.importing || !this.ready) return;
    const generation = this.generation;
    this.update({ importing: true });
    try {
      // ON CONFLICT DO NOTHING keeps every answer already stored in this account.
      await this.backend.write(this.legacyRows(), true);
      if (!this.active || generation !== this.generation) return;
      this.storage?.setItem('disce-legacy-answers-owner', this.userId);
      this.update({ legacyCount: 0 });
      await this.flush();
      await this.load(generation);
    } catch {
      if (this.active && generation === this.generation) this.update({ error: 'Uvoz odgovorov ni uspel. Lokalni odgovori so ohranjeni. Poskusi znova.' });
    } finally {
      if (this.active && generation === this.generation) this.update({ importing: false });
    }
  };
}
