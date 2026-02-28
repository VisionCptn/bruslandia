'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatPrice'
import { getRandomRotationClass } from '../utils/randomPosition'
import type { UIStrings } from '../utils/getTranslations'
import { countries } from '../utils/countries'

interface CheckoutFormProps {
  t: UIStrings
  paymentFailed?: boolean
}

export const CheckoutForm = ({ t, paymentFailed = false }: CheckoutFormProps) => {
  const { items, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(
    paymentFailed ? 'Оплату не завершено. Спробуйте ще раз.' : null,
  )
  const [saveAddress, setSaveAddress] = useState(false)
  const [emailExistsPrompt, setEmailExistsPrompt] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: '',
    subscribeToNewsletter: false,
    country: 'Україна',
    firstName: '',
    middleName: '',
    lastName: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  // When user is logged in, populate form with their saved address
  useEffect(() => {
    if (!user) return
    fetch(`/api/users/${user.id}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data: any) => {
        const addresses: any[] = data.addresses ?? []
        const addr = addresses.find((a) => a.isDefault) ?? addresses[0]
        if (addr) {
          setFormData((prev) => ({
            ...prev,
            country: addr.country || prev.country,
            firstName: addr.firstName || prev.firstName,
            lastName: addr.lastName || prev.lastName,
            middleName: addr.middleName || prev.middleName,
            city: addr.city || prev.city,
            postalCode: addr.postalCode || prev.postalCode,
            phone: addr.phone || prev.phone,
          }))
        }
      })
      .catch(() => {})
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const checked = (e.target as HTMLInputElement).checked
    const type = (e.target as HTMLInputElement).type
    setEmailExistsPrompt(false)
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Save address to an existing logged-in user
  const saveAddressToUser = async (userId: number) => {
    const userRes = await fetch(`/api/users/${userId}`, { credentials: 'include' })
    const userData: any = await userRes.json()
    const existing: any[] = userData.addresses ?? []
    const isDuplicate = existing.some(
      (a) =>
        a.firstName === formData.firstName &&
        a.lastName === formData.lastName &&
        a.city === formData.city &&
        a.phone === formData.phone &&
        (a.country || 'Україна') === (formData.country || 'Україна'),
    )
    if (isDuplicate) return
    const newAddr = {
      country: formData.country,
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      city: formData.city,
      postalCode: formData.postalCode,
      phone: formData.phone,
      isDefault: existing.length === 0,
    }
    await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ addresses: [...existing, newAddr] }),
    })
  }

  // Create a new user account and save address, returns userId or null if email exists
  const createUserAndSave = async (email: string, pwd: string): Promise<number | 'exists' | null> => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: pwd,
        firstName: formData.firstName,
        lastName: formData.lastName,
        addresses: [
          {
            country: formData.country,
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            city: formData.city,
            postalCode: formData.postalCode,
            phone: formData.phone,
            isDefault: true,
          },
        ],
      }),
    })
    const data: any = await res.json()
    if (!res.ok) {
      const msg: string = data.errors?.[0]?.message ?? ''
      if (msg.toLowerCase().includes('duplicate') || msg.toLowerCase().includes('already')) {
        return 'exists'
      }
      return null
    }
    return data.doc?.id ?? null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setEmailExistsPrompt(false)
    setPasswordError(null)

    if (items.length === 0) {
      setError('Кошик порожній')
      return
    }

    // Validate passwords when creating account
    if (saveAddress && !user) {
      if (password.length < 8) {
        setPasswordError('Пароль має бути не менше 8 символів')
        return
      }
      if (password !== confirmPassword) {
        setPasswordError('Паролі не збігаються')
        return
      }
    }

    setIsSubmitting(true)

    try {
      const email = user ? user.email : formData.email

      // Save address logic (before payment so user gets it even if they abandon)
      if (saveAddress) {
        if (user) {
          await saveAddressToUser(user.id)
        } else {
          const result = await createUserAndSave(email, password)
          if (result === 'exists') {
            setEmailExistsPrompt(true)
            setIsSubmitting(false)
            return
          }
        }
      }

      // Step 1: create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          customerEmail: email,
          subscribeToNewsletter: formData.subscribeToNewsletter,
          ...(user ? { user: user.id } : {}),
          items: items.map((item) => ({
            product: parseInt(item.productId, 10),
            productTitle: item.title,
            quantity: item.quantity,
            size: item.size,
            priceAtPurchase: item.price,
          })),
          shippingAddress: {
            country: formData.country,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            city: formData.city,
            postalCode: formData.postalCode,
            phone: formData.phone,
          },
          total,
          paymentStatus: 'pending',
        }),
      })

      if (!orderResponse.ok) throw new Error('Failed to create order')
      const orderData = (await orderResponse.json()) as { doc: { id: number; orderNumber: string } }
      const order = orderData.doc

      // Step 2: create Mono invoice
      const monoResponse = await fetch('/api/payments/mono', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: total,
          orderNumber: order.orderNumber,
          customerEmail: email,
        }),
      })

      if (!monoResponse.ok) throw new Error('Failed to create payment')
      const { pageUrl } = (await monoResponse.json()) as { pageUrl: string }

      window.location.href = pageUrl
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Помилка при оформленні замовлення. Спробуйте ще раз.')
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Кошик порожній</p>
        <button onClick={() => router.push('/')} className="text-black underline lowercase">
          повернутися до покупок
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Column - Form Fields */}
        <div className="space-y-8">
          {/* Contact */}
          <div className="space-y-4">
            <h2 className="font-medium lowercase">{t.contactInfo}</h2>

            {user ? (
              <p className="text-sm text-gray-600">{user.email}</p>
            ) : (
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
              </div>
            )}

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="subscribeToNewsletter"
                checked={formData.subscribeToNewsletter}
                onChange={handleChange}
                className="w-4 h-4 mt-1"
              />
              <span className="text-sm">{t.subscribeNewsletter}</span>
            </label>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">{t.country}</label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black bg-white appearance-none"
              >
                {countries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">{t.firstName}</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{t.lastName}</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">{t.middleName}</label>
              <input
                type="text"
                name="middleName"
                required
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t.address}</label>
              <input
                type="text"
                required
                name="address"
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">{t.postalCode}</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">{t.city}</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">{t.phone}</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            {/* Save address checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveAddress}
                onChange={(e) => {
                  setSaveAddress(e.target.checked)
                  setEmailExistsPrompt(false)
                  setPasswordError(null)
                  setPassword('')
                  setConfirmPassword('')
                }}
                className="w-4 h-4 mt-1"
              />
              <span className="text-sm">{t.saveAddress}</span>
            </label>

            {/* Password fields when creating account */}
            {saveAddress && !user && (
              <div className="space-y-3 pt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(null) }}
                  placeholder="Пароль"
                  required
                  minLength={8}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(null) }}
                  placeholder="Підтвердити пароль"
                  required
                  minLength={8}
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                />
                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
              </div>
            )}

            {/* Email already exists prompt */}
            {emailExistsPrompt && (
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 text-sm">
                <p>
                  Цей email вже зареєстровано.{' '}
                  <Link href="/account/login" className="underline">
                    Увійдіть
                  </Link>
                  {', '}щоб зберегти адресу.
                </p>
              </div>
            )}
          </div>

          {/* Warning Message */}
          <div className="bg-gray-50 p-4 text-sm leading-relaxed">
            <p>{t.shippingWarning}</p>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h2 className="font-medium lowercase">{t.paymentMethod}</h2>
            <div className="border border-black p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-black bg-black flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Картка / Apple Pay / Google Pay</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.paymentSecure}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-gray-400 lowercase leading-tight text-right select-none">
                plata
                <br />
                <span className="font-normal">by mono</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-28 relative bg-gray-100 flex-shrink-0 rounded">
                  <Image src={item.image} alt={item.title} fill className="object-cover rounded" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{item.title}</p>
                  {item.size && (
                    <p className="text-sm text-gray-600">{item.size.toUpperCase()} / Black</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Подарунковий сертифікат або код</span>
                <button type="button" className="text-sm underline">
                  Застосувати
                </button>
              </div>

              <div className="flex justify-between text-sm">
                <span>{t.subtotal}</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-1">
                  <span>{t.shipping}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-gray-400"
                  >
                    <circle cx="8" cy="8" r="7" stroke="currentColor" />
                    <text x="8" y="11" fontSize="10" textAnchor="middle" fill="currentColor">
                      ?
                    </text>
                  </svg>
                </div>
                <span className="text-gray-500">Enter shipping address</span>
              </div>

              <div className="flex justify-between text-lg font-medium pt-3 border-t">
                <span>{t.total}</span>
                <div className="text-right">
                  <div className="text-xs text-gray-500">UAH</div>
                  <div>{formatPrice(total)}</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? t.processing : 'оплатити'}
            </button>

            <p className="text-center text-xs text-gray-400 lowercase">захищено plata by mono</p>
          </div>
        </div>
      </div>
    </form>
  )
}
