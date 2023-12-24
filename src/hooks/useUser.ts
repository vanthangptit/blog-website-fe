import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as userStore from '@store/user';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const userStores = useAppSelector((state: RootState) => state.user);

  const getProfile = () => {
    return true;
    // return dispatch(userStore.getProfile({id: '1'}));
  };

  return {
    ...userStores,
    getProfile
  }
};
