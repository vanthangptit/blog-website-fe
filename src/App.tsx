import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@src/Routes';
import { AuthProvider } from '@src/services/context/AuthContext';
import { UnauthorizedProvider } from '@src/services/context/UnauthorizedContext';
import Layout from '@components/templates/Layout';
import { useDarkMode } from '@hooks/useDarkMode';
import ThemeProvider, { themeMode } from '@src/theme';
import { themes } from '@constants/theme';

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
          <BrowserRouter>
            <Layout themeToggler={themeToggler}>
              <Routes />
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </UnauthorizedProvider>
    </ThemeProvider>
  ) : <div />;
}

export default App;
