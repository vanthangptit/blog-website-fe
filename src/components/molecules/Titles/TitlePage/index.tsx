import React from 'react';
import styled from 'styled-components';

const TitlePage = ({ title, des }: { title: string, des?: string }) => {
  return (
    <SectionTitle>
      <Heading>{title}</Heading>
      {des && (
        <Desc>{des}</Desc>
      )}
    </SectionTitle>
  );
};

export default TitlePage;

const SectionTitle = styled.hgroup`
  margin: 20px 0 45px;
`;

const Heading = styled.h1`
  font-size: 48px;
  text-align: center;
  color: ${({ theme }) => theme.primary1};

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(32px + (48 - 32) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary1};
`;
