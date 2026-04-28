import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите email').email({ error: 'Введите корректный email' }),
  password: z.string().min(1, 'Введите пароль').min(6, 'Пароль должен быть минимум 6 символов'),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Имя должно быть минимум 2 символа'),
    email: z.string().min(1, 'Введите email').email({ error: 'Введите корректный email' }),
    password: z.string().min(1, 'Введите пароль').min(6, 'Пароль должен быть минимум 6 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
