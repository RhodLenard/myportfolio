import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

type LoaderProps = { onComplete: () => void }

export function Loader({ onComplete }: LoaderProps) {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(reducedMotion ? 100 : 0)
  const [done, setDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }
    document.body.classList.add('scroll-locked')
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(100, current + Math.ceil(Math.random() * 8)))
    }, 80)
    return () => {
      window.clearInterval(timer)
      document.body.classList.remove('scroll-locked')
    }
  }, [onComplete, reducedMotion])

  useEffect(() => {
    if (progress < 100 || reducedMotion) return
    const finishTimer = window.setTimeout(() => {
      setDone(true)
      document.body.classList.remove('scroll-locked')
      onComplete()
    }, 300)
    return () => window.clearTimeout(finishTimer)
  }, [onComplete, progress, reducedMotion])

  if (reducedMotion) return null
  return (
    <div className={`loader${done ? ' loader--done' : ''}`} role="status" aria-live="polite">
      <span className="loader__star" aria-hidden="true">✺</span>
      <span className="loader__name">{site.name}</span>
      <div className="loader__bar" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <span className="loader__percent">Loading {progress}%</span>
    </div>
  )
}
