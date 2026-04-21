import supabase from './supabase'
import { Todo } from '@/types'

export async function fetchTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function ajouterTodo(
  titre: string,
  description: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .insert({ titre, description, user_id: userId })
  if (error) throw error
}

export async function toggleTodo(
  id: string,
  termine: boolean
): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .update({ termine: !termine })
    .eq('id', id)
  if (error) throw error
}

export async function supprimerTodo(id: string): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
  if (error) throw error
}