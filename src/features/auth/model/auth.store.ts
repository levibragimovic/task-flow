import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthSession, AuthUser } from './auth.types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setSession: (session) => {
        set({
          user: session.user,
          token: session.token,
        })
      },

      clearSession: () => {
        set({
          user: null,
          token: null,
        })
      },
    }),
    {
      name: 'task-flow-auth',
    },
  ),
)

export function useIsAuthenticated() {
  return useAuthStore((state) => Boolean(state.user && state.token))
}
