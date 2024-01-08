import { useEffect, useState } from 'react';
import { themes } from '@constants/theme';
import { useCookies } from '@hooks/useCookies';

export const useDarkMode = () => {
  const { addCookies, getCookies } = useCookies();
  const [ theme, setTheme ] = useState<string>(themes.lightMode);
  const [ mountedComponent, setMountedComponent ] = useState(false);

  const setMode = (mode: string) => {
    addCookies('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === themes.lightMode ? setMode(themes.darkMode) : setMode(themes.lightMode);
  };

  useEffect(() => {
    const cookieTheme = getCookies([ 'theme' ]);
    cookieTheme && cookieTheme?.theme ? setTheme(cookieTheme.theme) : setMode(themes.lightMode);
    setMountedComponent(true);
    /* eslint-disable */
  }, []);

  return [ theme, themeToggler, mountedComponent ];
};
