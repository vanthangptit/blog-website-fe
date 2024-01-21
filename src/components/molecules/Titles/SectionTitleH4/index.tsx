import React from 'react';
import styled from 'styled-components';
import ParagraphEscapeHTML from '@components/atoms/EscapeHTML/ParagraphEscapeHTML';

const SectionTitleH4 = ({
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
        <ParagraphEscapeHTML htmlString={des} />
      )}
    </Hgroup>
  );
};

export default SectionTitleH4;

const Hgroup = styled.hgroup`
  margin: 0 0 15px;
  p {
    font-size: 13px;
    color: ${({ theme }) => theme.text5};
  }
`;

const Heading = styled.h4`
  font-size: 14px;
  color: ${({ theme }) => theme.text4};
  font-family: ${({ theme }) => theme.fontMuktaMalarExtraBold};
  line-height: 1.3;
`;
