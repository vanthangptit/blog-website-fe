import styled from 'styled-components';

export const MessageError = styled.label<{ $align?: 'center' | 'right' | 'left' }>`
  display: inline-block;
  width: 100%;
  color: #f44336;
  margin-bottom: 25px;
  font-size: 13px;
  font-weight: 400;
  text-align: ${({ $align }) => $align ?? 'left'};
`;
