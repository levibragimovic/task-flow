export type UserRole = 'owner' | 'admin' | 'member' | 'viewer'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
}

export interface AuthSession {
  user: AuthUser
  token: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
  confirmPassword: string
}
