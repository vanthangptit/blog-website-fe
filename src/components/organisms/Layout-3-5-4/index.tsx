import React from 'react';
import styled from 'styled-components';
import styles from '@constants/styles';
const spacing = 20;

const Layout354 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <AsideLeft/>
      <Main>
        {children}
      </Main>
      <AsideRight/>
    </Layout>
  );
};

export default Layout354;

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
  display: none;
  @media (min-width: 768px) {
    display: block;
    flex: 0 0 calc(${(3.5/12)*100}% - ${spacing * 2}px);
    max-width: calc(${(3.5/12)*100}% - ${spacing * 2}px);
  }
  @media (min-width: 992px) {
    flex: 0 0 ${(2.5/12)*100}%;
    max-width: ${(2.5/12)*100}%;
  }
`;
const AsideRight = styled.aside`
  display: none;
  flex: 0 0 ${(3/12)*100}%;
  max-width: ${(3/12)*100}%;
  @media (min-width: 992px) {
    display: block;
  }
`;
const Main = styled.main`
  flex: 0 0 100%;
  max-width: 100%;
  @media (min-width: 768px) {
    display: block;
    flex: 0 0 calc(${(8.5/12)*100}% - ${spacing}px);
    max-width: calc(${(8.5/12)*100}% - ${spacing}px);
  }
  @media (min-width: 992px) {
    flex: 0 0 calc(${(6.5/12)*100}% - ${spacing * 2}px);
    max-width: calc(${(6.5/12)*100}% - ${spacing * 2}px);
  }
`;
