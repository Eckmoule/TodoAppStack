'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  async function handleAuth() {
    setError('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); return }
      router.push('/')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); return }
      router.push('/')
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-24 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        {isSignUp ? 'Créer un compte' : 'Connexion'}
      </h1>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isSignUp ? 'Créer le compte' : 'Se connecter'}
        </button>
      </div>

      <p className="text-sm text-center mt-4">
        {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 ml-1 hover:underline"
        >
          {isSignUp ? 'Se connecter' : "S'inscrire"}
        </button>
      </p>
    </main>
  )
}