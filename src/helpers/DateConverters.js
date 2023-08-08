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
