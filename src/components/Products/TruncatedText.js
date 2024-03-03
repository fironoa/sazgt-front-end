import React, { useEffect, useRef, useState } from 'react';

const TruncatedText = ({ text, maxLength }) => {
  const [truncatedText, setTruncatedText] = useState(text);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current.offsetWidth < textRef.current.scrollWidth) {
      let truncated = text.slice(0, maxLength);
      setTruncatedText(truncated + '...');
    }
  }, [text, maxLength]);

  return <h4 ref={textRef}>{truncatedText}</h4>;
};

export default TruncatedText;