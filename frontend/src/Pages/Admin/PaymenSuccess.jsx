import { useCheckoutSuccess } from '@/hooks/payment.hook'
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PaymenSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { mutate, isSuccess } = useCheckoutSuccess()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      mutate(sessionId)
    }
  }, [searchParams, mutate])

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  return (
    <div className='min-h-screen bg-[var(--background)] flex items-center justify-center px-6 py-12'>
      <div className='max-w-2xl w-full bg-[var(--card)] rounded-3xl shadow-2xl p-12 text-center border border-[var(--accent)]'>
        <div className='w-28 h-28 bg-[var(--accent)]/20 rounded-3xl flex items-center justify-center mx-auto mb-8 p-6'>
          <CheckCircle className='w-16 h-16 text-[var(--accent)]' />
        </div>
        
        <h1 className='text-4xl font-black text-[var(--foreground)] mb-4'>Payment Successful!</h1>
        <p className='text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed'>
          Thank you for your purchase. Your course access is now active.
        </p>
        
        <div className='space-y-4 mb-12'>
          <div className='bg-[var(--accent)]/10 border-2 border-[var(--accent)] rounded-2xl p-6'>
            <div className='flex items-center justify-center gap-3 text-[var(--accent)]'>
              <CheckCircle className='w-6 h-6' />
              <span className='font-semibold'>Course unlocked successfully</span>
            </div>
          </div>
          
          <div className='bg-[var(--popover)]/10 border-2 border-[var(--popover)] rounded-2xl p-6'>
            <div className='flex items-center justify-center gap-3 text-[var(--muted-foreground)]'>
              <ArrowRight className='w-6 h-6' />
              <span className='font-semibold'>Redirecting to dashboard in 5s...</span>
            </div>
          </div>
        </div>
        
        <div className='flex gap-4 justify-center'>
          <Link to='/'>
            <button className='flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:brightness-95 text-[var(--accent-foreground)] font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200'>
              Go to Dashboard
            </button>
          </Link>
          
          <Link to='/'>
            <button className='flex items-center gap-2 px-8 py-4 border-2 border-[var(--border)] hover:bg-[var(--popover)] text-[var(--muted-foreground)] font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200'>
              <Home className='w-5 h-5' />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymenSuccess
