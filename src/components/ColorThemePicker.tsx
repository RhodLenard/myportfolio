import { useEffect, useRef, useState } from 'react'
import { colorThemes } from '../data/colorThemes'
import { useColorTheme } from '../hooks/useColorTheme'

export function ColorThemePicker() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { colorTheme, selectColorTheme } = useColorTheme()

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('pointerdown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div className="color-picker" ref={containerRef}>
      <button className="icon-button color-picker__trigger" type="button" onClick={() => setOpen((current) => !current)} aria-label="Choose accent color" aria-expanded={open} aria-controls="color-theme-menu">
        <span className="color-picker__current" aria-hidden="true" />
      </button>
      {open && (
        <div className="color-picker__menu" id="color-theme-menu" role="radiogroup" aria-label="Accent color">
          <span className="color-picker__title">Choose a color</span>
          {colorThemes.map((theme) => (
            <button key={theme.id} type="button" role="radio" aria-checked={colorTheme === theme.id} onClick={() => { selectColorTheme(theme.id); setOpen(false) }}>
              <span className="color-picker__swatch" style={{ background: theme.color }} aria-hidden="true" />
              <span>{theme.name}</span>
              <span className="color-picker__check" aria-hidden="true">{colorTheme === theme.id ? '✓' : ''}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
