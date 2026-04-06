import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from '@/hooks/User.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useLoginHook()
  const navigate = useNavigate()

  const loginFormHandler = (data) => {
    mutate(data)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,rgba(19,58,94,0.08),rgba(255,255,255,0.05),rgba(23,133,130,0.12))] px-4'>
      <div className='w-full max-w-md rounded-[30px] border border-[var(--border)] bg-[var(--card)]/90 p-8 shadow-xl backdrop-blur-xl'>
        <div className='mb-8 text-center'>
          <div className='mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--primary)] text-2xl font-bold text-[var(--primary-foreground)]'>
            E
          </div>
          <h1 className='text-2xl font-bold text-[var(--foreground)]'>Welcome Back</h1>
          <p className='mt-1 text-sm text-[var(--muted-foreground)]'>
            Login to continue to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(loginFormHandler)} className='space-y-5'>
          <div>
            <label className='mb-1 block text-sm font-medium text-[var(--muted-foreground)]'>
              Email address
            </label>
            <div className='relative'>
              <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]' />
              <input
                type='email'
                placeholder='you@example.com'
                {...register('email')}
                className='w-full rounded-xl border border-[var(--border)] bg-[var(--input)] py-3 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]'
              />
            </div>
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-[var(--muted-foreground)]'>
              Password
            </label>
            <div className='relative'>
              <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]' />
              <input
                type='password'
                placeholder='********'
                {...register('password')}
                className='w-full rounded-xl border border-[var(--border)] bg-[var(--input)] py-3 pl-10 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='flex w-full items-center justify-center rounded-xl bg-[var(--primary)] py-3 font-semibold text-[var(--primary-foreground)] transition-all hover:brightness-95 disabled:opacity-60'
          >
            {isPending ? <Spinner /> : 'Login'}
          </button>
        </form>

        <p onClick={() => navigate('/forgot-password')} className='mt-4 cursor-pointer text-sm font-medium text-[var(--accent)]'>
          Forgot Password?
        </p>

        <p className='mt-6 text-center text-sm text-[var(--muted-foreground)]'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='font-medium text-[var(--accent)] hover:underline'>
            Register
          </Link>
          <br />
          <button
            type='button'
            onClick={() => navigate('/admin/login')}
            className='mt-3 text-sm font-medium text-[var(--accent)] hover:underline'
          >
            Admin Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
