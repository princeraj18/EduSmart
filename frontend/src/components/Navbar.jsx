import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useLoggedOut } from '@/hooks/User.hook'
import { useAdminMe, useAdminLogout } from '@/hooks/admin.hook'
import { Spinner } from './ui/spinner'
import Logo from './ui/Logo'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/Store/user.store'
import { LogOut, User, LayoutDashboard, BookOpen, Sun, Moon, HandHelping } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mutate, isPending } = useLoggedOut()
  const { mutate: adminLogout, isPending: isAdminLoggingOut } = useAdminLogout()
  const { user } = useUserStore()
  const isAuthScreen = ['/login', '/register', '/admin/login', '/admin/register']
    .some((route) => location.pathname.startsWith(route))
  const { data: adminMe } = useAdminMe(!isAuthScreen)

  const isAdminLoggedIn = adminMe?.success === true
  const showUserNav = !isAdminLoggedIn
  const adminName = adminMe?.admin?.name
  const primaryName = isAdminLoggedIn ? adminName : user?.fullName
  const secondaryLabel = isAdminLoggedIn
    ? 'Admin'
    : (user?.email?.split('@')[0] || 'Member')

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

  const navItems = isAdminLoggedIn
    ? [
      {
        label: 'Admin Home',
        icon: LayoutDashboard,
        onClick: () => navigate('/admin/admin-home'),
      },
      {
        label: 'Courses',
        icon: ShoppingBag,
        onClick: () => navigate('/admin/dashboard/courses'),
      },
      {
        label: 'Support',
        icon: HandHelping,
        onClick: () => navigate('/admin/support'),
      },
      {
        label: 'Logout',
        icon: LogOut,
        onClick: () => adminLogout(),
        loading: isAdminLoggingOut,
      },
    ]
    : [
      {
        label: 'Profile',
        icon: User,
        onClick: () => navigate('/profile'),
      },
      {
        label: 'Your Courses',
        icon: BookOpen,
        onClick: () => navigate('/YourCourse'),
      },
       {
        label: 'Terms & Conditions',
        icon: HandHelping,
        onClick: () => navigate('/terms'),
      },
       {
        label: 'Track requests',
        icon: HandHelping,
          onClick: () => navigate('/support/my'),
      },
      {
        label: 'Logout',
        icon: LogOut,
        onClick: logoutHandler,
        loading: isPending,
      },
    ]

  return (
    <div
      data-animate='fade'
      className='z-40 mx-auto mt-4 flex min-h-[84px] w-[min(96%,84rem)] items-center justify-between rounded-[28px] border border-[var(--border)] bg-[var(--card)]/80 px-5 shadow-[0_18px_55px_rgba(21,33,51,0.12)] backdrop-blur-xl lg:px-8'
    >
      {/* Logo - Professional Typography */}
      <div
        onClick={() => navigate(isAdminLoggedIn ? '/admin/admin-home' : '/')}
        className='flex items-center gap-3 cursor-pointer'
      >
        <Logo className='h-[50px] w-auto' />
      </div>

      {/* Primary navigation links */}
    {showUserNav
    &&
     <nav className='hidden md:flex items-center gap-2 mx-6 rounded-full bg-white/40 p-2'>
        <button onClick={() => navigate('/')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname === '/' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          Home
        </button>

        <button onClick={() => navigate('/courses')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname.startsWith('/courses') || location.pathname === '/courses' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          Courses
        </button>

        <button onClick={() => navigate('/about')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname === '/about' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          About
        </button>

        <button onClick={() => navigate('/contact')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname === '/contact' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          Contact
        </button>
        
        <button onClick={() => navigate('/resources')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname === '/resources' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          Resources
        </button>
        <button onClick={() => navigate('/free-resources')} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-[var(--foreground)] ${location.pathname === '/free-resources' ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md' : 'text-[var(--muted-foreground)]'}`}>
          Free videos
        </button>
      </nav>
    }  
   

      {/* Right controls */}
      <div className='flex items-center gap-3'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label='Toggle theme'
          className='rounded-full border border-[var(--border)] bg-white/50 p-2.5 hover:bg-[var(--popover)] transition-colors'
        >
          {theme === 'dark' ? (
            <Sun className='w-5 h-5 text-yellow-400' />
          ) : (
            <Moon className='w-5 h-5 text-[var(--muted-foreground)]' />
          )}
        </button>

        {/* User Menu */}
        <Popover>
        <PopoverTrigger className='flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/45 p-2 pr-3 hover:bg-[var(--popover)] transition-all duration-200 group cursor-pointer'>
          <Avatar className='w-10 h-10 ring-2 ring-white/70 group-hover:ring-[var(--sidebar-ring)] transition-all'>
            <AvatarImage 
              src={user?.profilePhoto || "https://github.com/shadcn.png"} 
              className='object-cover'
            />
            <AvatarFallback className='bg-gradient-to-br from-[var(--popover)] to-[var(--card)] text-[var(--muted-foreground)] font-semibold text-sm'>
              {primaryName ? primaryName.slice(0,2).toUpperCase() : 'CN'}
            </AvatarFallback>
          </Avatar>
          
          <div className='hidden md:block text-left'>
            <p className='font-semibold text-sm text-[var(--foreground)] leading-tight'>
              {primaryName || 'User'}
            </p>
            <p className='text-xs text-[var(--muted-foreground)] font-medium tracking-wide'>
              {secondaryLabel}
            </p>
          </div>

          {/* Chevron indicator */}
          <svg className='w-4 h-4 text-[var(--muted-foreground)] ml-1 group-hover:text-[var(--foreground)] transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </PopoverTrigger>

        <PopoverContent className='mt-2 w-64 rounded-[24px] border-[var(--border)] bg-[var(--card)]/95 p-1 shadow-2xl backdrop-blur-xl'>
          <div className='p-4 border-b border-[var(--border)]'>
            <p className='font-semibold text-[var(--foreground)] text-sm tracking-tight'>
              {primaryName || 'Welcome back'}
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
