import { useEffect, useRef } from 'react'

type ConstellationNode = {
  x: number
  y: number
  velocityX: number
  velocityY: number
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const root = document.documentElement
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const pointer = { x: -999, y: -999 }
    const smoothPointer = { x: -999, y: -999 }
    const colors = { accent: '#d97757', muted: '#a3a29b' }
    let width = 0
    let height = 0
    let frame = 0
    let animationFrame = 0
    let resizeFrame = 0
    let touchReleaseTimer = 0
    let touchActive = false
    let nodes: ConstellationNode[] = []

    const createNodes = () => {
      const count = coarsePointer
        ? Math.min(54, Math.round((width * height) / 22000))
        : Math.min(110, Math.round((width * height) / 16000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
      }))
    }

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      createNodes()
    }

    const updatePointer = (clientX: number, clientY: number) => {
      pointer.x = clientX
      pointer.y = clientY
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return
      window.clearTimeout(touchReleaseTimer)
      touchActive = true
      updatePointer(event.clientX, event.clientY)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && !touchActive) return
      updatePointer(event.clientX, event.clientY)
    }

    const resetPointer = () => {
      pointer.x = -999
      pointer.y = -999
      smoothPointer.x = -999
      smoothPointer.y = -999
    }

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'touch') return
      touchActive = false
      window.clearTimeout(touchReleaseTimer)
      touchReleaseTimer = window.setTimeout(resetPointer, 450)
    }

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      window.clearTimeout(touchReleaseTimer)
      touchActive = true
      updatePointer(touch.clientX, touch.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      window.clearTimeout(touchReleaseTimer)
      touchActive = true
      updatePointer(touch.clientX, touch.clientY)
    }

    const handleTouchEnd = (event: TouchEvent) => {
      const remainingTouch = event.touches[0]
      if (remainingTouch) {
        updatePointer(remainingTouch.clientX, remainingTouch.clientY)
        return
      }

      touchActive = false
      window.clearTimeout(touchReleaseTimer)
      touchReleaseTimer = window.setTimeout(resetPointer, 450)
    }

    const handlePointerLeave = () => {
      touchActive = false
      window.clearTimeout(touchReleaseTimer)
      resetPointer()
    }

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame)
      resizeFrame = window.requestAnimationFrame(() => {
        const nextWidth = window.innerWidth
        const nextHeight = window.innerHeight
        const browserChromeOnly = coarsePointer
          && nextWidth === width
          && Math.abs(nextHeight - height) < 180

        if (!browserChromeOnly) resize()
      })
    }

    const draw = () => {
      if (frame++ % 40 === 0) {
        const styles = getComputedStyle(root)
        colors.accent = styles.getPropertyValue('--accent').trim() || colors.accent
        colors.muted = styles.getPropertyValue('--muted').trim() || colors.muted
      }

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.18
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.18
      context.clearRect(0, 0, width, height)
      context.lineWidth = 1

      nodes.forEach((node, index) => {
        node.x += node.velocityX
        node.y += node.velocityY

        if (node.x < 0 || node.x > width) node.velocityX *= -1
        if (node.y < 0 || node.y > height) node.velocityY *= -1

        const pointerX = smoothPointer.x - node.x
        const pointerY = smoothPointer.y - node.y
        const pointerDistance = Math.hypot(pointerX, pointerY)
        if (pointerDistance < 200 && pointerDistance > 1) {
          node.x += (pointerX / pointerDistance) * 0.35
          node.y += (pointerY / pointerDistance) * 0.35
        }

        for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
          const nextNode = nodes[nextIndex]
          const distance = Math.hypot(node.x - nextNode.x, node.y - nextNode.y)
          if (distance < 130) {
            context.globalAlpha = (1 - distance / 130) * 0.35
            context.strokeStyle = colors.muted
            context.beginPath()
            context.moveTo(node.x, node.y)
            context.lineTo(nextNode.x, nextNode.y)
            context.stroke()
          }
        }

        if (pointerDistance < 190) {
          context.globalAlpha = (1 - pointerDistance / 190) * 0.85
          context.strokeStyle = colors.accent
          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(smoothPointer.x, smoothPointer.y)
          context.stroke()
        }

        context.globalAlpha = 0.55
        context.fillStyle = pointerDistance < 190 ? colors.accent : colors.muted
        context.beginPath()
        context.arc(node.x, node.y, 2, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerEnd, { passive: true })
    window.addEventListener('pointercancel', handlePointerEnd, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)
    draw()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.cancelAnimationFrame(resizeFrame)
      window.clearTimeout(touchReleaseTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerEnd)
      window.removeEventListener('pointercancel', handlePointerEnd)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
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
