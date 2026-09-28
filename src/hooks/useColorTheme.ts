import { useCallback, useEffect, useState } from 'react'
import { colorThemes, type ColorThemeId } from '../data/colorThemes'

const defaultTheme: ColorThemeId = 'terracotta'

function isColorTheme(value: string | null): value is ColorThemeId {
  return colorThemes.some((theme) => theme.id === value)
}

function getInitialColorTheme(): ColorThemeId {
  try {
    const saved = localStorage.getItem('color-theme')
    if (isColorTheme(saved)) return saved
  } catch { /* storage may be disabled */ }
  return defaultTheme
}

export function useColorTheme() {
  const [colorTheme, setColorTheme] = useState<ColorThemeId>(getInitialColorTheme)

  useEffect(() => {
    document.documentElement.dataset.colorTheme = colorTheme
  }, [colorTheme])

  const selectColorTheme = useCallback((next: ColorThemeId) => {
    setColorTheme(next)
    try { localStorage.setItem('color-theme', next) } catch { /* storage may be disabled */ }
  }, [])

  return { colorTheme, selectColorTheme }
}
