import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';
import * as userStore from '@store/user';
import { useAuth } from '@hooks/useAuth';
import { IFEditFirstName, IFEditLastName } from '@models/IFUser';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { getAuth } = useAuth();
  const userStores = useAppSelector((state: RootState) => state.user);

  const getProfile = () => {
    return dispatch(userStore.getProfile({ token: getAuth('accessToken') }));
  };

  const editProfile = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    return dispatch(userStore.getProfile({ token: getAuth('accessToken') }));
  };

  const editFirstName = (data: IFEditFirstName) => {
    return dispatch(userStore.editFirstName({ data, token: getAuth('accessToken') }));
  };

  const editLastName = (data: IFEditLastName) => {
    return dispatch(userStore.editLastName({ data, token: getAuth('accessToken') }));
  };

  return {
    ...userStores,
    editProfile,
    getProfile,
    editFirstName,
    editLastName
  };
};
