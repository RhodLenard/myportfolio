import { useEffect, useState } from 'react'
import { navigation, site } from '../data/site'
import { ColorThemePicker } from './ColorThemePicker'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionIds = navigation.map(({ id }) => id)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="wrap navbar__inner">
        <a className="logo" href="#home" aria-label={`${site.name}, home`}>
          <span>{site.name}</span>
        </a>
        <div className={`navlinks${menuOpen ? ' navlinks--open' : ''}`} id="navigation-menu">
          {navigation.map((item) => (
            <a key={item.id} className={active === item.id ? 'is-active' : ''} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
        </div>
        <div className="navbar__actions">
          <a className="button navbar__book" href="#contact">Book a call</a>
          <ColorThemePicker />
          <button className="icon-button navbar__burger" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="navigation-menu" aria-label="Toggle navigation menu">
            <span aria-hidden="true">{menuOpen ? '×' : '≡'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
