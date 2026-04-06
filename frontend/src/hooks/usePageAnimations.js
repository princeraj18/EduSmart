import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const getAnimationConfig = (type) => {
  switch (type) {
    case 'fade':
      return {
        from: { autoAlpha: 0 },
        to: { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      }
    case 'zoom':
      return {
        from: { autoAlpha: 0, scale: 0.92, y: 36 },
        to: { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      }
    case 'left':
      return {
        from: { autoAlpha: 0, x: -60, y: 16 },
        to: { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
      }
    case 'right':
      return {
        from: { autoAlpha: 0, x: 60, y: 16 },
        to: { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
      }
    default:
      return {
        from: { autoAlpha: 0, y: 54 },
        to: { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      }
  }
}

export const usePageAnimations = ({ scopeRef, pathname, scroller, enabled }) => {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const heroSections = gsap.utils.toArray('[data-animate="hero"]')
      heroSections.forEach((hero) => {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
        const heroLines = hero.querySelectorAll('[data-hero-line]')
        const heroArtwork = hero.querySelectorAll('[data-hero-art]')

        if (heroLines.length) {
          heroTimeline.fromTo(
            heroLines,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              clearProps: 'opacity,visibility,transform',
            },
          )
        }

        if (heroArtwork.length) {
          heroTimeline.fromTo(
            heroArtwork,
            { autoAlpha: 0, scale: 0.9, y: 24 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              clearProps: 'opacity,visibility,transform',
            },
            heroLines.length ? '-=0.6' : 0,
          )
        }
      })

      const animatedElements = gsap.utils.toArray('[data-animate]')
      animatedElements.forEach((element, index) => {
        const type = element.dataset.animate
        if (type === 'hero') return

        if (type === 'stagger') {
          const items = Array.from(element.children)
          if (!items.length) return

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,transform',
              scrollTrigger: {
                trigger: element,
                start: 'top 82%',
                once: true,
                scroller: enabled ? scroller || undefined : undefined,
              },
            },
          )
          return
        }

        const config = getAnimationConfig(type)
        gsap.fromTo(element, config.from, {
          ...config.to,
          delay: index * 0.02,
          clearProps: 'opacity,visibility,transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
            scroller: enabled ? scroller || undefined : undefined,
          },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [enabled, pathname, scroller, scopeRef])
}
