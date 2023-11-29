import { useCookies as userCookie } from 'react-cookie';

type cookieKeys = 'theme' | 'authToken' | 'fullName';

export const useCookies = () => {
  const [ cookie, setCookie, removeCookie ] = userCookie([
    'authToken',
    'fullName',
    'theme'
  ]);

  const getCookies = (cookieLabel: cookieKeys) => {
    if (!cookieLabel || !cookieLabel?.length) {
      throw new Error(`${cookieLabel} can't is empty string or not exists`);
    }
    return cookie[ cookieLabel ];
  };

  const addCookies = (cookieLabel: cookieKeys, cookieValue: boolean | string) => {
    if (!cookieLabel || !cookieLabel?.length) {
      throw new Error('You can\'t add cookie with empty value');
    }
    setCookie(cookieLabel, cookieValue, { path: '/', domain: window.location.hostname });
  };

  const removeCookies = (cookieLabels: cookieKeys[]) => {
    cookieLabels.forEach((item) => {
      if (!item || !item?.length) {
        throw new Error('You can\'t remove cookie with empty values');
      }
      removeCookie(item, { path: '/', domain: window.location.hostname });
    });
  };

  return {
    getCookies,
    addCookies,
    removeCookies
  };
};
