import styled from 'styled-components';

export const MessageError = styled.div<{ $align?: 'center' | 'right' | 'left' }>`
  color: #f44336;
  margin-bottom: 25px;
  font-size: 14px;
  font-weight: 400;
  text-align: ${({ $align }) => $align ?? 'left'};
`;
