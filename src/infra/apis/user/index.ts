import requester from '../requester';
import { USER } from '@constants/apis';

const userApi = {
  getProfile: (id: string) => {
    return requester.get(USER.URL_API.PROFILE, { id });
  }
};

export default userApi;
