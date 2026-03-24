import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

const Cancel = () => {
  return (
    <div className='min-h-screen bg-[var(--background)] flex items-center justify-center px-6'>
      <div className='max-w-md w-full bg-[var(--card)] rounded-3xl shadow-2xl p-12 text-center border border-[var(--border)]'>
        <div className='w-24 h-24 bg-[var(--destructive)]/10 rounded-2xl flex items-center justify-center mx-auto mb-8'>
          <ArrowLeft className='w-12 h-12 text-[var(--destructive)]' />
        </div>
        <h1 className='text-3xl font-black text-[var(--foreground)] mb-4'>Page Not Found</h1>
        <p className='text-[var(--muted-foreground)] text-lg mb-8 leading-relaxed'>
          The page you're looking for doesn't exist or requires special access.
        </p>
        
        <div className='space-y-3'>
          <Link to='/dashboard'>
            <button className='w-full bg-[var(--accent)] hover:brightness-95 text-[var(--accent-foreground)] font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5'>
              Go to Dashboard
            </button>
          </Link>
          
          <Link to='/'>
            <button className='w-full border-2 border-[var(--border)] hover:bg-[var(--popover)] text-[var(--muted-foreground)] font-semibold py-4 px-8 rounded-2xl transition-all duration-200 hover:shadow-md'>
              <Home className='w-5 h-5 inline mr-2' />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cancel
