import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { register } from "../api/auth.api"
import { registerSchema, type RegisterFormValues } from "../lib/auth.schemas"
import { useAuthStore } from "../model/auth.store"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (session) => {
      setSession(session)
      navigate("/dashboard", { replace: true })
    },
  })

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values)
  }

  const nameError = form.formState.errors.name?.message
  const emailError = form.formState.errors.email?.message
  const passwordError = form.formState.errors.password?.message

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Создай аккаунт, чтобы начать работу с TaskFlow
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" {...form.register("name")} />
            {nameError && <p className="text-sm text-destructive">{nameError}</p>}
          </div>

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

          {registerMutation.error && (
            <p className="text-sm text-destructive">
              {registerMutation.error.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Создаём аккаунт..." : "Зарегистрироваться"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?
            <Link to="/auth/login" className="font-medium text-foreground underline">
              Войти
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}