import React from 'react';
import DOMPurify from 'dompurify';

const ParagraphEscapeHTML = ({ htmlString }: { htmlString: string; }) => {
  const cleanedHTML = DOMPurify.sanitize(htmlString);

  return <p dangerouslySetInnerHTML={{ __html: cleanedHTML }} />;
};

export default ParagraphEscapeHTML;
