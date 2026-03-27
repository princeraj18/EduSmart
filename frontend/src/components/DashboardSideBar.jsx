import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Home,
  BarChart3,
  PlusSquare
} from 'lucide-react'

const DashboardSideBar = () => {
  const navItems = [
    { to: '/admin/admin-home', label: 'Home', icon: Home },
    { to: '/admin/dashboard', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/dashboard/courses', label: 'Courses', icon: ShoppingBag },
    { to: '/admin/purchases', label: 'Purchases', icon: ShoppingBag },
    { to: '/admin/create-course', label: 'Create Course', icon: PlusSquare },
  ]


  return (
    <div className='w-64 bg-[var(--card)] shadow-xl border-r border-[var(--border)]'>
      <div className='p-6 border-b border-[var(--border)]'>
        <h1 className='text-2xl font-black text-[var(--foreground)] tracking-tight'>EduSmart</h1>
        <p className='text-xs text-[var(--muted-foreground)] font-medium mt-1'>Admin Dashboard</p>
      </div>

      <nav className='p-4 space-y-1'>
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => 
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
              ${isActive 
                ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-lg hover:brightness-95' 
                : 'text-[var(--muted-foreground)] hover:bg-[var(--popover)] hover:text-[var(--foreground)] hover:shadow-md'
              }`
            }
          >
            <item.icon className='w-5 h-5 flex-shrink-0' />
            <span className='truncate'>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default DashboardSideBar
