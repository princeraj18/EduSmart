import { Spinner } from '@/components/ui/spinner'
import { useLoginHook } from '@/hooks/User.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useLoginHook()

  const loginFormHandler = (data) => {
    mutate(data)
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl shadow-xl border border-[var(--border)] p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            ⚡
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome Back</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(loginFormHandler)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              />
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              />
              <input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl bg-green-600 text-[var(--primary-foreground)] font-semibold hover:brightness-95 transition-all disabled:opacity-60 flex items-center justify-center"
          >
            {isPending ? <Spinner /> : 'Login'}
          </button>
         
        </form>
        <p
  onClick={() => navigate("/forgot-password")}
  className="text-blue-500 cursor-pointer"
>
  Forgot Password?
</p>
        

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
          <br />
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="mt-3 text-sm text-indigo-600 font-medium hover:underline"
          >
            Admin Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
