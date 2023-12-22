import React, { useContext } from 'react';
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import { AuthContext } from '@src/infra/context/AuthContext';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Featured from '@pages/Featured';
import CreatePost from '@pages/CreatePost';
import Categories from '@pages/Categories';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/featured' element={<Featured />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/categories' element={<Categories />} />
      </Route>

      <Route path='*' element={<div>Page Not Found</div>} />
    </Router>
  );
};

export default Routes;
