import { Spinner } from '@/components/ui/spinner'
import { useAdminLogin } from '@/hooks/admin.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'

const AdminLogin = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isLoading } = useAdminLogin()

  const onSubmit = (data) => mutate(data)

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl shadow-xl border border-[var(--border)] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Login</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Sign in to access admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input type="email" {...register('email')} className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input type="password" {...register('password')} className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-xl" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold">
            {isLoading ? <Spinner /> : 'Login as Admin'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Need an admin account?{' '}
          <Link to="/admin/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
        </p>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            ← Back to User
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
