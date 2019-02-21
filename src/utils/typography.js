import Typography from "typography"
import sutroTheme from 'typography-theme-sutro'

sutroTheme.headerLineHeight = 1.1
sutroTheme.baseFontSize = '18px' // was 20px.
sutroTheme.headerFontFamily = ['Source Sans Pro', 'sans-serif']
sutroTheme.overrideThemeStyles = () => {
  return {
    html: {
      color: '#252A3D',
    },
    body: {
      color: '#252A3D',
    },
    p: {
      color: '#252A3D',
    },
    h1: {
      lineHeight: 1,
    },
  }
}

const typography = new Typography(sutroTheme)

export const { rhythm, scale } = typography
export default typography
