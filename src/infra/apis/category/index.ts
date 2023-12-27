import requester from '../requester';
import { API_CATEGORY } from '@constants/apis';
import { IFCategories, IFGetCategory, IFCategoryId } from '@models/IFCategory';

const categoryApi = {
  getCategoriesApi: (params: IFGetCategory) => {
    return requester.get(API_CATEGORY.URL_API, params ?? {});
  },
  createCategoryApi: (data: IFCategories) => {
    return requester.post(API_CATEGORY.URL_API, data);
  },
  editCategoryApi: ({ id, ...data }: IFCategories) => {
    return requester.put(`${API_CATEGORY.URL_API}/${id}`, data);
  },
  getCategoryById: (params: IFCategoryId) => {
    return requester.get(`${API_CATEGORY.URL_API}/${params.id}`, {});
  }
};

export default categoryApi;
