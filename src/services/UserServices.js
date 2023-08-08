import ApiHelper from '../helpers/ApiHelper';

const updateUser = async (data) => {
  const url = `/user/updateMe`;
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
  const url = `/user/${userId}/avatar`;
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
  const url = `/user/${userId}/licence-front`;
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
  const url = `/user/${userId}/licence-back`;
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
