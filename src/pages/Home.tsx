import React, { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

const Home = () => {
  const { accessToken } = useAuth();

  // eslint-disable-next-line no-console
  console.log('accessToken: ', accessToken);

  useEffect(() => {
    (async () => {
      // await getAccessTokenApi();
    })();
    /* eslint-disable */
  }, []);

  return (
    <h1>
      <span>Home page</span>
    </h1>
  );
};

export default Home;
