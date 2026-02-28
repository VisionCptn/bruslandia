import type { Access } from 'payload'

const getRole = (user: any) => user?.role as string | undefined

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return getRole(user) === 'superAdmin'
}

export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  const role = getRole(user)
  return role === 'superAdmin' || role === 'orderManager'
}

export const publishedOrSuperAdmin: Access = ({ req: { user } }) => {
  if (getRole(user) === 'superAdmin') return true
  return { _status: { equals: 'published' } }
}
