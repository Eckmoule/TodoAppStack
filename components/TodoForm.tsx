'use client'

import { useState } from 'react'

interface TodoFormProps {
  onAjouter: (titre: string, description: string) => Promise<void>
}

export default function TodoForm({ onAjouter }: TodoFormProps) {
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit() {
    if (!titre.trim()) return
    await onAjouter(titre, description)
    setTitre('')
    setDescription('')
  }

  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Nouvelle tâche..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optionnelle)..."
        className="w-full border rounded px-3 py-2"
        rows={2}
      />
    </div>
  )
}
