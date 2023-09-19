import ApiHelper from '../helpers/ApiHelper';

const getCheckoutSession = async (car, data) => {
  const url = `/order/checkout-session/${car?.id}`;
  const response = await ApiHelper.request({
    url,
    method: 'POST',
    data,
    requireAuth: true,
  });
  return response;
};

const getBookings = async () => {
  const url = '/my-orders/'
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  })
  return response;
}

const BookingServices = {
  getCheckoutSession,
  getBookings, 
};

export default BookingServices;
