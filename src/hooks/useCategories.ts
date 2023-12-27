import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as categoriesStore from '@store/categories';
import { useAuth } from '@hooks/useAuth';
import { IFCategories, IFCategoryId } from '@models/IFCategory';

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuth();
  const categoryStore = useAppSelector((state: RootState) => state.categories);

  const getCategories = () => {
    return dispatch(categoriesStore.getCategoriesApi({ token: accessToken }));
  };

  const createCategory = (params: IFCategories) => {
    return dispatch(categoriesStore.createCategory(params));
  };

  const editCategory = (params: IFCategories) => {
    return dispatch(categoriesStore.editCategory(params));
  };

  const getCategoryById = (params: IFCategoryId) => {
    return dispatch(categoriesStore.getCategoryById(params));
  };

  return {
    ...categoryStore,
    getCategories,
    createCategory,
    getCategoryById,
    editCategory
  };
};
