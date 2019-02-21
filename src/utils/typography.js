import Typography from "typography"
import sutroTheme from 'typography-theme-sutro'

sutroTheme.headerLineHeight = 1.1
sutroTheme.overrideThemeStyles = () => {
  return {
    a: {
      color: `rgb(60,99,243)`,
    },
    h1: {
      lineHeight: 1,
    },
  }
}

const typography = new Typography(sutroTheme)

export const { rhythm, scale } = typography
export default typography
