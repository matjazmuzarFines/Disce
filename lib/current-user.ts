import {getServerSupabase} from './supabase/server';
import type {AppUser} from '../components/auth-shell';
export async function getCurrentAppUser():Promise<AppUser|null>{
  const supabase=await getServerSupabase();
  const {data:{user}}=await supabase.auth.getUser();
  return user?{id:user.id,email:user.email||'',name:typeof user.user_metadata?.name==='string'?user.user_metadata.name:user.email||'Učenec'}:null;
}
