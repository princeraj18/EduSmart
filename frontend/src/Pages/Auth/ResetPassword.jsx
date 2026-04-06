import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  const submitHandler = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/reset-password/${token}`, { password })
    alert('Password reset successful')
    navigate('/login')
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-xl rounded-[30px] border border-[var(--border)] bg-[var(--card)]/90 p-8 text-center shadow-xl backdrop-blur-xl'>
        <h1 className='mb-4 text-2xl font-bold text-[var(--foreground)]'>
          Enter your new password
        </h1>
        <input
          className='w-full rounded-2xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]'
          type='password'
          placeholder='New password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='mt-4 w-full cursor-pointer rounded-2xl bg-[var(--primary)] px-3 py-3 font-semibold text-[var(--primary-foreground)]' onClick={submitHandler}>
          Reset Password
        </button>
      </div>
    </div>
  )
}
