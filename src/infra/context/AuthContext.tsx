import React, { createContext, ReactNode, useState } from 'react';
import { IFAuthResponse } from '@models/IFAuth';
import { useAuth } from '@hooks/useAuth';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: IFAuthResponse | undefined;
  /* eslint-disable */
  setAuthenticated: (newState: IFAuthResponse | undefined) => void
}

const initialValue = {
  authenticated: undefined,
  setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const { auth } = useAuth();
  const [ authenticated, setAuthenticated ] = useState(auth);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export {  AuthContext, AuthProvider }
