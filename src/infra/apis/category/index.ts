import requester from '../requester';
import { API_CATEGORY } from '@constants/apis';
import { IFCategories, IFGetCategory } from '@models/IFCategory';

const categoryApi = {
  getCategoriesApi: (params: IFGetCategory) => {
    return requester.get(API_CATEGORY.URL_API, {}, params.token);
  },
  createCategoryApi: (data: IFCategories) => {
    return requester.post(API_CATEGORY.URL_API, data);
  }
};

export default categoryApi;
