import React from 'react'
import { useAdminMe } from '@/hooks/admin.hook'
import { Navigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

export const AdminProtectedRoutes = ({ children }) => {
  const { data, isLoading, isError } = useAdminMe()

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-12 h-12 text-emerald-600" />
          <h1 className="text-xl font-bold text-[var(--foreground)] tracking-tight">Loading admin...</h1>
        </div>
      </div>
    )
  }

  if (isError || !data?.success) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminProtectedRoutes
