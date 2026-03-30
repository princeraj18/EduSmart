import React from 'react'
import { Button } from './components/ui/button'
import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

const App = () => {
  const location = useLocation()
  const hiddenRoute = ['/login', '/register', '/dashboard', '/admin/login', '/admin/register']
  const  shouldHideNavbar = hiddenRoute.some((route)=>location.pathname.startsWith(route))
  const shouldShowFooter = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/login') && !location.pathname.startsWith('/register')

  return (
    <div>
    {!shouldHideNavbar && <Navbar/>}
    <ChatBot />
     <MainRoutes/>
     {shouldShowFooter && <Footer />}
    </div>
  )
}

export default App