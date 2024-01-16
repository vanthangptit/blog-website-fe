import React from 'react';
import DOMPurify from 'dompurify';

const EscapeHTML = ({ htmlString, Element }: { htmlString: string; Element?: any }) => {
  const cleanedHTML = DOMPurify.sanitize(htmlString);

  return Element
    ? <Element dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
    : <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />;
};

export default EscapeHTML;
