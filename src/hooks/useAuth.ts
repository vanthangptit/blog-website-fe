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

  const getConfig = (isAuthorization?: boolean) => {
    return {
      withCredentials: true,
      headers: {
        Accept: 'applicaiton/json',
        'Content-Type': 'application/json',
        Authorization: isAuthorization ? 'Bearer ' + authStore.accessToken : null
      }
    };
  };

  const loginApi = (params: IFLogin) => {
    return dispatch(authStores.loginApi({ params, config: getConfig() }));
  };

  const getAccessTokenApi = () => {
    return dispatch(authStores.getAccessTokenApi({ config: getConfig() }));
  };

  return {
    ...authStore,
    loginApi,
    getAccessTokenApi,
    getConfig
  };
};
