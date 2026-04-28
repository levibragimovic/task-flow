import { useNavigate } from "react-router"
import { logout } from "../api/auth.api"
import { useAuthStore } from "../model/auth.store"
import { Button } from "@/components/ui/button"

export function UserMenu() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)

  const handleLogout = async () => {
    await logout()
    clearSession()
    navigate("/auth/login", { replace: true })
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>

      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}