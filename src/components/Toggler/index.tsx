import React from 'react';
import styled from 'styled-components';
import { toggler } from '@constants/toggler';

const SwitchToggle = ({ toggleTheme, isDarkMode  }: { toggleTheme: any; isDarkMode: boolean }) => {
  return (
    <SwitchToggleButton $isDarkMode={isDarkMode} onClick={toggleTheme}>
      <span />
    </SwitchToggleButton>
  );
};

export default SwitchToggle;

const SwitchToggleButton = styled.div<{ $isDarkMode: boolean }>`
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 40px;
  position: relative;
  width: ${toggler.widthBg}px;
  height: ${toggler.heightBg}px;
  cursor: pointer;
  margin: auto;

  & span {
    position: absolute;
    transition: all 0.3s;
    left: ${toggler.transitionLeft}px;
    top: ${(toggler.heightBg - toggler.heightCircle) / 2}px;
    width: ${toggler.heightCircle}px;
    height: ${toggler.heightCircle}px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bg0};
    transform: translateX(
    ${({ $isDarkMode }) => $isDarkMode 
    ? `${toggler.widthBg - toggler.heightCircle - (toggler.transitionLeft * 2)}px` 
    : '0px'}
    );
  }
`;
