import React from 'react';
import DOMPurify from 'dompurify';

const DivEscapeHTML = ({ htmlString }: { htmlString: string; }) => {
  const cleanedHTML = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />;
};

export default DivEscapeHTML;
