import React from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';

const DivEscapeHTML = ({ htmlString }: { htmlString: string; }) => {
  const cleanedHTML = DOMPurify.sanitize(htmlString);

  return <Box dangerouslySetInnerHTML={{ __html: cleanedHTML }} />;
};

export default DivEscapeHTML;

const Box = styled.div`
  color: ${({ theme }) => theme.text1};
  font-family: ${({ theme }) => theme.fontRobotoLight};
`;
