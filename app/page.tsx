'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, deconnexion } from '@/lib/auth'
import supabase from '@/lib/supabase'
import { fetchTodos, ajouterTodo, toggleTodo, supprimerTodo } from '@/lib/todos'
import { Todo } from '@/types'
import Header from '@/components/Header'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

export default function Home() {
  const router = useRouter()
  const [todos, setTodos] = useState<Todo[]>([])
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getUser().then((user) => {
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

  async function handleDeconnexion() {
    await deconnexion()
    router.push('/login')
  }

  return (
    <main className="max-w-xl mx-auto mt-16 p-4">
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <Header
        email={user?.email || ''}
        onDeconnexion={handleDeconnexion}
      />
      <TodoForm onAjouter={handleAjouter} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onSupprimer={handleSupprimer}
      />
    </main>
  )
}