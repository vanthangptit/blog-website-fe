import React from 'react';
import styled from 'styled-components';

const SingleTitle = ({ title }: { title: string }) => {
  return <Title>{title}</Title>;
};

export default SingleTitle;

const Title = styled.h2`
  font-size: 26px;
  margin: 15px 0;
  color: ${({ theme }) => theme.primary1};

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(20px + (26 - 20) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;
