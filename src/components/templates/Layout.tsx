import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import styled from 'styled-components';
import Footer from '@components/organisms/Footer';
import SwitchToggle from '@components/molecules/Toggler';
import { themes } from '@constants/theme';
import UnauthorizedError from '@components/molecules/Errors/UnauthorizedError';
import { useDarkMode } from '@hooks/useDarkMode';
import { ToastContainer } from 'react-toastify';

const Layout = ({
  children,
  themeToggler
}: {
  children: React.ReactNode
  themeToggler: any
}) => {
  const [ theme ] = useDarkMode();

  return (
    <BoxBg>
      {/*@todo: create header component */}
      {/*<header>header</header>*/}
      {/*<nav>nav</nav>*/}

      {children}

      <Footer>
        <SwitchToggle isDarkMode={theme === themes.darkMode} toggleTheme={themeToggler} />
      </Footer>
      <UnauthorizedError />
      <ToastContainer
        position='bottom-right'
        autoClose={2500}
      />
    </BoxBg>
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
