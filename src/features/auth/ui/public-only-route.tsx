import { Navigate, Outlet } from "react-router"
import { useIsAuthenticated } from "../model/auth.store"

export function PublicOnlyRoute() {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}