import React from 'react'
import { useNavigate } from 'react-router-dom'
import AdminAnalyticsGraph from '@/components/AdminAnalyticsGraph'

const AdminHome = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-8 bg-[var(--background)] space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--card)] rounded-2xl p-8 shadow">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Admin Home</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Quick links to admin actions</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/admin/dashboard')} className="px-6 py-3 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg font-semibold">Dashboard</button>
            <button onClick={() => navigate('/admin/dashboard/courses')} className="px-6 py-3 bg-[var(--accent)]/10 text-[var(--foreground)] rounded-lg font-semibold">Products</button>
            <button onClick={() => navigate('/admin/create-course')} className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold">Create Course</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <AdminAnalyticsGraph days={7} height={320} />
      </div>
    </div>
  )
}

export default AdminHome
