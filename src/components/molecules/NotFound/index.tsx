import * as React from 'react';
import styled from 'styled-components';
import TitlePage from '@components/molecules/Titles/TitlePage';
import Button from '@components/molecules/Buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

const NotFound = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <NotFoundComponent>
      <TitlePage title={'404'} des={message} />

      <Button
        text={'Go Home Page'}
        buttonType={'submit'}
        handleClick={() => navigate('/')}
      />
    </NotFoundComponent>
  );
};

export default NotFound;

const NotFoundComponent = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 110px;
    
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: calc(70px + (110 - 70) * (100vw - 768px) / (991 - 768));
    }

    @media (max-width: 767px) {
      font-size: 70px;
    }
  }
`;
