// Theme utility to apply theme settings
export const applyTheme = (theme) => {
  if (!theme) return

  const root = document.documentElement

  // Apply primary color
  if (theme.primaryColor) {
    root.style.setProperty('--primary-600', theme.primaryColor)
    root.style.setProperty('--primary-700', adjustColor(theme.primaryColor, -20))
    root.style.setProperty('--primary-500', adjustColor(theme.primaryColor, 20))
    root.style.setProperty('--primary-50', adjustColor(theme.primaryColor, 80))
  }

  // Apply secondary color
  if (theme.secondaryColor) {
    root.style.setProperty('--secondary-600', theme.secondaryColor)
    root.style.setProperty('--secondary-700', adjustColor(theme.secondaryColor, -20))
    root.style.setProperty('--secondary-500', adjustColor(theme.secondaryColor, 20))
  }

  // Apply dark mode
  if (theme.darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

// Initialize theme from settings
export const initializeTheme = (settings) => {
  if (settings && settings.theme) {
    applyTheme(settings.theme)
  }
}

// Update theme dynamically
export const updateTheme = (theme) => {
  applyTheme(theme)
} 