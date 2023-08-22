export const getBookingDateInIsoFomat = (date, time) => {
  const givenDate = new Date(date);
  const afterOneDay = new Date(givenDate);

  const timeZoneOffset = givenDate.getTimezoneOffset();
  givenDate.setMinutes(givenDate.getMinutes() + timeZoneOffset);

  afterOneDay.setDate(givenDate.getDate() + 1);
  afterOneDay.setHours(time, 0, 0, 0);

  const adjustedDate = new Date(afterOneDay.getTime() - timeZoneOffset * 60000);

  return adjustedDate.toISOString();
};

export const getIsoDateFormat = (date) => {
  const dateAsDate = new Date(date);
  const isoString = dateAsDate.toISOString();
  return isoString;
};

export const getDateWMDY = (givenDate) => {
  const date = new Date(givenDate);
  const formattedDateString = date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return formattedDateString;
};

export const getTime12H = (givenDate) => {
  const date = new Date(givenDate);
  const formattedDateString = date.getUTCHours();
  if (formattedDateString > 12) {
    return `${formattedDateString - 12}:00 PM`;
  } else {
    return `${formattedDateString}:00 AM`;
  }
};

