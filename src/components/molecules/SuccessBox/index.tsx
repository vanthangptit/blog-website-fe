import React from 'react';
import Button from '@components/molecules/Buttons';
import styled from 'styled-components';

const SuccessBox = ({
  title,
  btnText,
  onClick
}: {
  title: string
  btnText: string
  onClick: () => void
}) => {
  return (
    <Success>
      <SuccessTitle>{title}</SuccessTitle>

      <Button
        text={btnText}
        handleClick={onClick}
      />

      {/*
        @todo: Add button view detail category or anything
      */}
    </Success>
  );
};

export default SuccessBox;

const Success = styled.section`
  height: 270px;
  text-align: center;
  padding: 80px 0 45px;
`;

const SuccessTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary1};
`;
