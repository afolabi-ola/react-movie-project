export const getYearRange = (firstAirDate, lastAirDate) => {
  const firstYear = firstAirDate?.slice(0, 4);
  const lastYear = lastAirDate?.slice(0, 4);

  if (!firstYear) return 'Year unknown';
  if (!lastYear || firstYear === lastYear) return firstYear;

  return `${firstYear} - ${lastYear}`;
};

export const formatDate = (date) => {
  if (!date) return 'Not announced';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};
