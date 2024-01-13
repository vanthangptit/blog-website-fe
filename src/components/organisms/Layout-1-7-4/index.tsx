import React from 'react';
import styled from 'styled-components';
import styles from '@constants/styles';
import AsideLeftPost from '@components/organisms/AsideLeftPost';
import { IFPost } from '@models/IFPosts';

const Layout174 = ({ children, post }: { children: React.ReactNode, post: IFPost }) => {
  return (
    <Layout>
      <AsideLeft>
        <AsideLeftPost post={post}/>
      </AsideLeft>
      <Main>
        {children}
      </Main>
      <AsideRight>
        right
      </AsideRight>
    </Layout>
  );
};

export default Layout174;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: ${styles.widthContainer}px;
  padding: 15px;
  margin: auto;
  gap: 15px;
`;

const AsideLeft = styled.aside`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 ${(0.7/12)*100}%;
    padding-top: 89px;
  }

  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: ${styles.zIndex.highest};
    background-color: ${({ theme }) => theme.bg0};
    box-shadow: 0 -2px 8px 0 ${({ theme }) => theme.bgBoxShadow};
  }
`;

const AsideRight = styled.aside`
  flex: 0 0 100%;

  @media (min-width: 992px) {
    flex: 0 0 ${(4/12)*100}%;
  }
`;

const Main = styled.main`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 calc(${(11.3/12)*100}% - 15px);
  }

  @media (min-width: 992px) {
    flex: 0 0  calc(${(7.3/12)*100}% - 30px);
  }
`;
