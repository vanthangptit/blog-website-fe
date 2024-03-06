import React, { useEffect } from 'react';
import Layout354 from '@components/organisms/Layout-3-5-4';
import { usePosts } from '@hooks/usePost';
import { useLocation } from 'react-router-dom';
import CardPostAtHome from '@components/molecules/Cards/CardPostAtHome';
import styled from 'styled-components';

const Home = () => {
  const location = useLocation();
  const { getAllPost, allPost } = usePosts();

  useEffect(() => {
    getAllPost();
  }, [ location ]);

  return (
    <Layout354>
      {allPost?.data && allPost?.data.length > 0 ? allPost.data?.map((item, index) => (
        <CardPostAtHome key={index} post={item} margin={'20px 0'}/>
      )) : (
        <Heading>Having no posts</Heading>
      )}
    </Layout354>
  );
};

export default Home;

const Heading = styled.h3`
  color: ${({ theme }) => theme.text1}
`;
