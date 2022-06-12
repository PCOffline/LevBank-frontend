import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ContextWrapper from './ContextWrapper';
import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Router from './Router';

const theme = createTheme({
  palette: {
    primary: {
      light: 'rgba(0, 171, 85, 0.08)',
      main: '#00ab55',
      dark: '#007B55',
    },
    secondary: {
      light: 'rgba(145, 158, 171, 0.08)',
      main: '#919eab',
    },
    text: {
      primary: '#212b36',
      secondary: '#919eab',
      disabled: '#637381',
    },
    background: {
      paper: '#c8facd',
    },
    error: {
      main: '#b72136',
      light: 'rgba(255, 72, 66, 0.16)',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1375,
      xl: 1536,
    }
  }
});

// To make sure to send cookies in every request
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ContextWrapper>
        <Router />
      </ContextWrapper>
    </ThemeProvider>
  </React.StrictMode>,
);
