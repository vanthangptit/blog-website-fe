
export const API_ROOT_URL = process.env.REACT_APP_API_ROOT;

export const AUTH = {
  REFRESH_TOKEN_URL: `${API_ROOT_URL}auth/refresh-token`,
  REGISTER_URL: `${API_ROOT_URL}auth/register`,
  LOGIN_URL: `${API_ROOT_URL}auth/login`,
  LOGOUT_URL: `${API_ROOT_URL}auth/logout`
};

export const USER = {
  URL_API: {
    PROFILE: `${API_ROOT_URL}users/profile`,
    EDIT_FIRST_NAME: `${API_ROOT_URL}users/update/firstname`,
    EDIT_LAST_NAME: `${API_ROOT_URL}users/update/lastname`,
    EDIT_ADDRESS: `${API_ROOT_URL}users/update/address`,
    EDIT_JOB: `${API_ROOT_URL}users/update/job`,
    EDIT_DESCRIPTION: `${API_ROOT_URL}users/update/description`,
    EDIT_GENDER: `${API_ROOT_URL}users/update/gender`,
    EDIT_BIRTHDAY: `${API_ROOT_URL}users/update/birthday`,
    CHANGE_PASSWORDS: `${API_ROOT_URL}users/update/passwords`,
    CHANGE_PROFILE_PHOTO: `${API_ROOT_URL}users/update/profilephoto`,
    SCHOOL: `${API_ROOT_URL}users/update/school`,
    ALIAS: `${API_ROOT_URL}users/update/alias`,
    BIO: `${API_ROOT_URL}users/update/bio`,
    WEBSITE_URL: `${API_ROOT_URL}users/update/websiteurl`,
    FOLLOWING: `${API_ROOT_URL}users/follow/following`,
    UN_FOLLOW: `${API_ROOT_URL}users/follow/unfollower`
  },
  ACTION_TYPES: {
    PROFILE: 'APPS/PROFILE',
    EDIT_FIRST_NAME: 'APPS/EDIT_FIRST_NAME',
    EDIT_LAST_NAME: 'APPS/EDIT_LAST_NAME',
    EDIT_ADDRESS: 'APPS/EDIT_ADDRESS',
    EDIT_JOB: 'APPS/EDIT_JOB',
    EDIT_DESCRIPTION: 'APPS/EDIT_DESCRIPTION',
    EDIT_GENDER: 'APPS/EDIT_GENDER',
    EDIT_BIRTHDAY: 'APPS/EDIT_BIRTHDAY',
    CHANGE_PASSWORDS: 'APPS/CHANGE_PASSWORDS',
    CHANGE_PROFILE_PHOTO: 'APPS/CHANGE_PROFILE_PHOTO',
    SCHOOL: 'APPS/SCHOOL',
    ALIAS: 'APPS/ALIAS',
    BIO: 'APPS/BIO',
    WEBSITE_URL: 'APPS/WEBSITE_URL',
    FOLLOWING: 'APPS/FOLLOWING',
    UN_FOLLOW: 'APPS/UN_FOLLOW'
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
    DELETE: 'APPS/DELETE_POST',
    ASSOCIATE: 'APPS/ASSOCIATE',
    SAVES: 'APPS/SAVES',
    PINNED: 'APPS/PINNED'
  }
};

export const TAG = {
  URL_API: `${API_ROOT_URL}tags`,
  ACTION_TYPES: {
    ALL: 'APPS/ALL_TAG'
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
