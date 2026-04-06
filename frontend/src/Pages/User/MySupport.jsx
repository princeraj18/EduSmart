import React from 'react'
import { useGetMySupportHook } from '@/hooks/support.hook'
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from 'react-router-dom'

const MySupport = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetMySupportHook()

  if (isLoading) return <div className='p-6'><Spinner /></div>
  if (isError) return <div className='p-6 text-red-600'>Failed to load your requests</div>

  const tickets = data?.tickets || []

  return (
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <div data-animate='fade' className='glass-panel rounded-[36px] p-8 md:p-10'>
          <div className='editorial-label'>Support</div>
          <h1 className='mt-4 text-4xl font-black'>My Support Requests</h1>
          <p className='mt-3 text-[var(--muted-foreground)]'>Track open conversations and revisit resolved support replies in one place.</p>
        </div>

        {tickets.length === 0 && <div className='mt-8 text-sm text-[var(--muted-foreground)]'>You have no support requests.</div>}

        <div data-animate='stagger' className='mt-8 space-y-4'>
          {tickets.map((t) => (
            <div key={t._id} className='feature-card-shell flex items-center justify-between rounded-[28px] p-5'>
              <div>
                <div className='text-xl font-semibold'>{t.subject}</div>
                <div className='mt-2 text-sm text-[var(--muted-foreground)]'>Status: <span className='font-medium capitalize'>{t.status}</span> • {new Date(t.createdAt).toLocaleString()}</div>
              </div>
              <button onClick={() => navigate(`/support/requests/${t._id}`)} className='brand-button'>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MySupport
