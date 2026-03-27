import { Spinner } from '@/components/ui/spinner'
import { useAdminRegister } from '@/hooks/admin.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { User, Mail, Lock } from 'lucide-react'

const AdminRegister = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isLoading } = useAdminRegister()

  const onSubmit = (data) => mutate(data)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="w-full max-w-md bg-[var(--card)] rounded-2xl shadow-xl border border-[var(--border)] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Register</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Create an admin account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input type="text" {...register('name')} className="w-full pl-10 pr-4 py-3 border border-[var(--border)] rounded-xl" />
            </div>
          </div>

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
            {isLoading ? <Spinner /> : 'Create Admin'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an admin account?{' '}
          <Link to="/admin/login" className="text-indigo-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminRegister
