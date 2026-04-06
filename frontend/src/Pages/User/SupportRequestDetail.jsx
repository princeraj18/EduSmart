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
    <div className='page-surface min-h-screen py-10'>
      <div className='section-shell'>
        <button data-animate='fade' onClick={() => navigate(-1)} className='brand-button-secondary mb-4'>Back</button>
        <div data-animate='zoom' className='feature-card-shell rounded-[34px] p-6 text-[var(--foreground)] md:p-8'>
          <div className='editorial-label'>Request detail</div>
          <h2 className='mt-4 text-3xl font-semibold'>{ticket.subject}</h2>
          <div className='mt-2 text-sm text-[var(--muted-foreground)]'>Status: <span className='font-medium capitalize'>{ticket.status}</span></div>

          <div className='mt-6'>
            <h3 className='mb-2 font-medium'>Message</h3>
            <div className='rounded-[24px] bg-[var(--input)] p-4'>{ticket.message}</div>
          </div>

          <div className='mt-4'>
            <h3 className='mb-2 font-medium'>Admin Reply</h3>
            <div className='rounded-[24px] bg-[var(--input)] p-4'>{ticket.adminReply || 'No reply yet'}</div>
          </div>

          <div className='mt-4 text-sm text-[var(--muted-foreground)]'>
            Submitted: {new Date(ticket.createdAt).toLocaleString()}
            {ticket.resolvedAt && (<span> • Resolved: {new Date(ticket.resolvedAt).toLocaleString()}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportRequestDetail
