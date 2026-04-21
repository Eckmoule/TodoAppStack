'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'
import { fetchTodos, ajouterTodo, toggleTodo, supprimerTodo } from '@/lib/todos'
import { Todo } from '@/types'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        chargerTodos()
      }
    })
  }, [])

  async function chargerTodos() {
    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function handleAjouter(titre: string, description: string) {
    try {
      await ajouterTodo(titre, description, user.id)
      await chargerTodos()
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function handleToggle(id: string, termine: boolean) {
    try {
      await toggleTodo(id, termine)
      await chargerTodos()
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function handleSupprimer(id: string) {
    try {
      await supprimerTodo(id)
      await chargerTodos()
    } catch (e: any) {
      setError(e.message)
    }
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

      <TodoForm onAjouter={handleAjouter} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onSupprimer={handleSupprimer}
      />
    </main>
  )
}