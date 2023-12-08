import Cookies from 'universal-cookie';

type cookieKeys = 'theme' | 'fullName';

const cookies = new Cookies();

export const useCookies = () => {
  const domain = window.location.hostname;

  const getCookies = (cookieLabel: cookieKeys) => {
    if (!cookieLabel || !cookieLabel?.length) {
      throw new Error(`${cookieLabel} can't is empty string or not exists`);
    }
    return cookies.get(cookieLabel);
  };

  const addCookies = (cookieLabel: cookieKeys, cookieValue: boolean | string) => {
    if (!cookieLabel || !cookieLabel?.length) {
      throw new Error('You can\'t add cookie with empty value');
    }
    cookies.set(cookieLabel, cookieValue, { path: '/', domain });
  };

  const removeCookies = (cookieLabels: cookieKeys[]) => {
    cookieLabels.forEach((item) => {
      if (!item || !item?.length) {
        throw new Error('You can\'t remove cookie with empty values');
      }
      cookies.remove(item, { path: '/', domain });
    });
  };

  return {
    getCookies,
    addCookies,
    removeCookies
  };
};
