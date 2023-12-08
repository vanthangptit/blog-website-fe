import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import ThemeProvider, { themeMode } from '@src/theme';
import SwitchToggle from '@components/Toggler';
import Footer from '@components/Footer';
import { themes } from '@constants/theme';

import { useDarkMode } from '@hooks/useDarkMode';
import { AuthProvider } from '@src/infra/context/AuthContext';
import Routes from '@src/Routes';

function App() {
  const [
    theme,
    themeToggler,
    mountedComponent
  ] = useDarkMode();
  const themeObject = useMemo(() => themeMode(theme === themes.darkMode), [ theme ]);

  return mountedComponent ? (
    <ThemeProvider themeObject={themeObject}>
      <LayoutMain>
        <BrowserRouter>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BrowserRouter>

        <Footer>
          <SwitchToggle isDarkMode={theme === themes.darkMode} toggleTheme={themeToggler} />
        </Footer>
      </LayoutMain>
    </ThemeProvider>
  ) : <div/>;
}

export default App;

const LayoutMain = styled('div')`
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.bg0};
`;
