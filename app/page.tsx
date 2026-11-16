import {AuthShell} from '../components/auth-shell';
import {getCurrentAppUser} from '../lib/current-user';
export default async function Home(){
  return <AuthShell initialUser={await getCurrentAppUser()}/>;
}
