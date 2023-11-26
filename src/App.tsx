import React, { useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from '@src/pages/Home';
import Login from '@src/pages/Login';
import ThemeProvider, { themeMode } from '@src/theme';
import { useDarkMode } from '@hooks/useDarkMode';
import { themes } from '@src/constants';
import Toggle from '@components/Toggler';

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
      <main className={'main'}>
        <RouterProvider router={router} />
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </main>
    </ThemeProvider>
  ) : <div/>;
}

export default App;
