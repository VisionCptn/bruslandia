'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export const RegisterForm = () => {
  const { login } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      })
      const data = await res.json() as any
      if (!res.ok) {
        throw new Error(data.errors?.[0]?.message || 'Помилка реєстрації')
      }
      await login(formData.email, formData.password)
      router.push('/account')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка реєстрації')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-medium lowercase mb-6">створити акаунт</h1>

      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Ім'я"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Прізвище"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Пароль"
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
        {isLoading ? '...' : 'створити акаунт'}
      </button>
    </form>
  )
}
