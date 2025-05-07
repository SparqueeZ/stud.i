type Product = {
  id: string
  name: string
  price: number
  author: string
  category: string
  visible: boolean
  authorId: string
}

import type { Course } from '@/utils/types/course'
import type { User, Role } from '@/utils/types/user'

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

type Permissions = {
  products: {
    dataType: Product
    action: 'view' | 'update' | 'delete' | 'create'
  }
  users: {
    dataType: User
    action: 'view' | 'update' | 'delete' | 'create'
  }
  courses: {
    dataType: Course
    action: 'view' | 'update' | 'delete' | 'create'
  }
  administration: {
    dataType: null
    action: 'view'
  }
}

const ROLES = {
  administrator: {
    courses: {
      view: true,
      update: true,
      delete: true,
      create: true,
    },
    users: {
      view: true,
      update: true,
      delete: true,
      create: true,
    },
    administration: {
      view: true,
    },
  },
  trainer: {
    courses: {
      view: true,
      update: true,
      delete: true,
      create: false,
    },
    users: {
      view: true,
      update: true,
      delete: true,
      create: false,
    },
    administration: {
      view: false,
    },
  },
  user: {
    courses: {
      view: false,
      update: false,
      delete: false,
      create: false,
    },
    users: {
      view: false,
      update: false,
      delete: false,
      create: false,
    },
  },
  guest: {
    courses: {
      view: false,
      update: false,
      delete: false,
      create: false,
    },
    users: {
      view: false,
      update: false,
      delete: false,
      create: false,
    },
  },
} as const satisfies RolesWithPermissions

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType'],
) {
  if (!user.role) return false
  const permission = (ROLES as RolesWithPermissions)[user.role][resource]?.[action]
  if (permission == null) return false

  if (typeof permission === 'boolean') return permission
  return data != null && permission(user, data)
}
