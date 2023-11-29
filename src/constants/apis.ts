
export const API_ROOT_URL = process.env.REACT_APP_API_ROOT;

// export const API_CONTACT_URL = process.env.REACT_APP_API_CONTACT_URL;
// export const API_AUTH_URL = process.env.REACT_APP_API_USER_URL + 'auth';
// export const API_USER_URL = process.env.REACT_APP_API_USER_URL + 'user';
// export const API_POST_URL = process.env.REACT_APP_API_POST_URL;
// export const API_POST_URL = 'http://localhost:9400/api';

export const ACTION_TYPES = {
  SEARCH_POST: 'APPS/SEARCH_POST'
};

export const URL_API = {
  LOGIN: `${API_ROOT_URL}auth/login`,
  GET_CSRF_TOKEN: `${API_ROOT_URL}csrf`,
  SEARCH_POST: `${API_ROOT_URL}/search`
};

// export const POST = {
//   ACTION_TYPES: {
//     GET_ALL_POST: 'APPS/GET_ALL_POST',
//     GET_BY_URL_POST: 'APPS/GET_BY_URL_POST',
//     GET_POST_BY_CREATOR: 'APPS/GET_POST_BY_CREATOR',
//     GET_BY_TYPE_POST: 'APPS/GET_BY_TYPE_POST',
//     CREATE_POST: 'APPS/CREATE_POST',
//     EDIT_POST: 'APPS/EDIT_POST',
//     DELETE_POST: 'APPS/DELETE_POST'
//   },
//   URL_API: {
//     GET_ALL_POST: `${API_POST_URL}/all`,
//     GET_BY_URL_POST: `${API_POST_URL}/get-by-short-url`,
//     GET_POST_BY_CREATOR: `${API_POST_URL}/get-by-creator`,
//     GET_BY_TYPE_POST: `${API_POST_URL}/get-by-type`,
//     CREATE_POST_API: `${API_POST_URL}/create-blog`,
//     EDIT_POST_API: `${API_POST_URL}/edit-blog`,
//     DELETE_POST: `${API_POST_URL}/delete-blog`
//   }
// };
//
// export const USER = {
//   ACTION_TYPES: {
//     GET_USER: 'APPS/GET_USER',
//     ADD_USER: 'APPS/ADD_USER',
//     UPDATE_USER: 'APPS/UPDATE_USER',
//     UPDATE_USER_BY_ID: 'APPS/UPDATE_USER_BY_ID',
//     LOGIN_API: 'APPS/LOGIN',
//     LOGIN_GOOGLE_API: 'APPS/LOGIN_GOOGLE',
//     CHECK_USERNAME: 'APPS/CHECK_USERNAME',
//     CHECK_EMAIL: 'APPS/CHECK_EMAIL',
//     FORGOT_PASSWORD: 'APPS/FORGOT_PASSWORD'
//   },
//   URL_API: {
//     GET_USER_API: `${API_USER_URL}`,
//     ADD_USER_API: `${API_AUTH_URL}/register`,
//     LOGIN_API: `${API_AUTH_URL}/login`,
//     LOGIN_GOOGLE_API: `${API_AUTH_URL}/login/google`,
//     CHECK_USERNAME: `${API_AUTH_URL}/check-username`,
//     CHECK_EMAIL: `${API_AUTH_URL}/check-email`,
//     FORGOT_PASSWORD: `${API_AUTH_URL}/forgot-password`,
//     RESET_PASSWORD: `${API_AUTH_URL}/reset-password`,
//     CHECK_CODE_FORGOT_PASSWORD: `${API_AUTH_URL}/check-code-forgot-password`
//   }
// };
//
// export const GUEST_CONTACT = {
//   ACTION_TYPES: {
//     GUEST_CONTACT_API: 'APPS/CONTACT_API'
//   },
//   URL_API: {
//     GUEST_CONTACT_API: `${API_CONTACT_URL}`
//   }
// };
