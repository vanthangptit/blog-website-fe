import styled from 'styled-components';

export const BtnOutLine = styled.button<{ $isLoading?: boolean }>`
  outline: none;
  padding: 8px 25px;
  border: 1px solid ${({ theme }) => theme.bg1};
  background-color: ${({ theme }) => theme.bg0};
  color: ${({ theme }) => theme.primary1};
  cursor: pointer;
  border-radius: 70px;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  gap: 5px;
  pointer-events: ${({ $isLoading }) => $isLoading ? 'none' : 'auto'};

  &:hover {
    background-color: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.primary2};

    & * {
      color: inherit;
    }
  }

  &:disabled,
  &[disabled] {
    pointer-events: none;
    background-color: ${({ theme }) => theme.gray5};
    border-color: ${({ theme }) => theme.gray5};
  }

  & * {
    color: inherit;
  }
`;
