export const capitalizeFirstLetter = (string?: string) => {
  const letters = string ?? '';
  if (!letters || letters.length <= 2) {
    return letters;
  }

  return letters[0].toUpperCase() + letters.slice(1);
};