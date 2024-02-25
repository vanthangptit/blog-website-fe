import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import styled from 'styled-components';
import Footer from '@components/organisms/Footer';
import SwitchToggle from '@components/molecules/Toggler';
import { themes } from '@constants/theme';
import UnauthorizedError from '@components/molecules/Errors/UnauthorizedError';
import { ToastContainer } from 'react-toastify';
import { useCookies } from '@hooks/useCookies';

const Layout = ({
  children,
  themeToggler
}: {
  children: React.ReactNode
  themeToggler: any
}) => {
  const { getCookies } = useCookies();

  return (
    <>
      <BoxBg>
        {/*@todo: create header component */}
        {/*<header>header</header>*/}
        {/*<nav>nav</nav>*/}

        {children}

        <Footer>
          <SwitchToggle isDarkMode={getCookies([ 'theme' ])?.theme === themes.darkMode} toggleTheme={themeToggler} />
        </Footer>
        <UnauthorizedError />
      </BoxBg>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
      />
    </>
  );
};

export default Layout;

const BoxBg = styled.div`
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.bg0};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
`;
