import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as categoriesStore from '@store/categories';
import { CategoryParams, IFCategoryId } from '@models/IFCategory';
import { useAuth } from '@hooks/useAuth';

export const useCategories = () => {
  const { getAuth } = useAuth();
  const dispatch = useAppDispatch();
  const categoryStore = useAppSelector((state: RootState) => state.categories);

  const getCategories = () => {
    return dispatch(categoriesStore.getCategoriesApi({ token: getAuth('accessToken') }));
  };

  const getCategoryById = (params: IFCategoryId) => {
    return dispatch(categoriesStore.getCategoryById({ params, token: getAuth('accessToken') }));
  };

  const createCategory = (data: CategoryParams) => {
    return dispatch(categoriesStore.createCategory({ data, token: getAuth('accessToken') }));
  };

  const editCategory = (data: CategoryParams, params: IFCategoryId) => {
    return dispatch(categoriesStore.editCategory({ data, params, token: getAuth('accessToken') }));
  };

  const deleteCategory = (params: IFCategoryId) => {
    return dispatch(categoriesStore.deleteCategory({ params, token: getAuth('accessToken') }));
  };

  return {
    ...categoryStore,
    getCategories,
    createCategory,
    getCategoryById,
    editCategory,
    deleteCategory
  };
};
