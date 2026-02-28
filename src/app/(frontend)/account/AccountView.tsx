'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/formatPrice'

type Tab = 'orders' | 'addresses'

interface OrderItem {
  productTitle?: string
  quantity: number
  size?: string
  priceAtPurchase: number
}

interface Order {
  id: number
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

interface Address {
  id: string
  label?: string
  country?: string
  firstName: string
  lastName: string
  middleName?: string
  city: string
  postalCode?: string
  phone: string
  isDefault?: boolean
}

export const AccountView = () => {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [addressesLoading, setAddressesLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/account/login')
    }
  }, [user, isLoading, router])

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true)
    try {
      const res = await fetch('/api/orders?limit=50&sort=-createdAt', { credentials: 'include' })
      const data: any = await res.json()
      if (res.ok) {
        setOrders(data.docs ?? [])
      } else {
        console.error('Orders fetch error:', data)
      }
    } finally {
      setOrdersLoading(false)
    }
  }, [])

  const fetchAddresses = useCallback(async () => {
    if (!user) return
    setAddressesLoading(true)
    try {
      const res = await fetch(`/api/users/${user.id}`, { credentials: 'include' })
      if (res.ok) {
        const data: any = await res.json()
        setAddresses(data.addresses ?? [])
      }
    } finally {
      setAddressesLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user && activeTab === 'orders') fetchOrders()
    if (user && activeTab === 'addresses') fetchAddresses()
  }, [user, activeTab, fetchOrders, fetchAddresses])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const statusLabel: Record<string, string> = {
    pending: 'очікує',
    processing: 'обробляється',
    shipped: 'відправлено',
    delivered: 'доставлено',
    cancelled: 'скасовано',
  }

  if (isLoading) return null

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-medium lowercase">акаунт</h1>
          {user && (
            <p className="text-sm text-gray-500 mt-1">
              {user.firstName ? `${user.firstName} ${user.lastName ?? ''}`.trim() : user.email}
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm lowercase underline text-gray-500"
        >
          вийти
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 pr-6 text-sm lowercase ${
            activeTab === 'orders'
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-400'
          }`}
        >
          історія покупок
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 px-6 text-sm lowercase ${
            activeTab === 'addresses'
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-400'
          }`}
        >
          адреси
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          {ordersLoading ? (
            <p className="text-gray-400 text-sm">...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-400 text-sm lowercase">замовлень ще немає</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-sm">{order.orderNumber}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('uk-UA')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                      <p className="text-xs text-gray-400 lowercase mt-0.5">
                        {statusLabel[order.status] ?? order.status}
                      </p>
                    </div>
                  </div>
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-1">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-600">
                          {item.productTitle ?? 'Товар'}
                          {item.size ? ` / ${item.size.toUpperCase()}` : ''} × {item.quantity}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div>
          {addressesLoading ? (
            <p className="text-gray-400 text-sm">...</p>
          ) : addresses.length === 0 ? (
            <p className="text-gray-400 text-sm lowercase">збережених адрес немає</p>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="border border-gray-200 p-4">
                  {addr.label && (
                    <p className="font-medium text-sm mb-1">{addr.label}</p>
                  )}
                  <p className="text-sm text-gray-700">
                    {addr.firstName} {addr.lastName}
                    {addr.middleName ? ` ${addr.middleName}` : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    {addr.city}
                    {addr.postalCode ? `, ${addr.postalCode}` : ''}
                    {addr.country ? `, ${addr.country}` : ''}
                  </p>
                  <p className="text-sm text-gray-500">{addr.phone}</p>
                  {addr.isDefault && (
                    <p className="text-xs text-gray-400 lowercase mt-1">за замовчуванням</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
