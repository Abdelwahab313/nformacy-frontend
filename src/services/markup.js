import dompurify from 'dompurify';

const createMarkup = html => {
  const sanitizer = dompurify.sanitize;
  return { __html: sanitizer(html) };
};

export default createMarkup;
