
export const API_ROOT_URL = process.env.REACT_APP_API_ROOT;

export const LOGIN = {
  ACTION_TYPES: 'APPS/LOGIN',
  URL_API: `${API_ROOT_URL}auth/login`
};

export const REFRESH_TOKEN = {
  ACTION_TYPES: 'APPS/REFRESH_TOKEN',
  URL_API: `${API_ROOT_URL}auth/refresh-token`
};

export const API_REGISTER_URL = `${API_ROOT_URL}auth/register`;
