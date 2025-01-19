'use client'

import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ContinueWithGoogle from '@/components/continue-with-google'
import { signUpWithCredentialsAction } from '@/lib/actions/sign-up'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
type AuthFormValues = z.infer<typeof formSchema>

export const AuthForm = () => {
  const [forSignUp, setForSignUp] = useState(true)

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: AuthFormValues) {
    if (forSignUp) {
      const promise = signUpWithCredentialsAction(data)

      toast.promise(promise, {
        loading: 'Registering account...',
        success: () => {
          form.reset({
            email: '',
            password: '',
          })
          return 'Account successfully registered!'
        },
        error: (error) => {
          console.error({ message: error.message })
          return `Error registering user!`
        },
      })
    } else {
      const promise = signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
      })

      toast.promise(promise, {
        loading: 'Authenticating user...',
        success: (res) => {
          if (res?.error) {
            return toast.error(`Error authenticating user!`)
          }
          form.reset({
            email: '',
            password: '',
          })
          return 'Authentication successfull!'
        },
        error: (error) => {
          console.error({ message: error.message })
          return `Error authenticating user!`
        },
      })
    }
  }

  return (
    <div className="grid gap-4 w-[360px]">
      <h1 className="text-3xl text-center font-extrabold">
        {getTitle(forSignUp)}
      </h1>
      <p className="text-sm text-center text-muted-foreground">
        {getDescription(forSignUp)}
      </p>
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-sm"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{forSignUp ? 'Sign Up' : 'Login'}</Button>

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground text-xs">
              OR
            </span>
          </div>
        </div>

        <ContinueWithGoogle /> */}

        <div className="text-muted-foreground text-sm text-center pt-4">
          <span>
            {forSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>

          <span
            onClick={() => setForSignUp((p) => !p)}
            className="ml-1 text-foreground/90 hover:text-foreground hover:underline cursor-pointer"
          >
            {forSignUp ? 'Login' : 'Sign Up'}
          </span>
        </div>
      </form>
    </Form>
    </div>
  )
}

function getTitle(forSignUp: boolean) {
  return forSignUp ? 'Welcome Dear!' : 'Login to your account'
}

function getDescription(forSignUp: boolean) {
  return forSignUp
    ? 'Welcome to our Expense Tracker app! Take control of your finances effortlessly with our intuitive and user-friendly platform.'
    : 'Hey there! Good to see you again. Login to your account to continue'
}
