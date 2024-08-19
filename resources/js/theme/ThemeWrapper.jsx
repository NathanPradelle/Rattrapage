import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import React from 'react';

const ThemeWrapper = ({ children }) => {
  const palette = {
    grey: { main: '#606060;' },
    greyBright: { main: '#D9D9D9' },
    strawberry: { main: '#BF3030' },
    beige: { main: '#FFC061' },
    beigeDark: { main: '#F1A330' },
    blue: { main: '#4F46E5' },
    green: { main: '#14FF00' },
    secondary: { main: '#F5C300' },
    warning: { main: '#F27249' },
    error: { main: '#FD0808' },
  };

  const themeName = 'No More Waste';
  const typography = {
    fontFamily: 'pier_sans, sans-serif',
  };
  const theme = createTheme({ typography, palette, themeName });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
