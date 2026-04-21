'use client'

import { Todo } from '@/types'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string, termine: boolean) => Promise<void>
  onSupprimer: (id: string) => Promise<void>
}

export default function TodoList({ todos, onToggle, onSupprimer }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-8">
        Aucune tâche pour le moment
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onSupprimer={onSupprimer}
        />
      ))}
    </ul>
  )
}