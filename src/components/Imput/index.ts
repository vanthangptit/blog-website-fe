import styled from 'styled-components';

export const Input = styled.input<{ $with?: string; $height?: string }>`
  height: ${({ $height }) => $height ? $height : '40px'};
  padding: 10px 15px;
  width: ${({ $with }) => $with ? $with : 'auto'};
  color: ${({ theme }) => theme.black};

  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholder};
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Edge 12 -18 */
    ${({ theme }) => theme.inputPlaceholder};
  }
`;
