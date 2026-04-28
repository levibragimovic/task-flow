import { useAuthStore } from "@/features/auth/model/auth.store"

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">
        Добро пожаловать, {user?.name}
      </p>
    </div>
  )
}