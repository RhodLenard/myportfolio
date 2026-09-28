export const colorThemes = [
  { id: 'terracotta', name: 'Terracotta', color: '#d97757' },
  { id: 'ocean', name: 'Ocean', color: '#4f7cac' },
  { id: 'forest', name: 'Forest', color: '#3f8f6b' },
  { id: 'violet', name: 'Violet', color: '#7667b3' },
  { id: 'rose', name: 'Rose', color: '#c65f78' },
] as const

export type ColorThemeId = (typeof colorThemes)[number]['id']
