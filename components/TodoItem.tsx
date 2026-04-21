'use client'

import { Todo } from '@/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, termine: boolean) => Promise<void>
  onSupprimer: (id: string) => Promise<void>
}

export default function TodoItem({ todo, onToggle, onSupprimer }: TodoItemProps) {
  return (
    <li className="flex items-start gap-3 p-3 border rounded">
      <input
        type="checkbox"
        checked={todo.termine}
        onChange={() => onToggle(todo.id, todo.termine)}
        className="w-5 h-5 cursor-pointer mt-1"
      />
      <div className="flex-1">
        <span className={`block ${todo.termine ? 'line-through text-gray-400' : ''}`}>
          {todo.titre}
        </span>
        {todo.description && (
          <span className="block text-sm text-gray-400">{todo.description}</span>
        )}
      </div>
      <button
        onClick={() => onSupprimer(todo.id)}
        className="text-red-400 hover:text-red-600"
      >
        Supprimer
      </button>
    </li>
  )
}