import React from 'react';
import styled from 'styled-components';
import EscapeHTML from '@components/atoms/EscapeHTML';

const SectionTitle = ({ title, des }: { title: string, des?: string }) => {
  return (
    <Hgroup>
      <Heading>{title}</Heading>
      {des && (
        <Desc htmlString={des} />
      )}
    </Hgroup>
  );
};

export default SectionTitle;

const Hgroup = styled.hgroup`
  margin: 15px 0 20px;
`;

const Heading = styled.h1`
  font-size: 60px;
  color: ${({ theme }) => theme.primary1};
  font-family: ${({ theme }) => theme.fontMuktaMalarExtraBold};
  line-height: 1.3;

  @media (min-width: 768px) and (max-width: 991px) {
    font-size: calc(48px + (60 - 48) * (100vw - 768px) / (991 - 768));
  }

  @media (max-width: 767px) {
    font-size: 36px;
  }
`;

const Desc = styled(EscapeHTML)`
  font-size: 20px;
  color: ${({ theme }) => theme.primary1};
`;
