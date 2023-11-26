import { useEffect, useState } from 'react';
import { themes } from '@constants/theme';

export const useDarkMode = () => {
  const [ theme, setTheme ] = useState(themes.lightMode);
  const [ mountedComponent, setMountedComponent ] = useState(false);

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === themes.lightMode ? setMode(themes.darkMode) : setMode(themes.lightMode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode(themes.lightMode);
    setMountedComponent(true);
  }, []);

  return [ theme, themeToggler, mountedComponent ];
};
