import React from 'react';
import styled from 'styled-components';
import css from '@constants/styles';

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
  width: ${css.toggler.widthBg}px;
  height: ${css.toggler.heightBg}px;
  cursor: pointer;
  margin: auto;

  & span {
    position: absolute;
    transition: all 0.3s;
    left: ${css.toggler.transitionLeft}px;
    top: ${(css.toggler.heightBg - css.toggler.heightCircle) / 2}px;
    width: ${css.toggler.heightCircle}px;
    height: ${css.toggler.heightCircle}px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bg0};
    transform: translateX(
    ${({ $isDarkMode }) => $isDarkMode 
    ? `${css.toggler.widthBg - css.toggler.heightCircle - (css.toggler.transitionLeft * 2)}px` 
    : '0px'}
    );
  }
`;
