import React from 'react';
import styled from 'styled-components';
import EscapeHTML from '@components/atoms/EscapeHTML/DivEscapeHTML';

const SectionTitle = ({
  title,
  des
}: {
  title: string,
  des?: string
}) => {
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

const Heading = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.primary1};
  font-family: ${({ theme }) => theme.fontMuktaMalarExtraBold};
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const Desc = styled(EscapeHTML)`
  font-size: 20px;
  color: ${({ theme }) => theme.primary1};
`;
