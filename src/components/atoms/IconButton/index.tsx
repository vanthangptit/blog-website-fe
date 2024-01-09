import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';

const IconButton = ({ Element, size, title, handleClick }: { Element: IconType; size: number; title?: string; handleClick: () => void }) => {
  return (
    <IconBox $size={size} onClick={handleClick} title={title}>
      <Element size={size} />
    </IconBox>
  );
};

export default IconButton;

const IconBox = styled.span<{ $size: number }>`
  display: inline-flex;
  width: ${({ $size }) => $size + 2 + 'px'};
  height: ${({ $size }) => $size + + 2 + 'px'};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.secondary4};
`;
