import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetMySupportById } from '@/hooks/support.hook'
import { Spinner } from '@/components/ui/spinner'

const SupportRequestDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetMySupportById(id)

  if (isLoading) return <div className='p-6'><Spinner /></div>
  if (isError) return <div className='p-6 text-red-600'>Failed to load ticket</div>

  const ticket = data?.ticket
  if (!ticket) return <div className='p-6'>Ticket not found</div>

  return (
    <div className='page-surface p-6 min-h-screen bg-[var(--background)]'>
      <button data-animate='fade' onClick={() => navigate(-1)} className='mb-4 px-3 py-2 bg-white border rounded'>Back</button>
      <div data-animate='zoom' className='bg-[var(--card)] text-black p-6 rounded-2xl'>
        <h2 className='text-xl font-semibold'>{ticket.subject}</h2>
        <div className='text-sm text-[var(--muted-foreground)] mt-1'>Status: <span className='font-medium'>{ticket.status}</span></div>
        <div className='mt-4'>
          <h3 className='font-medium mb-1'>Message</h3>
          <div className='p-3 bg-white rounded'>{ticket.message}</div>
        </div>

        <div className='mt-4'>
          <h3 className='font-medium mb-1'>Admin Reply</h3>
          <div className='p-3 bg-white rounded'>{ticket.adminReply || 'No reply yet'}</div>
        </div>

        <div className='mt-4 text-sm text-[var(--muted-foreground)]'>
          Submitted: {new Date(ticket.createdAt).toLocaleString()}
          {ticket.resolvedAt && (<span> • Resolved: {new Date(ticket.resolvedAt).toLocaleString()}</span>)}
        </div>
      </div>
    </div>
  )
}

export default SupportRequestDetail
