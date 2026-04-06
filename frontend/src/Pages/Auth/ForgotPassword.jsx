import axios from 'axios'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const submitHandler = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, {
      email,
    })
    alert('If email exists, reset link sent.')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-xl rounded-[30px] border border-[var(--border)] bg-[var(--card)]/90 p-8 text-center shadow-xl backdrop-blur-xl'>
        <h1 className='mb-4 text-2xl font-bold text-[var(--foreground)]'>
          Enter your email to receive a password reset link
        </h1>
        <input
          className='w-full rounded-2xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]'
          type='email'
          placeholder='Enter email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className='mt-4 w-full cursor-pointer rounded-2xl bg-[var(--primary)] px-3 py-3 font-semibold text-[var(--primary-foreground)]' onClick={submitHandler}>
          Send Reset Link
        </button>
      </div>
    </div>
  )
}
