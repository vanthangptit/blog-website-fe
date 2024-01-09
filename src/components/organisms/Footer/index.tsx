import * as React from 'react';
import styled from 'styled-components';
import css from '@constants/styles';
import { Container } from '@components/atoms/Layout';

const Footer = ({ children }: { children: React.ReactNode}) => {
  return (
    <Container>
      <FooterElement>
        {children}
        <NoCopyright>2023 Ⓒ nguyenthangdev - All rights reserved</NoCopyright>
      </FooterElement>
    </Container>
  );
};

export default Footer;

const FooterElement = styled.footer`
  position: relative;
  font-size: 13px;
  font-style: italic;
  text-align: center;
  padding: 20px 0 30px;
  height: ${css.heightFooter}px;
`;

const NoCopyright = styled.p`
  color: ${({ theme }) => theme.text1};
  padding-top: 15px;
`;
