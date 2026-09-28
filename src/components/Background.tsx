import { useEffect, useRef } from 'react'

export function Background() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let frame = 0
    const handlePointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        element.style.setProperty('--mx', `${event.clientX}px`)
        element.style.setProperty('--my', `${event.clientY}px`)
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg__glow" />
      <i className="bg__orb bg__orb--1" />
      <i className="bg__orb bg__orb--2" />
      <div className="bg__dots" />
      <i className="bg__ring bg__ring--1" />
      <i className="bg__ring bg__ring--2" />
      <i className="bg__ring bg__ring--3" />
    </div>
  )
}
