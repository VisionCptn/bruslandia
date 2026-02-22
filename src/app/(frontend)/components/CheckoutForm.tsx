'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { getRandomRotationClass } from '../utils/randomPosition'
import type { UIStrings } from '../utils/getTranslations'

interface CheckoutFormProps {
  t: UIStrings
}

export const CheckoutForm = ({ t }: CheckoutFormProps) => {
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
      }

      console.log('Submitting order:', orderData)

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

          {/* Delivery */}
          {/* <div className="space-y-4">
            <h2 className="font-medium">Delivery</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border border-gray-300">
                <input
                  type="radio"
                  id="delivery"
                  name="deliveryMethod"
                  defaultChecked
                  className="w-4 h-4"
                />
                <label htmlFor="delivery" className="flex-1">Доставка</label>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 16V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1m8-1a1 1 0 0 0 1 1h5.5a.5.5 0 0 0 .5-.5v-8.5a.5.5 0 0 0-.5-.5H14a1 1 0 0 0-1 1v8z"/>
                  <circle cx="7.5" cy="19.5" r="2.5"/>
                  <circle cx="17.5" cy="19.5" r="2.5"/>
                </svg>
              </div>

              <div className="flex items-center gap-3 p-4 border border-gray-300">
                <input
                  type="radio"
                  id="pickup"
                  name="deliveryMethod"
                  className="w-4 h-4"
                />
                <label htmlFor="pickup" className="flex-1">Самовивіз</label>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              </div>
            </div>
          </div> */}

          {/* Shipping Address */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">{t.country}</label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
              />
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
                value={formData.middleName}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{t.address}</label>
              <input
                type="text"
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

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" name="saveAddress" className="w-4 h-4 mt-1" />
              <span className="text-sm">{t.saveAddress}</span>
            </label>
          </div>

          {/* Warning Message */}
          <div className="bg-gray-50 p-4 text-sm leading-relaxed">
            <p>{t.shippingWarning}</p>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="font-medium">{t.paymentMethod}</h2>
            <p className="text-sm text-gray-600">{t.paymentSecure}</p>
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
              <button className="text-sm underline">Застосувати</button>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? t.processing : t.checkout}
          </button>
        </div>
      </div>
      </div>
    </form>
  )
}
