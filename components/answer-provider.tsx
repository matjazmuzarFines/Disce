'use client';

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { answerBackend, AnswerStore } from '../lib/answer-store';
import { getBrowserSupabase } from '../lib/supabase/browser';

const AnswerContext = createContext<AnswerStore | null>(null);
const emptyAnswers: Record<string, string> = {};

export function AnswerProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const [store] = useState(() => new AnswerStore(userId, answerBackend(getBrowserSupabase(), userId)));
  useEffect(() => {
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch {}
    void store.start(storage);
    const retry = () => { void store.retry(); };
    const flush = () => { if (document.visibilityState === 'hidden') void store.flush(); else void store.retry(); };
    window.addEventListener('online', retry);
    window.addEventListener('focus', retry);
    document.addEventListener('visibilitychange', flush);
    return () => {
      window.removeEventListener('online', retry);
      window.removeEventListener('focus', retry);
      document.removeEventListener('visibilitychange', flush);
      store.stop();
    };
  }, [store]);
  return <AnswerContext.Provider value={store}>{children}</AnswerContext.Provider>;
}

export function useAnswers(book: string) {
  const store = useAnswerStore();
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return { answers: snapshot.answers[book] || emptyAnswers, put: (field: string, value: string) => store.put(book, field, value) };
}

export function useAnswerStore() {
  const store = useContext(AnswerContext);
  if (!store) throw new Error('AnswerProvider is required');
  return store;
}

export function AnswerStatus() {
  const store = useAnswerStore();
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const [retrying, setRetrying] = useState(false);
  return <div className="answer-status" aria-live="polite">
    <div className={'sync-message ' + (snapshot.error ? 'sync-error' : '')}>
      <span>{snapshot.error || (snapshot.loading ? 'Nalagam podatke računa…' : snapshot.syncing ? 'Shranjujem spremembe…' : snapshot.pendingCount ? 'Spremembe čakajo na shranjevanje…' : 'Spremembe so shranjene v računu.')}</span>
      {snapshot.error && <button disabled={retrying} onClick={async () => { setRetrying(true); try { await store.retry(); } finally { setRetrying(false); } }}>{retrying ? 'Preverjam…' : 'Poskusi znova'}</button>}
    </div>
    {snapshot.legacyCount > 0 && <div className="legacy-import"><span>V tem brskalniku je {snapshot.legacyCount} odgovorov iz demo različice.</span><button disabled={snapshot.loading || snapshot.importing} onClick={() => { void store.importLegacy(); }}>{snapshot.importing ? 'Uvažam…' : 'Uvozi v moj račun'}</button></div>}
  </div>;
}
