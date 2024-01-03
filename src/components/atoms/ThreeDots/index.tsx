import React from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import styled from 'styled-components';

const ThreeDots = ({ size, handleClick }: { size: number; handleClick: () => void }) => {
  return (
    <ThreeDot $size={size} onClick={handleClick}>
      <BiDotsHorizontal size={size} />
    </ThreeDot>
  );
};

export default ThreeDots;

const ThreeDot = styled.span<{ $size: number }>`
  display: inline-flex;
  width: ${({ $size }) => $size + 2 + 'px'};
  height: ${({ $size }) => $size + + 2 + 'px'};
  cursor: pointer;
  background-color: ${({ theme }) => theme.gray5};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.text2};
`;
