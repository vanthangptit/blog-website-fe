import requester from '../requester';
import { IFLogin } from '@models/IFAuth';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';

const authApi = {
  loginApi: (params: IFLogin) => {
    return requester.post(LOGIN.URL_API, params);
  },
  getAccessToken: () => {
    return requester.get(REFRESH_TOKEN.URL_API);
  }
};

export default authApi;
