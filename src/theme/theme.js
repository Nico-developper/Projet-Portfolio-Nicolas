import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: 'var(--primary)' },
    secondary: { main: 'var(--secondary)' },
    error: { main: 'var(--danger)' },
    success: { main: 'var(--success)' },
    warning: { main: 'var(--warning)' },
    background: {
      default: 'var(--bg)',
      paper: 'var(--surface)',
    },
    text: {
      primary: 'var(--text)',
      secondary: 'var(--muted)',
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Arial', 'sans-serif'].join(','),
  },
});
