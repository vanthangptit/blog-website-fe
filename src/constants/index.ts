
export const API_CONTACT_URL = process.env.REACT_APP_API_CONTACT_URL;
export const GOOGLE_ACCOUNTS_URL = process.env.REACT_APP_GOOGLE_ACCOUNTS_URL;
export const GOOGLE_OAUTH_REDIRECT = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

export const API_AUTH_URL = process.env.REACT_APP_API_USER_URL + 'auth';
export const API_USER_URL = process.env.REACT_APP_API_USER_URL + 'user';

export const API_POST_URL = process.env.REACT_APP_API_POST_URL;
// export const API_POST_URL = 'http://localhost:9400/api';

export const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;
export const AWS_S3_NAME = process.env.REACT_APP_AWS_S3_NAME;
export const AWS_S3_IDENTITY_POOL_ID = process.env.REACT_APP_AWS_S3_IDENTITY_POOL_ID;
export const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;
export const AWS_S3_URL_BLOG = process.env.REACT_APP_AWS_S3_URL_BLOG;
export const MODE_CV = process.env.REACT_APP_MODE_CV;

export const ACCESS_TOKEN = 'accessToken';
export const IMAGE_URL_COOKIE = 'imageUrl';
// export const REMEMBER_ME_COOKIE = 'rememberMe';

export const SEARCH = {
  ACTION_TYPES: {
    SEARCH_POST: 'APPS/SEARCH_POST'
  },
  URL_API: {
    SEARCH_POST: `${API_POST_URL}/search`
  }
};

export const POST = {
  ACTION_TYPES: {
    GET_ALL_POST: 'APPS/GET_ALL_POST',
    GET_BY_URL_POST: 'APPS/GET_BY_URL_POST',
    GET_POST_BY_CREATOR: 'APPS/GET_POST_BY_CREATOR',
    GET_BY_TYPE_POST: 'APPS/GET_BY_TYPE_POST',
    CREATE_POST: 'APPS/CREATE_POST',
    EDIT_POST: 'APPS/EDIT_POST',
    DELETE_POST: 'APPS/DELETE_POST'
  },
  URL_API: {
    GET_ALL_POST: `${API_POST_URL}/all`,
    GET_BY_URL_POST: `${API_POST_URL}/get-by-short-url`,
    GET_POST_BY_CREATOR: `${API_POST_URL}/get-by-creator`,
    GET_BY_TYPE_POST: `${API_POST_URL}/get-by-type`,
    CREATE_POST_API: `${API_POST_URL}/create-blog`,
    EDIT_POST_API: `${API_POST_URL}/edit-blog`,
    DELETE_POST: `${API_POST_URL}/delete-blog`
  }
};

export const USER = {
  ACTION_TYPES: {
    GET_USER: 'APPS/GET_USER',
    ADD_USER: 'APPS/ADD_USER',
    UPDATE_USER: 'APPS/UPDATE_USER',
    UPDATE_USER_BY_ID: 'APPS/UPDATE_USER_BY_ID',
    LOGIN_API: 'APPS/LOGIN',
    LOGIN_GOOGLE_API: 'APPS/LOGIN_GOOGLE',
    CHECK_USERNAME: 'APPS/CHECK_USERNAME',
    CHECK_EMAIL: 'APPS/CHECK_EMAIL',
    FORGOT_PASSWORD: 'APPS/FORGOT_PASSWORD'
  },
  URL_API: {
    GET_USER_API: `${API_USER_URL}`,
    ADD_USER_API: `${API_AUTH_URL}/register`,
    LOGIN_API: `${API_AUTH_URL}/login`,
    LOGIN_GOOGLE_API: `${API_AUTH_URL}/login/google`,
    CHECK_USERNAME: `${API_AUTH_URL}/check-username`,
    CHECK_EMAIL: `${API_AUTH_URL}/check-email`,
    FORGOT_PASSWORD: `${API_AUTH_URL}/forgot-password`,
    RESET_PASSWORD: `${API_AUTH_URL}/reset-password`,
    CHECK_CODE_FORGOT_PASSWORD: `${API_AUTH_URL}/check-code-forgot-password`
  }
};

export const GUEST_CONTACT = {
  ACTION_TYPES: {
    GUEST_CONTACT_API: 'APPS/CONTACT_API'
  },
  URL_API: {
    GUEST_CONTACT_API: `${API_CONTACT_URL}`
  }
};

export const SITES_URL = {
  HOME: '/',
  ABOUT: '/about',
  FEATURED: '/featured',
  CREATE_POST: '/create-post',
  EDIT_POST: '/edit-post/:shortUrl',
  FEATURED_DETAIL: '/post/:shortUrl',
  My_BLOG: '/my-blog',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  DASHBOARD: '/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
};

export const LAYOUT = {
  widthNavDesktop: 330,
  widthNavMobile: 260
};

export const TYPE_BLOG = [
  {
    label: 'Society',
    value: 'society'
  },
  {
    label: 'Sports',
    value: 'sports'
  },
  {
    label: 'Technology',
    value: 'technology'
  },
  {
    label: 'Traveling',
    value: 'traveling'
  },
  {
    label: 'History',
    value: 'history'
  },
  {
    label: 'Learn About',
    value: 'learn'
  },
  {
    label: 'True Love',
    value: 'lovely'
  },
  {
    label: 'Poem',
    value: 'poem'
  },
  {
    label: 'Review',
    value: 'review'
  },
  {
    label: 'Your Life',
    value: 'life'
  },
  {
    label: 'Diary',
    value: 'diary'
  }
];

export const PAGE_SIZE_DEFAULT = 9;
export const PAGE_DEFAULT = 0;
export const MAINTENANCE_BG_COLOR = '#f1f1f1';
export const MAINTENANCE_COLOR = '#000';
export const VISIBILITY = {
  PRIVATE: {
    label: 'Private',
    value: 'private'
  },
  PUBLIC: {
    label: 'Publish',
    value: 'public'
  }
};

export const AVATAR_DEFAULT = 'https://blog-app-seeder.s3.ap-southeast-1.amazonaws.com/images/avatar.svg';
