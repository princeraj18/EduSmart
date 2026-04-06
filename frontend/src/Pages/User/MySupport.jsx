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
    <div className='p-6 min-h-screen bg-[var(--background)]'>
      <h1 className='text-2xl font-bold mb-4'>My Support Requests</h1>
      {tickets.length === 0 && <div className='text-sm text-[var(--muted-foreground)]'>You have no support requests.</div>}
      <div className='space-y-4 mt-4'>
        {tickets.map(t => (
          <div key={t._id} className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex items-center justify-between'>
            <div>
              <div className='font-semibold'>{t.subject}</div>
              <div className='text-sm text-[var(--muted-foreground)]'>Status: <span className='font-medium'>{t.status}</span> • {new Date(t.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <button onClick={() => navigate(`/support/requests/${t._id}`)} className='px-4 py-2 bg-indigo-600 text-white rounded-md'>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySupport
