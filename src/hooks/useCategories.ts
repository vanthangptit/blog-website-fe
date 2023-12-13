import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as categoriesStore from '@store/categories';
import { useAuth } from '@hooks/useAuth';

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { getConfig } = useAuth();
  const categoryStore = useAppSelector((state: RootState) => state.categories);

  const getCategories = () => {
    return dispatch(categoriesStore.getCategoriesApi({ config: getConfig(true) }));
  };

  return {
    ...categoryStore,
    getCategories
  };
};
