import styled, { css } from 'styled-components';

export type Size = 'sm' | 'md' | 'lg';

export const BtnPrimary = styled.button<{ $isLoading?: boolean, $size: Size }>`
  outline: none;
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.primary2};
  cursor: pointer;
  border-radius: 70px;
  text-transform: uppercase;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  pointer-events: ${({ $isLoading }) => $isLoading ? 'none' : 'auto'};

  &:hover {
    background-color: ${({ theme }) => theme.bg0};
    color: ${({ theme }) => theme.primary1};
  }

  &:disabled,
  &[disabled] {
    pointer-events: none;
    background-color: ${({ theme }) => theme.gray5};
    border-color: ${({ theme }) => theme.gray5};
  }

  ${({ $size }) =>
    $size === 'sm' &&
    css`
      padding: 2px 18px 4px;
      font-size: 0.875rem;
      line-height: 1.5;
  `}

  ${({ $size }) =>
    ($size === 'md' || !$size) &&
    css`
      padding: 8px 25px;
      font-size: 1rem;
      line-height: 1.5;
  `}

  ${({ $size }) =>
    $size === 'lg' &&
    css`
      padding: 8px 25px;
      font-size: 1.25rem;
      line-height: 1.5;
  `}
`;
