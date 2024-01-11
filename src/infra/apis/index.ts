import authApi from './auth';
import categoryApi from './category';
import userApi from './user';
import postApi from './post';
import commentApi from './comment';

const api = {
  ...authApi,
  ...categoryApi,
  ...postApi,
  ...userApi,
  ...commentApi
};

export default api;
