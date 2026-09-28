import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { More } from './components/More'
import { MotionPolish } from './components/MotionPolish'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const clickedElement = event.target as Element
      const anchor = clickedElement.closest('a[href^="#"]') as HTMLAnchorElement | null
      const hash = anchor?.getAttribute('href')
      if (!hash || hash === '#') return

      const section = document.querySelector(hash)
      if (!section) return

      event.preventDefault()
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return <><Background /><MotionPolish /><Loader onComplete={handleReady} /><Navbar /><main><Hero ready={ready} /><About /><Projects /><Skills /><More /><Contact /></main><Footer /></>
}
