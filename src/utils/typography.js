import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 2,
  scaleRatio: 3,
  headerFontFamily: [
    "Source Sans Pro",
    "sans-serif",
  ],
  bodyFontFamily: ["Merriweather", "serif"],
})

export const { rhythm, scale } = typography

export default typography
