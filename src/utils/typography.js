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
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    blockquote: {
      ...adjustFontSizeTo('18px'),
      backgroundColor: '#F5F6FA',
      color: '#333',
      fontStyle: 'italic',
      marginLeft: '0px',
      marginRight: '0px',
      padding: rhythm(13/16),
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
  })
})

export const { rhythm, scale } = typography

export default typography
