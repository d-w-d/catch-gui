export const julianIntToDate = (n: number) => {
  const millis = (n - 2440587.5) * 86400000;
  const dateLocal = new Date(millis);
  return dateLocal.toUTCString();
};
