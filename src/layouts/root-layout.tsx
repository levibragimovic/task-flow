import { Outlet } from "react-router"
import { UserMenu } from "@/features/auth/ui/user-menu"


export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="font-semibold">TaskFlow</div>
        <UserMenu />
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r p-4 md:block">
          <nav className="space-y-2 text-sm">
            <a href="/dashboard" className="block rounded-md px-3 py-2 hover:bg-muted">
              Dashboard
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}