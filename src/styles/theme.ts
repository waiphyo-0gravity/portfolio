import { createTheme } from "@mui/material";
import { primary } from "./colors";

export const theme = createTheme({
  palette: {
    primary: { main: primary }
  },
  typography: {
    fontFamily: [
        '"Roboto Condensed"',
        "sans-serif"
    ].join(','),
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          transition: '.1s ease-in-out',
          
          '&:active': {
            transform: 'scale(.96)'
          }
        }
      },
      defaultProps: {
        disableRipple: true
      }
    },
  }
})