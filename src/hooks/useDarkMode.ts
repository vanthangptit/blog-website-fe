import { useEffect, useState } from 'react';
import { themes } from '@constants/theme';
import { useCookies } from '@hooks/useCookies';

export const useDarkMode = () => {
  const { addCookies, getCookies } = useCookies();
  const [ theme, setTheme ] = useState(themes.lightMode);
  const [ mountedComponent, setMountedComponent ] = useState(false);

  const setMode = (mode: string) => {
    addCookies('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === themes.lightMode ? setMode(themes.darkMode) : setMode(themes.lightMode);
  };

  useEffect(() => {
    const localTheme = getCookies('theme');
    localTheme ? setTheme(localTheme) : setMode(themes.lightMode);
    setMountedComponent(true);
    /* eslint-disable */
  }, []);

  return [ theme, themeToggler, mountedComponent ];
};
