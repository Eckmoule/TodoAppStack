'use client'

interface HeaderProps {
  email: string
  onDeconnexion: () => void
}

export default function Header({ email, onDeconnexion }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Ma liste de tâches</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{email}</span>
        <button
          onClick={onDeconnexion}
          className="text-sm text-red-400 hover:text-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  )
}