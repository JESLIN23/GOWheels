import ApiHelper from '../helpers/ApiHelper';

const updateUser = async (data) => {
  const url = `/users/updateMe`;
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    data,
    requireAuth: true,
  });

  const res = response?.data?.user;
  return res;
};

const addUserImage = async (userId, file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const url = `/users/${userId}/avatar`;
  await ApiHelper.request({
    url,
    method: 'PATCH',
    data: formData,
    requireAuth: true,
  });
};

const addDrivingLicenceFront = async (userId, file) => {
  const formData = new FormData();
  formData.append('licence', file);
  const url = `/users/${userId}/licence-front`;
  await ApiHelper.request({
    url,
    method: 'PATCH',
    data: formData,
    requireAuth: true,
  });
};

const addDrivingLicenceBack = async (userId, file) => {
  const formData = new FormData();
  formData.append('licence', file);
  const url = `/users/${userId}/licence-back`;
  await ApiHelper.request({
    url,
    method: 'PATCH',
    data: formData,
    requireAuth: true,
  });
};

const UserServices = {
  updateUser,
  addUserImage,
  addDrivingLicenceFront,
  addDrivingLicenceBack,
};

export default UserServices;
