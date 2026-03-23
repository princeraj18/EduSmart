import React from 'react'

const Logo = ({ className = '' }) => (
  <div className={`${className} flex items-center`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-full w-auto">
      <rect width="64" height="64" rx="10" fill="#2563eb" />
      <path d="M16 22 L32 30 L48 22 L32 14 Z" fill="#fff" />
      <path d="M18 34 L32 42 L46 34 L32 26 Z" fill="#bfdbfe" />
    </svg>
    <span className="ml-3 font-semibold text-slate-900 text-lg">EduPath</span>
  </div>
)

export default Logo
