import styled from 'styled-components';

export const BtnSubmit = styled.button<{ $with?: string; $height?: string }>`
  outline: none;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.white};
  cursor: pointer;

  width: ${({ $with }) => $with ? $with : 'auto'};
  height: ${({ $height }) => $height ? $height : 'auto'};
  margin: 15px 0 15px;

  &::focus,
  &::hover {
    // color: ${({ theme }) => theme.inputPlaceholder};
  }
`;
