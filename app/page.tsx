import { AuthShell, type AppUser } from '../components/auth-shell';
import { getServerSupabase } from '../lib/supabase/server';

export default async function Home() {
  const supabase = await getServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  const initialUser: AppUser | null = user ? {
    id: user.id,
    email: user.email || '',
    name: typeof user.user_metadata?.name === 'string' ? user.user_metadata.name : user.email || 'Učenec',
  } : null;
  return <AuthShell initialUser={initialUser}/>;
}
