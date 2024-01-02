import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import ThemeProvider, { themeMode } from '@src/theme';
import Routes from '@src/Routes';
import SwitchToggle from '@components/molecules/Toggler';
import Footer from '@components/atoms/Footer';
import { themes } from '@constants/theme';
import { useDarkMode } from '@hooks/useDarkMode';
import { AuthProvider } from '@src/infra/context/AuthContext';
import { UnauthorizedProvider } from '@src/infra/context/UnauthorizedContext';
import UnauthorizedError from '@components/molecules/Errors/UnauthorizedError';

function App() {
  const [
    theme,
    themeToggler,
    mountedComponent
  ] = useDarkMode();
  const themeObject = useMemo(() => themeMode(theme === themes.darkMode), [ theme ]);

  return mountedComponent ? (
    <ThemeProvider themeObject={themeObject}>
      <UnauthorizedProvider>
        <AuthProvider>
          <LayoutMain>
            <BrowserRouter>
              <Routes />

              <Footer>
                <SwitchToggle isDarkMode={theme === themes.darkMode} toggleTheme={themeToggler} />
              </Footer>
              <UnauthorizedError />
            </BrowserRouter>
          </LayoutMain>
        </AuthProvider>
      </UnauthorizedProvider>
    </ThemeProvider>
  ) : <div/>;
}

export default App;

const LayoutMain = styled.div`
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.bg0};
`;
