import requester from '../requester';
import { IFLogin } from '@models/IFAuth';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';
import { AxiosRequestConfig } from 'axios';

const authApi = {
  loginApi: (params: IFLogin, config: AxiosRequestConfig) => {
    return requester.post(LOGIN.URL_API, params, config);
  },
  getAccessToken: ({ config }: { config: AxiosRequestConfig }) => {
    return requester.get(REFRESH_TOKEN.URL_API, {}, config);
  }
};

export default authApi;
