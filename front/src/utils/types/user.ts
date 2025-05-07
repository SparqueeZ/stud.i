export type Role = 'administrator' | 'trainer' | 'user' | 'guest'

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  role: Role
}
