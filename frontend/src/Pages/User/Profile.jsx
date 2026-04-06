import React from 'react'
import { useUserStore } from '@/Store/user.store'
import { Mail, ShieldCheck, UserCircle2 } from 'lucide-react'

const Profile = () => {
  const user = useUserStore((s) => s.user)

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='zoom' className='feature-card-shell mx-auto max-w-4xl rounded-[38px] p-8 md:p-10'>
          <div className='editorial-label'>Profile</div>
          <div className='mt-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-5'>
              <div className='flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-[#133a5e] to-[#178582] text-white shadow-xl'>
                <UserCircle2 className='h-12 w-12' />
              </div>
              <div>
                <h2 className='text-4xl font-black'>{user?.fullName || user?.name || 'Learner'}</h2>
                <p className='mt-2 text-[var(--muted-foreground)]'>Your account hub for identity, course access, and support.</p>
              </div>
            </div>
            <div className='rounded-[28px] bg-[#133a5e] px-5 py-4 text-white'>
              <p className='text-xs uppercase tracking-[0.24em] text-white/65'>Role</p>
              <p className='mt-1 text-lg font-bold'>{user?.admin ? 'Admin' : user?.role || 'User'}</p>
            </div>
          </div>

          {user ? (
            <div data-animate='stagger' className='mt-8 grid gap-4 md:grid-cols-2'>
              <div className='rounded-[28px] border border-[var(--border)] bg-white/70 p-5'>
                <div className='mb-3 flex items-center gap-3'><UserCircle2 className='h-5 w-5 text-[#178582]' /><span className='font-semibold'>Name</span></div>
                <p className='text-lg'>{user.fullName || user.name || 'N/A'}</p>
              </div>
              <div className='rounded-[28px] border border-[var(--border)] bg-white/70 p-5'>
                <div className='mb-3 flex items-center gap-3'><Mail className='h-5 w-5 text-[#178582]' /><span className='font-semibold'>Email</span></div>
                <p className='text-lg'>{user.email || 'N/A'}</p>
              </div>
              <div className='rounded-[28px] border border-[var(--border)] bg-white/70 p-5 md:col-span-2'>
                <div className='mb-3 flex items-center gap-3'><ShieldCheck className='h-5 w-5 text-[#178582]' /><span className='font-semibold'>Account summary</span></div>
                <p className='leading-7 text-[var(--muted-foreground)]'>Your EduPath profile is now wrapped in the same visual system as your courses, resources, and support tools.</p>
              </div>
            </div>
          ) : (
            <p className='mt-8 text-sm text-[var(--muted-foreground)]'>No user data available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
