import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as userStore from '@store/user';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const getUser = () => {
    return dispatch(userStore.getUserApi());
  };
};
