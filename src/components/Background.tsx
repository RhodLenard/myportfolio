import { useEffect, useRef } from 'react'

export type BackgroundEffect = 'glow' | 'dots' | 'spotlight' | 'parallax' | 'trail' | 'ripple'

type Particle = { x: number; y: number; life: number }
type Ripple = { x: number; y: number; radius: number; opacity: number }

export function Background({ effect = 'dots' }: { effect?: BackgroundEffect }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    document.body.classList.add(`fx-${effect}`)
    return () => document.body.classList.remove(`fx-${effect}`)
  }, [effect])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const pointer = { x: -999, y: -999 }
    const smoothPointer = { x: -999, y: -999 }
    const colors = { accent: '#d97757', muted: '#a3a29b' }
    let width = 0
    let height = 0
    let frame = 0
    let animationFrame = 0
    let particles: Particle[] = []
    let ripples: Ripple[] = []

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      root.style.setProperty('--mx', `${event.clientX}px`)
      root.style.setProperty('--my', `${event.clientY}px`)
      root.style.setProperty('--px', String((event.clientX / width - 0.5) * 2))
      root.style.setProperty('--py', String((event.clientY / height - 0.5) * 2))

      if (effect === 'trail' && !reducedMotion) {
        particles.push({ x: event.clientX, y: event.clientY, life: 1 })
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (effect === 'ripple' && !reducedMotion) {
        ripples.push({ x: event.clientX, y: event.clientY, radius: 4, opacity: 1 })
      }
    }

    const circle = (x: number, y: number, radius: number) => {
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
    }

    const draw = () => {
      if (frame++ % 40 === 0) {
        const styles = getComputedStyle(root)
        colors.accent = styles.getPropertyValue('--accent').trim() || colors.accent
        colors.muted = styles.getPropertyValue('--muted').trim() || colors.muted
      }

      context.clearRect(0, 0, width, height)

      if (!reducedMotion) {
        smoothPointer.x += (pointer.x - smoothPointer.x) * 0.18
        smoothPointer.y += (pointer.y - smoothPointer.y) * 0.18

        if (effect === 'dots' || effect === 'spotlight') {
          const gap = 28
          const influenceRadius = effect === 'dots' ? 150 : 220

          for (let y = gap / 2; y < height; y += gap) {
            for (let x = gap / 2; x < width; x += gap) {
              const deltaX = x - smoothPointer.x
              const deltaY = y - smoothPointer.y
              const distance = Math.hypot(deltaX, deltaY)
              const influence = Math.max(0, 1 - distance / influenceRadius)

              if (effect === 'dots') {
                const push = influence * influence * 16
                const dotX = distance ? x + (deltaX / distance) * push : x
                const dotY = distance ? y + (deltaY / distance) * push : y
                context.globalAlpha = 0.28 + influence * 0.7
                context.fillStyle = influence > 0.05 ? colors.accent : colors.muted
                circle(dotX, dotY, 1.1 + influence * 3)
                context.fill()
              } else if (influence > 0) {
                context.globalAlpha = influence * 0.9
                context.fillStyle = colors.accent
                circle(x, y, 1.3 + influence * 1.2)
                context.fill()
              }
            }
          }
        }

        if (effect === 'trail') {
          particles = particles.filter((particle) => particle.life > 0)
          for (const particle of particles) {
            particle.life -= 0.025
            context.globalAlpha = Math.max(0, particle.life) * 0.6
            context.fillStyle = colors.accent
            circle(particle.x, particle.y, 2 + particle.life * 7)
            context.fill()
          }
        }

        if (effect === 'ripple') {
          ripples = ripples.filter((ripple) => ripple.opacity > 0)
          for (const ripple of ripples) {
            ripple.radius += 3.2
            ripple.opacity -= 0.016
            context.globalAlpha = Math.max(0, ripple.opacity)
            context.strokeStyle = colors.accent
            context.lineWidth = 2
            circle(ripple.x, ripple.y, ripple.radius)
            context.stroke()
          }
        }
      }

      context.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    draw()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      root.style.removeProperty('--mx')
      root.style.removeProperty('--my')
      root.style.removeProperty('--px')
      root.style.removeProperty('--py')
    }
  }, [effect])

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__glow" />
      <i className="bg__orb bg__orb--1" />
      <i className="bg__orb bg__orb--2" />
      <div className="bg__dots" />
      <i className="bg__ring bg__ring--1" />
      <i className="bg__ring bg__ring--2" />
      <i className="bg__ring bg__ring--3" />
      <canvas ref={canvasRef} className="bg__canvas" />
    </div>
  )
}
