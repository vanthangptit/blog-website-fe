import React from 'react';
import { useAuth } from '@hooks/useAuth';

const Home = () => {
  const { auth } = useAuth();

  // eslint-disable-next-line no-console
  console.log('accessToken: ', auth);

  return (
    <h1>
      <span>Home page</span>
    </h1>
  );
};

export default Home;
