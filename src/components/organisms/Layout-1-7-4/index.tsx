import React from 'react';
import styled from 'styled-components';
import styles from '@constants/styles';
import AsideLeftPost from '@components/organisms/AsideLeftPost';
import { IFPost } from '@models/IFPosts';
import AsideRightPost from '@components/organisms/AsideRightPost';
import { IUser } from '@models/IFUser';

const spacing = 20;

const Layout174 = ({
  children,
  post,
  postRelated,
  creator,
  user
}: {
  children: React.ReactNode,
  post: IFPost
  postRelated?: IFPost[]
  creator: IUser
  user?: IUser
}) => {
  return (
    <Layout>
      <AsideLeft>
        <AsideLeftPost
          user={user}
          creator={creator}
          post={post}/>
      </AsideLeft>
      <Main>
        {children}
      </Main>
      <AsideRight>
        <AsideRightPost
          user={user}
          creator={creator}
          postRelated={postRelated}
          shortUrl={post.shortUrl}
        />
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
  margin-left: auto;
  margin-right: auto;
  gap: ${spacing}px;
`;

const AsideLeft = styled.aside`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 ${(0.4/12)*100}%;
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
    flex: 0 0 ${(3.6/12)*100}%;
  }
`;

const Main = styled.main`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 calc(${(11.5/12)*100}% - ${spacing}px);
  }

  @media (min-width: 992px) {
    flex: 0 0  calc(${(8/12)*100}% - ${spacing * 2}px);
  }
`;
