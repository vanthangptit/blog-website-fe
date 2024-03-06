import React from 'react';
import { Container } from '@components/atoms/Layout';
import styled from 'styled-components';

const Layout12 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Main>
        {children}
      </Main>
    </Container>
  );
};

export default Layout12;

const Main = styled.main`
  max-width: 100%;
`;
