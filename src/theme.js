import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E88E5', // Ocean blue
      light: '#64B5F6',
      dark: '#0D47A1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00B8D4', // Cyan accent
      light: '#18FFFF',
      dark: '#006064',
      contrastText: '#000',
    },
    background: {
      default: '#0A1929', // Dark blue-black
      paper: 'rgba(13, 38, 59, 0.8)', // Slightly transparent dark blue
      glass: 'rgba(15, 23, 42, 0.6)', // Glassmorphism base
    },
    text: {
      primary: '#fff',
      secondary: '#B0BEC5',
    },
    accent: {
      teal: '#80DEEA',
      cyan: '#00E5FF',
      azure: '#29B6F6',
      aqua: '#1DE9B6',
    },
    gradient: {
      blue: 'linear-gradient(135deg, #1E88E5 0%, #0D47A1 100%)',
      cyan: 'linear-gradient(135deg, #00B8D4 0%, #006064 100%)',
      mixed: 'linear-gradient(135deg, #1E88E5 0%, #00B8D4 100%)',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
      },
    },
  },
});

export default theme;
