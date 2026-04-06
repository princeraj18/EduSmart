import React from 'react'
import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { usePageAnimations } from './hooks/usePageAnimations'

const App = () => {
  const location = useLocation()
  const authRoutes = ['/login', '/register', '/admin/login', '/admin/register', '/forgot-password', '/reset-password']
  const shouldHideNavbar = authRoutes.some((route) => location.pathname.startsWith(route))
  const shouldShowFooter = !location.pathname.startsWith('/admin') && !authRoutes.some((route) => location.pathname.startsWith(route))
  const enableSmoothScroll = !location.pathname.startsWith('/admin') && !authRoutes.some((route) => location.pathname.startsWith(route))
  const { containerRef, scroller } = useSmoothScroll({
    enabled: enableSmoothScroll,
    pathname: location.pathname,
  })

  usePageAnimations({
    scopeRef: containerRef,
    pathname: location.pathname,
    scroller,
    enabled: enableSmoothScroll,
  })

  return (
    <div className='min-h-screen bg-[var(--background)] text-[var(--foreground)]'>
      <ChatBot />
      <div
        ref={containerRef}
        data-scroll-container={enableSmoothScroll ? '' : undefined}
        className='app-shell min-h-screen'
      >
        {!shouldHideNavbar && <Navbar />}
        <main key={location.pathname} data-page className='app-main'>
          <MainRoutes />
        </main>
        {shouldShowFooter && <Footer />}
      </div>
    </div>
  )
}

export default App
