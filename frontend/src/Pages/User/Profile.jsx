import React from 'react'
import { useUserStore } from '@/Store/user.store'

const Profile = () => {
  const user = useUserStore((s) => s.user)

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      <div className="max-w-3xl mx-auto bg-[var(--card)] rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">User Profile</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.fullName || user.name || 'N/A'}</p>
            <p><strong>Email:</strong> {user.email || 'N/A'}</p>
            <p><strong>Role:</strong> {user.admin ? 'admin' : (user.role || 'user')}</p>
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">No user data available.</p>
        )}
      </div>
    </div>
  )
}

export default Profile
