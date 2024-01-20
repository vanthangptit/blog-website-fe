export const GENDER = [
  'Female',
  'Male',
  'Other'
].map((label) => ({ label, value: `${label}`.toLowerCase() }));

export const VISIBILITY = [
  'Private',
  'Publish'
].map((label) => ({ label, value: `${label}`.toLowerCase() }));