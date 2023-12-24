import authApi from './auth';
import categoryApi from './category';
import userApi from './user';

const api = {
  ...authApi,
  ...categoryApi,
  ...userApi
};

export default api;
