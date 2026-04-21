'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState([])
  const [titre, setTitre] = useState('')
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        fetchTodos()
      }
    })
  }, [])

  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { setError(error.message); return }
    setTodos(data || [])
  }

  async function ajouterTodo() {
    if (!titre.trim()) return
    setError('')
    const { error } = await supabase
      .from('todos')
      .insert({ titre, user_id: user.id })
    if (error) { setError(error.message); return }
    setTitre('')
    fetchTodos()
  }

  async function toggleTodo(id, termine) {
    const { error } = await supabase
      .from('todos')
      .update({ termine: !termine })
      .eq('id', id)
    if (error) { setError(error.message); return }
    fetchTodos()
  }

  async function supprimerTodo(id) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
    if (error) { setError(error.message); return }
    fetchTodos()
  }

  async function deconnexion() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="max-w-xl mx-auto mt-16 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ma liste de tâches</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <button
            onClick={deconnexion}
            className="text-sm text-red-400 hover:text-red-600"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      {/* Formulaire ajout */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ajouterTodo()}
          placeholder="Nouvelle tâche..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={ajouterTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des todos */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3 p-3 border rounded">
            <input
              type="checkbox"
              checked={todo.termine}
              onChange={() => toggleTodo(todo.id, todo.termine)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className={`flex-1 ${todo.termine ? 'line-through text-gray-400' : ''}`}>
              {todo.titre}
            </span>
            <button
              onClick={() => supprimerTodo(todo.id)}
              className="text-red-400 hover:text-red-600"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-400 mt-8">Aucune tâche pour le moment</p>
      )}
    </main>
  )
}