
export const API_ROOT_URL = process.env.REACT_APP_API_ROOT;

export const AUTH = {
  REFRESH_TOKEN_URL: `${API_ROOT_URL}auth/refresh-token`,
  REGISTER_URL: `${API_ROOT_URL}auth/register`,
  LOGIN_URL: `${API_ROOT_URL}auth/login`,
  LOGOUT_URL: `${API_ROOT_URL}auth/logout`
};

export const API_CATEGORY = {
  URL_API: `${API_ROOT_URL}categories`,
  ACTION_TYPES: {
    GET: 'APPS/GET_CATEGORY',
    GET_ID: 'APPS/GET_CATEGORY_ID',
    POST: 'APPS/POST_CATEGORY',
    PUT: 'APPS/PUT_CATEGORY',
    DELETE: 'APPS/DELETE_CATEGORY'
  }
};

export const USER = {
  URL_API: {
    PROFILE: `${API_ROOT_URL}users/profile`,
    EDIT_FIRST_NAME: `${API_ROOT_URL}users/firstname`,
    EDIT_LAST_NAME: `${API_ROOT_URL}users/lastname`
  },
  ACTION_TYPES: {
    PROFILE: 'APPS/PROFILE',
    EDIT_FIRST_NAME: 'APPS/EDIT_FIRST_NAME',
    EDIT_LAST_NAME: 'APPS/EDIT_LAST_NAME'
  }
};

export const POST = {
  URL_API: `${API_ROOT_URL}posts`,
  ACTION_TYPES: {
    ALL: 'APPS/ALL_POST',
    POSTS_BY_USER: 'APPS/POSTS_BY_USER',
    SINGLE: 'APPS/SINGLE_POST',
    POST: 'APPS/CREATE_POST',
    PUT: 'APPS/PUT_POST',
    DELETE: 'APPS/DELETE_POST'
  }
};

export const COMMENT = {
  URL_API: `${API_ROOT_URL}comments`,
  ACTION_TYPES: {
    GET_BY_POST_ID: 'APPS/GET_BY_POST_ID',
    POST: 'APPS/CREATE_COMMENT',
    PUT: 'APPS/PUT_COMMENT',
    DELETE: 'APPS/DELETE_COMMENT'
  }
};
