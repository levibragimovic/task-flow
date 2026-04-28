import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"

import { login } from "../api/auth.api"
import { loginSchema, type LoginFormValues } from "../lib/auth.schemas"
import { useAuthStore } from "../model/auth.store"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "alex@mail.com",
      password: "123456",
    },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      setSession(session)

      const redirectTo = location.state?.from ?? "/dashboard"

      navigate(redirectTo, { replace: true })
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values)
  }

  const emailError = form.formState.errors.email?.message
  const passwordError = form.formState.errors.password?.message

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>
          Войди в TaskFlow, чтобы продолжить работу
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            {emailError && <p className="text-sm text-destructive">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
          </div>

          {loginMutation.error && (
            <p className="text-sm text-destructive">
              {loginMutation.error.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Входим..." : "Войти"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link to="/auth/register" className="font-medium text-foreground underline">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}