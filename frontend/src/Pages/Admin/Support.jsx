import React, { useState } from 'react'
import { useGetAllSupportHook, useUpdateSupportHook } from '@/hooks/support.hook'
import { useNavigate } from 'react-router-dom'

const AdminSupport = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetAllSupportHook()
  const updateMut = useUpdateSupportHook()
  const [expanded, setExpanded] = useState(null)
  const [replies, setReplies] = useState({})

  if (isLoading) return <div className='p-6'>Loading...</div>

  if (isError) {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      navigate('/admin/login')
      return null
    }
    return <div className='p-6 text-red-600'>Failed to load tickets</div>
  }

  const tickets = data?.tickets || []

  const saveReply = (ticket) => {
    const payload = {
      adminReply: replies[ticket._id] || '',
      status: 'resolved'
    }
    updateMut.mutate({ id: ticket._id, payload })
  }

  return (
    <div className='page-surface p-6 min-h-screen bg-[var(--background)] '>
      <h1 data-animate='fade' className='text-2xl font-bold mb-4 text'>Support Requests</h1>

      <div data-animate='stagger' className='space-y-4'>
        {tickets.map((t) => (
          <div key={t._id} className='bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <div className='text-lg font-semibold'>{t.subject}</div>
                <div className='text-sm text-[var(--muted-foreground)]'>From: {t.name} — {t.email}</div>
                <div className='text-xs text-[var(--muted-foreground)] mt-1'>Status: <span className='font-medium'>{t.status}</span> • {new Date(t.createdAt).toLocaleString()}</div>
              </div>

              <div className='flex items-center gap-2'>
                <button onClick={() => setExpanded(expanded === t._id ? null : t._id)} className='px-3 py-2 rounded-lg border bg-white text-black'>View</button>
                <button onClick={() => saveReply(t)} className='px-3 py-2 rounded-lg bg-green-600 text-white'>Resolve</button>
              </div>
            </div>

            {expanded === t._id && (
              <div className='mt-4 border-t pt-4'>
                <div className='mb-3 text-sm text-[var(--muted-foreground)]'>Message:</div>
                <div className='mb-4 p-3 text-black bg-white rounded'>{t.message}</div>

                <div className='mb-2 text-sm text-[var(--muted-foreground)]'>Admin Reply</div>
                <textarea value={replies[t._id] || t.adminReply || ''} onChange={(e) => setReplies({ ...replies, [t._id]: e.target.value })} rows={4} className='w-full p-3 rounded-lg border' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSupport
