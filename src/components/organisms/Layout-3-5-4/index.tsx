import React from 'react';
import { Container, Row, Column } from '@components/atoms/Layout';
import styled from 'styled-components';

const Layout354 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <AsideLeft />
      <Main>
        {children}
      </Main>
      <AsideRight />
    </Layout>
  )
};

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AsideLeft = styled.aside`
  flex: 0 0 30%;
  max-width: 30%;
`;
const AsideRight = styled.aside`
  flex: 0 0 40%;
  max-width: 40%;
`;
const Main = styled.main`
  flex: 0 0 50%;
  max-width: 50%;
`;
