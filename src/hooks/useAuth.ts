import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as authStores from '@store/auth';
import { IFLogin } from '@models/IFAuth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state: RootState) => state.auth);

  const loginApi = (params: IFLogin) => {
    return dispatch(authStores.loginApi(params));
  };

  const getAccessTokenApi = () => {
    return dispatch(authStores.getAccessTokenApi());
  };

  return {
    ...authStore,
    loginApi,
    getAccessTokenApi
  };
};
