import Cookies from 'universal-cookie';

type cookieKeys = 'theme' | 'user';

const cookies = new Cookies();

export const useCookies = () => {
  const domain = window.location.hostname;

  const getCookies = (cookieLabels: cookieKeys[]) => {
    const retCookie: any = {};

    cookieLabels.forEach((item) => {
      if (!item || !item?.length) {
        throw new Error('You can\'t remove cookie with empty values');
      }
      const value = cookies.get(item);

      if (value) {
        retCookie[`${item}`] = value;
      }
    });
    if (Object.keys(retCookie).length === 0) {
      /* eslint-disable */
      return;
    } else {
      return retCookie;
    }
  };

  const addCookies = (cookieLabel: cookieKeys, cookieValue: boolean | string) => {
    if (!cookieLabel || !cookieLabel?.length) {
      throw new Error('You can\'t add cookie with empty value');
    }
    cookies.set(cookieLabel, cookieValue, {
      path: '/',
      domain,
      maxAge: 60 * 60 * 24 * 8 // 8 days
    });
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
