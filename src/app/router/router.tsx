import { createBrowserRouter, Navigate } from "react-router"

import { ProtectedRoute } from "@/features/auth/ui/protected-route"
import { PublicOnlyRoute } from "@/features/auth/ui/public-only-route"
import { AuthLayout } from "@/layouts/auth-layout"
import { RootLayout } from "@/layouts/root-layout"
import { LoginPage } from "@/pages/auth/login-page"
import { RegisterPage } from "@/pages/auth/register-page"
import { DashboardPage } from "@/pages/dashboard/dashboard-page"

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" replace />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
])