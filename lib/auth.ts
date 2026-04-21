import supabase from './supabase'

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function deconnexion() {
  await supabase.auth.signOut()
}