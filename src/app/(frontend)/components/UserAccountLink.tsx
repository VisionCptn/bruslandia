'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { UserIcon } from './icons/UserIcon'

export const UserAccountLink = () => {
  const { user } = useAuth()
  const href = user ? '/account' : '/account/login'

  return (
    <Link href={href} className="bg-transparent border-none cursor-pointer p-0 flex items-center">
      <UserIcon width={48} height={44} className="text-black" />
    </Link>
  )
}
