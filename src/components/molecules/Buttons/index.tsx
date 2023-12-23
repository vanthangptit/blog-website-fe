import React from 'react';
import styled from 'styled-components';
import { BtnPrimary } from '@components/atoms/Buttons/BtnPrimary';
import Loader from '@components/molecules/Loader';

export default ({
  text,
  isLoading= false,
  handleClick
}: {
  text: string
  isLoading?: boolean
  handleClick?: () => void
}) => {
  return (
    <BtnPrimary onClick={handleClick} isLoading={isLoading}>
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
  display: inline-block;
  padding-top: 3px;
`;
