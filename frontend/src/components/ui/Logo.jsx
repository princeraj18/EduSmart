import React from 'react'

const Logo = ({ className = '' }) => (
  <div className={`${className} flex items-center`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="h-full w-auto">
      <defs>
        <linearGradient id="edupath-mark" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#133a5e" />
          <stop offset="55%" stopColor="#178582" />
          <stop offset="100%" stopColor="#f08a4b" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#edupath-mark)" />
      <path d="M13 26 L32 16 L51 26 L32 36 Z" fill="#fff8ef" />
      <path d="M18 34 L32 42 L46 34 L32 27 Z" fill="#f6d4ac" />
      <path d="M21 43 C29 39 35 39 43 43" stroke="#fff8ef" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
    <span className="ml-3 text-[var(--foreground)]">
      <span className="block text-xl font-black tracking-tight">EduPath</span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--muted-foreground)]">Learn with momentum</span>
    </span>
  </div>
)

export default Logo
