import styled from 'styled-components';

export const BtnPrimary = styled.button<{ $isLoading?: boolean }>`
  outline: none;
  padding: 8px 25px;
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
  font-size: 16px;
  gap: 5px;
  pointer-events: ${({ $isLoading }) => $isLoading ? 'none' : 'auto'};

  &:hover {
    background-color: ${({ theme }) => theme.bg0};
    color: ${({ theme }) => theme.primary1};
  }
`;
