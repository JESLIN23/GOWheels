import ApiHelper from '../helpers/ApiHelper';

const getCars = async (data) => {
  const url = `/car/available-cars`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    params: data,
  });

  return response?.data;
};

const CarServices = {
  getCars,
};

export default CarServices;
