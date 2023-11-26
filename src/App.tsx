import React, { useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import styled from 'styled-components';
import Home from '@src/pages/Home';
import Login from '@src/pages/Login';
import ThemeProvider, { themeMode } from '@src/theme';
import SwitchToggle from '@components/Toggler';
import Footer from '@components/Footer';
import { themes } from '@constants/theme';

import { useDarkMode } from '@hooks/useDarkMode';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

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
        <RouterProvider router={router} />
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
