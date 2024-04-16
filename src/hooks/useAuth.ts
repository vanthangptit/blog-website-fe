import { IFLogin } from '@models/IFAuthenticated';
import requester from '@services/apis/requester';
import { AUTH } from '@constants/apis';
import { IFRegister } from '@models/IFRegister';

type SessionKeys = 'accessToken' | 'user';

export const useAuth = () => {
  const registerApi = async (data: IFRegister) => {
    return requester.post(AUTH.REGISTER_URL, data);
  };

  const loginApi = async (data: IFLogin) => {
    return requester.post(AUTH.LOGIN_URL, data);
  };

  const logoutApi = async (params: IFLogin) => {
    return requester.delete(AUTH.LOGOUT_URL, params);
  };

  const setAuth = (key: SessionKeys, value: any) => {
    sessionStorage.setItem(key, value);
  };

  const getAuth = (key: SessionKeys) => {
    return sessionStorage.getItem(key) ?? undefined;
  };

  const clearAllAuth = () => sessionStorage.clear();

  return {
    loginApi,
    setAuth,
    getAuth,
    logoutApi,
    clearAllAuth,
    registerApi
  };
};
