import requester from '../requester';
import { IFLogin } from '@models/IFAuthenticated';
import { LOGIN } from '@constants/apis';

const authApi = {
  loginApi: (params: IFLogin) => {
    return requester.post(LOGIN.URL_API, params);
  }
};

export default authApi;
