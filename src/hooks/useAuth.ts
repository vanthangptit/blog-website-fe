import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as authStores from '@store/auth';
import { IFLogin } from '@models/IFAuth';
import { AxiosRequestConfig } from 'axios';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state: RootState) => state.auth);

  const getConfig = (isAuthorization?: boolean): AxiosRequestConfig => {
    return {
      withCredentials: true,
      headers: {
        Accept: 'applicaiton/json',
        'Content-Type': 'application/json',
        Authorization: isAuthorization ? 'Bearer ' + authStore?.auth?.accessToken : null
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
