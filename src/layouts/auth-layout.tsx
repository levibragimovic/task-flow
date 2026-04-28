import { Outlet } from "react-router"

export function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Outlet />
    </main>
  )
}