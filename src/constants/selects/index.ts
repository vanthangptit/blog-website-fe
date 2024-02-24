export const GENDER = [
  'Other',
  'Female',
  'Male'
].map((label) => ({ label, value: `${label}`.toLowerCase() }));

export const VISIBILITY = [
  'Private',
  'Publish'
].map((label) => ({ label, value: `${label}`.toLowerCase() }));
