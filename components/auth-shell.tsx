'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getBrowserSupabase } from '../lib/supabase/browser';
import { AnswerProvider } from './answer-provider';
import {LibraryProvider} from './library-provider';
import TextbookApp from './textbook-app';

export type AppUser = { id: string; email: string; name: string };

export function AuthShell({ initialUser }: { initialUser: AppUser | null }) {
  const [user, setUser] = useState(initialUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const client = getBrowserSupabase();
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      const current = session?.user;
      setUser(current ? {
        id: current.id, email: current.email || '',
        name: typeof current.user_metadata?.name === 'string' ? current.user_metadata.name : current.email || 'Učenec',
      } : null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const { data, error: authError } = await getBrowserSupabase().auth.signInWithPassword({ email: email.trim(), password });
      if (authError) {
        setError(authError.code === 'email_not_confirmed' ? 'E-poštni naslov še ni potrjen. Preveri uporabnika v Supabase.' : 'Prijava ni uspela. Preveri e-pošto in geslo ter povezavo.');
        return;
      }
      setPassword('');
      setUser({
        id: data.user.id,
        email: data.user.email || '',
        name: typeof data.user.user_metadata?.name === 'string' ? data.user.user_metadata.name : data.user.email || 'Učenec',
      });
      router.refresh();
    } catch {
      setError('Povezava s Supabase ni uspela. Poskusi znova.');
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    const { error: authError } = await getBrowserSupabase().auth.signOut({ scope: 'local' });
    if (authError) throw new Error('Odjava ni uspela. Poskusi znova.');
    setUser(null);
    setPassword('');
    router.replace('/');
    router.refresh();
  }

  if (user) return <AnswerProvider key={user.id} userId={user.id}><LibraryProvider userId={user.id}><TextbookApp user={user} onSignOut={signOut}/></LibraryProvider></AnswerProvider>;
  return <main className="login"><section className="login-form">
    <span className="brand">disce<span className="brand-dot">.</span></span>
    <h1>Prijava</h1>
    <form onSubmit={signIn}>
      <label htmlFor="email">E-pošta</label>
      <input id="email" type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} disabled={busy}/>
      <label htmlFor="password">Geslo</label>
      <input id="password" type="password" autoComplete="current-password" required value={password} onChange={event => setPassword(event.target.value)} disabled={busy}/>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button type="submit" className="primary" disabled={busy}>{busy ? 'Prijavljam…' : 'Prijavi se'}<ArrowRight size={17}/></button>
    </form>
  </section></main>;
}
