import { Navigate, Outlet, useLocation } from "react-router"
import { useIsAuthenticated } from "../model/auth.store"

export function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}