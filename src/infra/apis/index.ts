import authApi from './auth';
import categoryApi from './category';
import userApi from './user';
import postApi from './post';

const api = {
  ...authApi,
  ...categoryApi,
  ...postApi,
  ...userApi
};

export default api;
