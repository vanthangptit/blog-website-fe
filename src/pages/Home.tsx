import React from 'react';
import { useAuth } from '@hooks/useAuth';

const Home = () => {
  const { accessToken } = useAuth();

  // eslint-disable-next-line no-console
  console.log('accessToken: ', accessToken);

  return (
    <h1>
      <span>Home page</span>
    </h1>
  );
};

export default Home;
