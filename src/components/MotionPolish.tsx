import { useEffect, useRef } from 'react'

const revealSelector = [
  'section .eyebrow',
  'section h2',
  'section .lead',
  '.card',
  '.project',
  '.skill-group',
  '.skills span',
  '.more-card',
  '.contact-form',
].join(',')

const tiltSelector = '.project__preview, .card, .skill-group, .more-card'
const magneticSelector = '.button, .ask__send'

export function MotionPolish() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    let scrollFrame = 0

    const updateProgress = () => {
      const page = document.documentElement
      const maximum = page.scrollHeight - page.clientHeight
      const progress = maximum > 0 ? page.scrollTop / maximum : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
      scrollFrame = 0
    }

    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    updateProgress()

    if (reducedMotion) {
      return () => {
        window.cancelAnimationFrame(scrollFrame)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target as HTMLElement
        revealObserver.unobserve(element)
        element.classList.add('motion-reveal--visible')
      })
    }, {
      threshold: coarsePointer ? 0.01 : 0.12,
      rootMargin: coarsePointer ? '0px 0px 20% 0px' : '0px 0px -6% 0px',
    })

    revealElements.forEach((element) => {
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : []
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 8) * 60}ms`)
      element.classList.add('motion-reveal')
      revealObserver.observe(element)
    })

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const tiltCleanups: Array<() => void> = []
    let magneticFrame = 0
    let pointerX = 0
    let pointerY = 0
    let magneticElements: HTMLElement[] = []

    if (supportsHover) {
      const tiltElements = Array.from(document.querySelectorAll<HTMLElement>(tiltSelector))
      tiltElements.forEach((element) => {
        element.classList.add('motion-tilt')
        const strength = element.classList.contains('project__preview') ? 1 : 0.5

        const handleMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width
          const y = (event.clientY - bounds.top) / bounds.height
          element.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 9 * strength}deg) rotateY(${(x - 0.5) * 11 * strength}deg) scale(1.012)`
          element.style.setProperty('--glare-x', `${x * 100}%`)
          element.style.setProperty('--glare-y', `${y * 100}%`)
          element.classList.add('motion-tilt--active')
        }

        const handleLeave = () => {
          element.style.removeProperty('transform')
          element.classList.remove('motion-tilt--active')
        }

        element.addEventListener('pointermove', handleMove)
        element.addEventListener('pointerleave', handleLeave)
        tiltCleanups.push(() => {
          element.removeEventListener('pointermove', handleMove)
          element.removeEventListener('pointerleave', handleLeave)
          element.style.removeProperty('transform')
          element.classList.remove('motion-tilt', 'motion-tilt--active')
        })
      })

      magneticElements = Array.from(document.querySelectorAll<HTMLElement>(magneticSelector))
      magneticElements.forEach((element) => element.classList.add('motion-magnetic'))

      const updateMagneticButtons = () => {
        magneticFrame = 0
        magneticElements.forEach((element) => {
          const bounds = element.getBoundingClientRect()
          if (!bounds.width) return
          const deltaX = pointerX - (bounds.left + bounds.width / 2)
          const deltaY = pointerY - (bounds.top + bounds.height / 2)
          const distance = Math.hypot(deltaX, deltaY)
          if (distance < 80) {
            element.style.transform = `translate(${deltaX * 0.12}px, ${deltaY * 0.12}px)`
          } else {
            element.style.removeProperty('transform')
          }
        })
      }

      const handlePointerMove = (event: PointerEvent) => {
        pointerX = event.clientX
        pointerY = event.clientY
        if (!magneticFrame) magneticFrame = window.requestAnimationFrame(updateMagneticButtons)
      }

      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      tiltCleanups.push(() => window.removeEventListener('pointermove', handlePointerMove))
    }

    return () => {
      window.cancelAnimationFrame(scrollFrame)
      window.cancelAnimationFrame(magneticFrame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      revealObserver.disconnect()
      revealElements.forEach((element) => {
        element.classList.remove('motion-reveal', 'motion-reveal--visible')
        element.style.removeProperty('--reveal-delay')
      })
      tiltCleanups.forEach((cleanup) => cleanup())
      magneticElements.forEach((element) => {
        element.classList.remove('motion-magnetic')
        element.style.removeProperty('transform')
      })
    }
  }, [])

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
}
