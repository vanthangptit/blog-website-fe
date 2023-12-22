import React, {
  createContext,
  ReactNode,
  useState
} from 'react';
import { useCookies } from '@hooks/useCookies';
import { IFAuth } from '@models/IFAuthenticated';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: IFAuth  | undefined
  /* eslint-disable */
  setAuthenticated: (newState: IFAuth | undefined) => void
}

const initialValue = {
  authenticated: undefined,
  setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { getCookies } = useCookies();
  const [ authenticated, setAuthenticated ] = useState<IFAuth | undefined>(getCookies([ 'user' ]));

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export {  AuthContext, AuthProvider }
