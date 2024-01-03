import React, { useContext, useEffect } from 'react';
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import { AuthContext } from '@src/infra/context/AuthContext';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';

import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Featured from '@pages/Featured';
import CreatePost from '@pages/CreatePost';
import Categories from '@pages/Categories';
import CreateCategory from '@pages/CreateCategory';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const location = useLocation();

  useEffect(() => {
    setUnauthorized(false);
  }, []);

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const PublicRoutes = () => {
  const { setUnauthorized } = useContext(UnauthorizedContext);

  useEffect(() => {
    setUnauthorized(false);
  }, []);

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route element={<PublicRoutes />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/featured' element={<Featured />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/edit-post/:shortUrl' element={<CreatePost />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/create-category' element={<CreateCategory />} />
        <Route path='/category/:id' element={<CreateCategory />} />
      </Route>

      <Route path='*' element={<div>Page Not Found</div>} />
    </Router>
  );
};

export default Routes;
