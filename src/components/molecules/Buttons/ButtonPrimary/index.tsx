import React from 'react';
import styled from 'styled-components';
import { BtnPrimary, Size } from '@components/atoms/Buttons/BtnPrimary';
import Loader from '@components/molecules/Loader';

export type ButtonType = 'button' | 'submit' | 'reset';

export default ({
  className,
  buttonType = 'button',
  text,
  isLoading= false,
  handleClick,
  disabled,
  size
}: {
  className?: string
  buttonType?: ButtonType
  text: string
  isLoading?: boolean
  disabled?: boolean
  handleClick?: () => void
  size?: Size
}) => {
  return (
    <BtnPrimary
      onClick={handleClick}
      $isLoading={isLoading}
      type={buttonType}
      disabled={disabled}
      $size={size ?? 'md'}
      className={className}
    >
      <ButtonText>{text}</ButtonText>
      {isLoading && (
        <LoaderBox>
          <Loader size={'15px'} />
        </LoaderBox>
      )}
    </BtnPrimary>
  );
};

const LoaderBox = styled.span`
  display: inline-flex;
  marginLeft: '10px'
`;

const ButtonText = styled.span`
  white-space: nowrap;
  display: inline-block;
  padding-top: 3px;
`;
