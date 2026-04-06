import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useSmoothScroll = ({ enabled, pathname }) => {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const [scroller, setScroller] = useState(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!enabled || prefersReducedMotion || !containerRef.current) {
      setScroller(null)
      if (!enabled) {
        document.documentElement.classList.remove('has-smooth-scroll')
      }
      return undefined
    }

    let isActive = true
    let cleanupRefresh = null

    const initSmoothScroll = async () => {
      const { default: LocomotiveScroll } = await import('locomotive-scroll')
      if (!isActive || !containerRef.current) return

      const scrollEl = containerRef.current
      const locomotive = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        multiplier: 0.85,
        lerp: 0.08,
        smartphone: { smooth: false },
        tablet: { smooth: false },
      })

      instanceRef.current = locomotive
      setScroller(scrollEl)
      document.documentElement.classList.add('has-smooth-scroll')

      locomotive.on('scroll', ScrollTrigger.update)

      ScrollTrigger.scrollerProxy(scrollEl, {
        scrollTop(value) {
          if (arguments.length) {
            locomotive.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            })
          }
          return locomotive.scroll?.instance?.scroll?.y || 0
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
        pinType: scrollEl.style.transform ? 'transform' : 'fixed',
      })

      const handleRefresh = () => locomotive.update()
      cleanupRefresh = handleRefresh
      ScrollTrigger.addEventListener('refresh', handleRefresh)
      ScrollTrigger.refresh()
    }

    initSmoothScroll()

    return () => {
      isActive = false
      setScroller(null)
      document.documentElement.classList.remove('has-smooth-scroll')

      if (cleanupRefresh) {
        ScrollTrigger.removeEventListener('refresh', cleanupRefresh)
      }

      if (instanceRef.current) {
        instanceRef.current.destroy()
        instanceRef.current = null
      }
    }
  }, [enabled])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (enabled && instanceRef.current) {
      const runRefresh = () => {
        if (!instanceRef.current) return

        instanceRef.current.scrollTo(0, {
          duration: 0,
          disableLerp: true,
        })
        instanceRef.current.update()
        ScrollTrigger.refresh()
      }

      const firstFrame = window.requestAnimationFrame(() => {
        const secondFrame = window.requestAnimationFrame(runRefresh)
        if (instanceRef.current) {
          instanceRef.current._routeRefreshFrame = secondFrame
        }
      })

      if (instanceRef.current) {
        instanceRef.current._routeRefreshFrame = firstFrame
      }

      return () => {
        if (instanceRef.current?._routeRefreshFrame) {
          window.cancelAnimationFrame(instanceRef.current._routeRefreshFrame)
        }
      }
    }

    if (!enabled) {
      ScrollTrigger.refresh()
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
  }, [enabled, pathname])

  return {
    containerRef,
    scroller,
  }
}
