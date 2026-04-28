import type { AuthSession, AuthUser, LoginDto, RegisterDto } from '@/feautures/auth/model/auth.types'

interface MockUser extends AuthUser {
  password: string
}

class MockAuthStore {
  private users: MockUser[] = [
    {
      id: 'user_1',
      name: 'Alex Ivanov',
      email: 'alex@mail.com',
      password: '123456', // заглушка
      role: 'owner',
      avatarUrl: undefined,
    },
    {
      id: 'user_2',
      name: 'Maria Petrova',
      email: 'maria@mail.com',
      password: '123456', // заглушка
      role: 'admin',
      avatarUrl: undefined,
    },
  ]

  private activeSessions = new Set<string>()

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email)
  }

  add(user: MockUser) {
    this.users = [user, ...this.users]
  }

  addSession(token: string) {
    this.activeSessions.add(token)
  }

  removeSession(token: string) {
    this.activeSessions.delete(token)
  }

  hasSession(token: string) {
    return this.activeSessions.has(token)
  }
}

const store = new MockAuthStore()

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function createToken(userId: string) {
  return `mock-token-${userId}-${Date.now()}`
}

function toAuthUser(user: MockUser): AuthUser {
  const { password: _password, ...authUser } = user

  return authUser
}

export async function login(dto: LoginDto): Promise<AuthSession> {
  await delay(500)

  const user = store.findByEmail(dto.email)

  if (!user || user.password !== dto.password) {
    throw new Error('Неверный email или пароль')
  }

  const token = createToken(user.id)
  store.addSession(token)

  return {
    user: toAuthUser(user),
    token,
  }
}

export async function register(dto: RegisterDto): Promise<AuthSession> {
  await delay(500)

  const existingUser = store.findByEmail(dto.email)

  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует')
  }

  if (dto.password !== dto.confirmPassword) {
    throw new Error('Введённые пароли не совпадают')
  }

  const newUser: MockUser = {
    id: `user_${crypto.randomUUID()}`,
    name: dto.name,
    email: dto.email,
    password: dto.password,
    role: 'owner', // новый пользователь создаёт workspace и становится его владельцем
    avatarUrl: undefined,
  }

  store.add(newUser)

  const token = createToken(newUser.id)
  store.addSession(token)

  return {
    user: toAuthUser(newUser),
    token,
  }
}

export async function logout(token: string): Promise<void> {
  await delay(200)
  store.removeSession(token)
}
