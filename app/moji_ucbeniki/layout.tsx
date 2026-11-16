import {AuthShell} from '../../components/auth-shell';
import {getCurrentAppUser} from '../../lib/current-user';
export default async function WorkspaceLayout({children}:{children:React.ReactNode}){
  const initialUser=await getCurrentAppUser();
  return <><AuthShell initialUser={initialUser}/>{children}</>;
}
