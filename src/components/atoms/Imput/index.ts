import styled from 'styled-components';

export const Input = styled.input<{ $with?: string; $height?: string }>`
  height: ${({ $height }) => $height ? $height : '40px'};
  padding: 10px 15px;
  width: ${({ $with }) => $with ? $with : 'auto'};
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.inputPlaceholder};

  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    color: ${({ theme }) => theme.inputPlaceholder};
  }
`;
