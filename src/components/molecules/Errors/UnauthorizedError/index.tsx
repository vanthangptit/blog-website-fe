import React, { useContext } from 'react';
import Button from '@components/molecules/Buttons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/molecules/Modal';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';

const UnauthorizedError = () => {
  const { unauthorized } = useContext(UnauthorizedContext);
  const navigate = useNavigate();
  const onClick = () => navigate('/login');

  return (
    <Modal
      isIconClose={false}
      modalIsOpen={!!unauthorized}
      shouldCloseOnOverlayClick={false}
      styles={{ content: { maxWidth: '635px' } }}
    >
      <Unauthorized>
        <UnauthorizedName>HEY!</UnauthorizedName>

        <Hgroup>
          <Heading>The authentication session has expired!</Heading>
          <Description>Please login to continue using our platform features</Description>
        </Hgroup>

        <Button
          buttonType={'button'}
          text={'Login'}
          handleClick={onClick}
        />
      </Unauthorized>
    </Modal>
  );
};

export default UnauthorizedError;

const Unauthorized = styled.article`
  text-align: center;
`;

const Hgroup = styled.hgroup`
  margin-bottom: 25px;
`;

const Heading = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.primary1};
  
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(24px + (28 - 24) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.primary1};

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const UnauthorizedName = styled.strong`
  font-family: ${({ theme }) => theme.fontRobotoBold};
  margin-bottom: 5px;
  color: ${({ theme }) => theme.primary1};
  font-size: 80px;
  text-align: center;
  text-transform: uppercase;
  
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(55px + (80 - 55) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 44px;
  }
`;
