import React from 'react'
import { useUserStore } from '@/Store/user.store'

const AdminProfile = () => {
  const user = useUserStore((s) => s.user)

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-3xl mx-auto bg-[var(--card)] rounded-lg shadow p-6 border-2 border-[var(--accent)]">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--accent)]">Admin Profile</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.name || 'Prince'}</p>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Role:</strong> { 'admin'}</p>
            <p className="text-sm text-[var(--muted-foreground)]">This view is only for administrators.</p>
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">No user data available.</p>
        )}
      </div>
    </div>
  )
}

export default AdminProfile
