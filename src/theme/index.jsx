import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

export default function ThemeProvider({ children }) {
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            width: '100%',
            height: '100%',
          },
          body: {
            width: '100%',
            height: '100%',
          },
          '#__next': {
            width: '100%',
            height: '100%',
          },
        },
      },
    },
  })

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
