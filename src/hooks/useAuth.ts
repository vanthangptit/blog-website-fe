import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as authStore from '@store/auth';
import { IFLogin } from '@models/IFAuthenticated';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authStates = useAppSelector((state: RootState) => state.auth);

  const loginApi = (params: IFLogin) => {
    return dispatch(authStore.loginApi(params));
  };

  return {
    ...authStates,
    loginApi
  };
};
