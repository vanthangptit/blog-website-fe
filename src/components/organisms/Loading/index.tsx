import React from 'react';
import styled from 'styled-components';
import Loader from '@components/molecules/Loader';
import { useDarkMode } from '@hooks/useDarkMode';
import { themes } from '@constants/theme';

const Loading = () => {
  const [ theme ] = useDarkMode();

  return (
    <LoadingBox $isDarkMode={theme === themes.darkMode}>
      <Loader size={'115px'} stroke={theme === themes.darkMode ? '#FFFFFF' : '#000000'} />
    </LoadingBox>
  );
};

export default Loading;

const LoadingBox = styled.section<{ $isDarkMode: boolean }>`
  height: 100vh;
  width: 100%;
  min-width: 360px;
  min-height: 360px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? '#000000' : '#FFFFFF'};
  overflow: hidden;
`;
