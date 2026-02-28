'use client'

import { useState } from 'react'

export const RecoverForm = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json() as any
        throw new Error(data.errors?.[0]?.message || 'Помилка відправки')
      }
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка відправки')
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-medium lowercase mb-6">відновлення паролю</h1>
        <p className="text-gray-600">
          Якщо акаунт із цим email існує, ми надіслали листа з інструкціями.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-medium lowercase mb-6">відновлення паролю</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase disabled:opacity-50"
      >
        {isLoading ? '...' : 'надіслати'}
      </button>
    </form>
  )
}
