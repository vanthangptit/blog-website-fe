export const AWS_S3_URL_BLOG = process.env.REACT_APP_AWS_S3_URL_BLOG;

export const VISIBILITY = [
  'Private',
  'Publish'
].map((label) => ({ label, value: `${label}`.toLowerCase() }));
