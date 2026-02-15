'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { getRandomRotationClass } from '../utils/randomPosition'

export const CheckoutForm = () => {
  const { items, total } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      alert('Кошик порожній')
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        customerEmail: formData.email,
        subscribeToNewsletter: formData.subscribeToNewsletter,
        items: items.map((item) => ({
          product: item.productId,
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
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        // Clear cart and redirect to success page
        localStorage.removeItem('brys-cart')
        router.push('/checkout/success')
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Помилка при оформленні замовлення. Спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Кошик порожній</p>
        <button
          onClick={() => router.push('/')}
          className="text-black underline lowercase"
        >
          повернутися до покупок
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Order Summary */}
      <div className="space-y-4 pb-6 border-b">
        <h2 className="font-medium lowercase">ваше замовлення</h2>
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 relative bg-gray-100 flex-shrink-0">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium lowercase">{item.title}</p>
              {item.size && <p className="text-sm text-gray-600">розмір: {item.size}</p>}
              <p className="text-sm text-gray-600">кількість: {item.quantity}</p>
              <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4 font-medium">
          <span className="lowercase">разом</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h2 className="font-medium lowercase">контактна інформація</h2>
        <div>
          <label className="block text-sm mb-1 lowercase">email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="subscribeToNewsletter"
            checked={formData.subscribeToNewsletter}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span className="text-sm lowercase">підписатись на розсилку</span>
        </label>
      </div>

      {/* Shipping */}
      <div className="space-y-4">
        <h2 className="font-medium lowercase">доставка</h2>

        <div>
          <label className="block text-sm mb-1 lowercase">країна *</label>
          <input
            type="text"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 lowercase">ім&apos;я *</label>
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
            <label className="block text-sm mb-1 lowercase">прізвище *</label>
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
          <label className="block text-sm mb-1 lowercase">по батькові (для доставки)</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 lowercase">місто *</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 lowercase">поштовий індекс</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 lowercase">телефон *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380"
            className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? 'обробка...' : 'підтвердити замовлення'}
      </button>
    </form>
  )
}
