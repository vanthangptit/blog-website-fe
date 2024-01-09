import React from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import styled from 'styled-components';

const ThreeDots = ({ bg, size, handleClick }: { bg?: string; size: number; handleClick: () => void }) => {
  return (
    <ThreeDot $size={size} onClick={handleClick} $bg={bg}>
      <BiDotsHorizontal size={size} />
    </ThreeDot>
  );
};

export default ThreeDots;

const ThreeDot = styled.span<{ $size: number, $bg?: string }>`
  display: inline-flex;
  width: ${({ $size }) => $size + 2 + 'px'};
  height: ${({ $size }) => $size + + 2 + 'px'};
  cursor: pointer;
  background-color: ${({ theme, $bg }) => $bg ?? theme.gray4};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.secondary4};
`;
