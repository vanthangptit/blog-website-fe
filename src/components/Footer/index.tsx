import * as React from 'react';
import styled from 'styled-components';
import { heightFooter } from '@constants/footer';

const Footer = ({ children }: { children: React.ReactNode}) => {
  return (
    <FooterElement>
      {children}
      <NoCopyright>2023 Ⓒ nguyenthangdev - All rights reserved</NoCopyright>
    </FooterElement>
  );
};

export default Footer;

const FooterElement = styled.footer`
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-style: italic;
  text-align: center;
  padding: 20px 0 30px;
  height: ${heightFooter}px;
`;

const NoCopyright = styled.p`
  color: ${({ theme }) => theme.text1};
  padding-top: 15px;
`;
