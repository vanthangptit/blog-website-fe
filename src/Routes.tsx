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
import MyPosts from '@pages/MyPosts';
import CreatePost from '@pages/CreatePost';
import Categories from '@pages/Categories';
import CreateCategory from '@pages/CreateCategory';
import SinglePost from '@pages/SinglePost';
import NotFound from '@components/molecules/NotFound';
import MyAccount from '@pages/MyAccount';
import Settings from '@pages/Settings';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  const { unauthorized, setUnauthorized } = useContext(UnauthorizedContext);
  const location = useLocation();

  useEffect(() => {
    if (unauthorized) {
      setUnauthorized(false);
    }
  }, [ location ]);

  return authenticated ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

const PublicRoutes = () => {
  const { unauthorized, setUnauthorized } = useContext(UnauthorizedContext);
  const location = useLocation();

  useEffect(() => {
    if (unauthorized) {
      setUnauthorized(false);
    }
  }, [ location ]);

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route element={<PublicRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/post/:shortUrl' element={<SinglePost />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path='/posts' element={<MyPosts />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/edit-post/:shortUrl' element={<CreatePost />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/create-category' element={<CreateCategory />} />
        <Route path='/category/:id' element={<CreateCategory />} />
        <Route path='/user/:id' element={<MyAccount />} />
        <Route path='/settings' element={<Settings />} />
      </Route>

      <Route path='*' element={<NotFound message={'The page you requested was not found.'}/>} />
    </Router>
  );
};

export default Routes;
