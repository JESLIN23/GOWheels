const calculatedBookingPrice = (price, pickupTime, dropoffTime) => {
  const pickupDate = new Date(pickupTime);
  const dropoffDate = new Date(dropoffTime);

  const timeDifferenceMs = Math.abs(dropoffDate - pickupDate);
  const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const duration = `${days}.${hours}`;

  return Math.floor(duration * price);
};

const CalculatePrice = {
  calculatedBookingPrice,
};
export default CalculatePrice;
