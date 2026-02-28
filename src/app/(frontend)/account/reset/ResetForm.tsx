'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const ResetForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!token) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-medium lowercase mb-6">скинути пароль</h1>
        <p className="text-sm text-red-600">Недійсне посилання для скидання пароля.</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Паролі не збігаються')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json() as any
      if (!res.ok) {
        throw new Error(data.errors?.[0]?.message || 'Помилка скидання пароля')
      }
      router.push('/account/login')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка скидання пароля')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-medium lowercase mb-6">скинути пароль</h1>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Новий пароль"
        required
        minLength={8}
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Підтвердити пароль"
        required
        minLength={8}
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase disabled:opacity-50"
      >
        {isLoading ? '...' : 'зберегти пароль'}
      </button>
    </form>
  )
}
