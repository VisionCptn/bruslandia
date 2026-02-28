'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export const LoginForm = () => {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await login(email, password)
      router.push('/account')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка входу')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-medium lowercase mb-6">акаунт</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase disabled:opacity-50"
      >
        {isLoading ? '...' : 'увійти'}
      </button>

      <Link
        href="/account/register"
        className="block w-full border border-gray-300 py-4 px-6 text-center text-lg lowercase"
      >
        створити акаунт
      </Link>

      <Link
        href="/account/recover"
        className="block text-center text-sm text-gray-500 underline lowercase"
      >
        забули пароль?
      </Link>
    </form>
  )
}
