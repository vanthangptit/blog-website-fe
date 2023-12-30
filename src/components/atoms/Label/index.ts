import styled from 'styled-components';

export const LabelField = styled.label<{ $align?: string }>`
  display: block;
  font-size: 16px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.fontRobotoLight};
  color: ${({ theme }) => theme.text1};
  text-align: ${({ $align }) => $align ?? 'left'};
`;
