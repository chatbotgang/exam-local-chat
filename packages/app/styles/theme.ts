import { createTheme } from "@mui/material";

export const theme = (mode: 'dark' | 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#000000' : '#FFFFFF',
      dark: mode === 'dark' ? '#191919' : '#999999',
      light: mode === 'dark' ? '#888888' : '#080808'
    },
    text: {
      primary: mode === 'dark' ? '#FFFFFF' : '#000000',
      secondary: '#FFFFFF'
    }
  }
});