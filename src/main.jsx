import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

import { HelmetProvider } from 'react-helmet-async';

import App from './App.jsx';

import './index.css';
import './styles/_global.scss';
import './styles/styles.scss';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#10b69e' },
    background: {
      default: '$color-background',
      paper: '$color-background',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </HelmetProvider>
  </StrictMode>,
);
