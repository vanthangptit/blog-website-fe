
export const GOOGLE_ACCOUNTS_URL = process.env.REACT_APP_GOOGLE_ACCOUNTS_URL;
export const GOOGLE_OAUTH_REDIRECT = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

export const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;
export const AWS_S3_NAME = process.env.REACT_APP_AWS_S3_NAME;
export const AWS_S3_IDENTITY_POOL_ID = process.env.REACT_APP_AWS_S3_IDENTITY_POOL_ID;
export const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;
export const AWS_S3_URL_BLOG = process.env.REACT_APP_AWS_S3_URL_BLOG;
export const MODE_CV = process.env.REACT_APP_MODE_CV;

export const ACCESS_TOKEN = 'accessToken';
export const IMAGE_URL_COOKIE = 'imageUrl';
// export const REMEMBER_ME_COOKIE = 'rememberMe';

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
