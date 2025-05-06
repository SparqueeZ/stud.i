type Product = {
  id: string
  name: string
  price: number
  author: string
  category: string
  visible: boolean
  authorId: string
}
type Role = 'admin' | 'trainer' | 'user' | 'guest'

type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  role: Role
}

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
}

const ROLES = {
  admin: {
    products: {
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
  },
  trainer: {
    products: {
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
  },
  user: {
    products: {
      view: true,
      update: (user, product) => user.id === product.authorId,
      delete: (user, product) => user.id === product.authorId,
      create: true,
    },
    users: {
      view: false,
      update: false,
      delete: false,
      create: false,
    },
  },
  guest: {
    products: {
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
  resouce: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType'],
) {
  if (!user.role) return false
  const permission = (ROLES as RolesWithPermissions)[user.role][resouce]?.[action]
  if (permission == null) return false

  if (typeof permission === 'boolean') return permission
  return data != null && permission(user, data)
}
