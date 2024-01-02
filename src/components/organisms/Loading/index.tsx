import React from 'react';
import styled from 'styled-components';
import Loader from '@components/molecules/Loader';
import { useDarkMode } from '@hooks/useDarkMode';
import { themes } from '@constants/theme';

const Loading = () => {
  const [ theme ] = useDarkMode();

  return (
    <LoadingBox>
      <Loader size={'115px'} stroke={theme === themes.darkMode ? '#FFFFFF' : '#000000'} />
    </LoadingBox>
  );
};

export default Loading;

const LoadingBox = styled.section`
  height: 100vh;
  width: 100vw;
  min-width: 360px;
  min-height: 360px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};;
`;
