import React from 'react';
import { Container } from '@components/atoms/Layout';
import styled from 'styled-components';
import styles from '@constants/styles';
import AsideLeftPost from '@components/organisms/AsideLeftPost';

const Layout174 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Layout>
        <AsideLeft>
          <AsideLeftPost />
        </AsideLeft>
        <Main>
          {children}
        </Main>
        <AsideRight>
          right
        </AsideRight>
      </Layout>
    </Container>
  );
};

export default Layout174;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: ${styles.widthContainer}px;
  padding: 15px;
`;

const AsideLeft = styled.aside`
  flex: 0 0 ${(0.7/12)*100}%;
`;

const AsideRight = styled.aside`
  flex: 0 0 100%;

  @media (min-width: 992px) {
    flex: 0 0 ${(4/12)*100}%;
  }
`;

const Main = styled.main`
  flex: 0 0 ${(11/12)*100}%;
  
  @media (min-width: 992px) {
    flex: 0 0 ${(7.3/12)*100}%;
  }
`;
