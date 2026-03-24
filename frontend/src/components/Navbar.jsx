import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLoggedOut } from '@/hooks/User.hook'
import { Spinner } from './ui/spinner'
import Logo from './ui/Logo'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/Store/user.store'
import { LogOut, User, LayoutDashboard, BookOpen, Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLoggedOut()
  const { user } = useUserStore()

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch (e) {
      return 'light'
    }
  })

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  const logoutHandler = () => {
    mutate()
  }

  const baseNav = [
    {
      label: 'Profile',
      icon: User,
      onClick: () => navigate('/profile')
    },
    {
      label: 'Your Courses',
      icon: BookOpen,
      onClick: () => navigate('/YourCourse')
    },
    {
      label: 'Logout',
      icon: LogOut,
      onClick: logoutHandler,
      loading: isPending
    }
  ]

  const isAdmin = user?.admin === true || user?.email === import.meta.env.VITE_ADMIN_EMAIL

  const navItems = isAdmin
    ? [
        {
          label: 'Dashboard',
          icon: LayoutDashboard,
          onClick: () => navigate('/dashboard')
        },
        ...baseNav
      ]
    : baseNav

  return (
    <div className='h-[12vh] w-full flex items-center justify-between px-6 lg:px-9 shadow-lg bg-[var(--card)]/80 backdrop-blur-sm border-b border-[var(--border)]'>
      {/* Logo - Professional Typography */}
      <div onClick={() => navigate('/')} className='flex items-center gap-3 cursor-pointer'>
        <Logo className='h-[50px] w-auto' />
      </div>

      {/* Right controls */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label='Toggle theme'
          className='p-2 rounded-xl hover:bg-[var(--popover)] transition-colors'
        >
          {theme === 'dark' ? (
            <Sun className='w-5 h-5 text-yellow-400' />
          ) : (
            <Moon className='w-5 h-5 text-[var(--muted-foreground)]' />
          )}
        </button>

        {/* User Menu */}
        <Popover>
        <PopoverTrigger className='flex items-center gap-3 p-2 hover:bg-[var(--popover)] rounded-xl transition-all duration-200 group cursor-pointer'>
          <Avatar className='w-10 h-10 ring-2 ring-[var(--border)] group-hover:ring-[var(--sidebar-ring)] transition-all'>
            <AvatarImage 
              src={user?.profilePhoto || "https://github.com/shadcn.png"} 
              className='object-cover'
            />
            <AvatarFallback className='bg-gradient-to-br from-[var(--popover)] to-[var(--card)] text-[var(--muted-foreground)] font-semibold text-sm'>
              {user?.fullName ? user.fullName.slice(0,2).toUpperCase() : 'CN'}
            </AvatarFallback>
          </Avatar>
          
          <div className='hidden md:block text-left'>
            <p className='font-semibold text-sm text-[var(--foreground)] leading-tight'>
              {user?.fullName || 'User'}
            </p>
            <p className='text-xs text-[var(--muted-foreground)] font-medium tracking-wide'>
              {user?.email?.split('@')[0] || 'Member'}
            </p>
          </div>

          {/* Chevron indicator */}
          <svg className='w-4 h-4 text-[var(--muted-foreground)] ml-1 group-hover:text-[var(--foreground)] transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </PopoverTrigger>

        <PopoverContent className='w-64 p-1 mt-2 border-[var(--border)] shadow-2xl rounded-2xl'>
          <div className='p-4 border-b border-[var(--border)]'>
            <p className='font-semibold text-[var(--foreground)] text-sm tracking-tight'>
              {user?.fullName || 'Welcome back'}
            </p>
            <p className='text-xs text-[var(--muted-foreground)] font-medium'>
              Manage your account
            </p>
          </div>

          <div className='py-2 space-y-1'>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                disabled={item.loading}
                className='group relative w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 hover:bg-[var(--popover)] hover:shadow-md text-sm font-medium text-[var(--muted-foreground)] disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <item.icon className='w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] flex-shrink-0' />
                <span className='truncate'>{item.label}</span>
                
                {item.loading && (
                  <div className='absolute right-4'>
                    <Spinner size='sm' />
                  </div>
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div></div>
  )
}


export default Navbar
