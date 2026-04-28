import type { AuthSession, AuthUser, LoginDto, RegisterDto } from '../model/auth.types'

interface MockUser extends AuthUser {
  password: string
}

let users: MockUser[] = [
  {
    id: 'user_1',
    name: 'Alex Ivanov',
    email: 'alex@mail.com',
    password: '123456',
    role: 'owner',
    avatarUrl: undefined,
  },
  {
    id: 'user_2',
    name: 'Maria Petrova',
    email: 'maria@mail.com',
    password: '123456',
    role: 'admin',
    avatarUrl: undefined,
  },
]

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

  const user = users.find((user) => user.email === dto.email)

  if (!user || user.password !== dto.password) {
    throw new Error('Неверный email или пароль')
  }

  return {
    user: toAuthUser(user),
    token: createToken(user.id),
  }
}

export async function register(dto: RegisterDto): Promise<AuthSession> {
  await delay(500)

  const existingUser = users.find((user) => user.email === dto.email)

  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует')
  }

  if (dto.password !== dto.confirmPassword) {
    throw new Error('Введенные пароли не совпадают')
  }

  const newUser: MockUser = {
    id: `user_${crypto.randomUUID()}`,
    name: dto.name,
    email: dto.email,
    password: dto.password,
    role: 'owner',
    avatarUrl: undefined,
  }

  users = [newUser, ...users]

  return {
    user: toAuthUser(newUser),
    token: createToken(newUser.id),
  }
}

export async function logout(): Promise<void> {
  await delay(200)
}
