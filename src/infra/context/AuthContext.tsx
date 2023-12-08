import React, { createContext, ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  /* eslint-disable */
  setAuthenticated: (newState: boolean) => void
}

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export {  AuthContext, AuthProvider }
