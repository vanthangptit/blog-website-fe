import React, { useContext } from 'react';
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from '@src/pages/Register';

import { AuthContext } from '@src/infra/context/AuthContext';

type Props = {
  data?: any
}

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();

  // eslint-disable-next-line no-console
  console.log(authenticated);

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // eslint-disable-next-line no-console
  console.log(111111);
  return <Outlet />;
};

const Routes = (props: Props) => {
  const { authenticated } = useContext(AuthContext);
  // eslint-disable-next-line no-console
  console.log({ props, authenticated });

  return (
    <Router>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path='*' element={<div>Page Not Found</div>} />
    </Router>
  );
};

export default Routes;
