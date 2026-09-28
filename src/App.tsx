import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { More } from './components/More'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])
  return <><Background /><Loader onComplete={handleReady} /><Navbar /><main><Hero ready={ready} /><About /><Projects /><Skills /><More /><Contact /></main><Footer /></>
}
