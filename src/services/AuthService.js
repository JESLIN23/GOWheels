import BackendService from './BackendService';
import { HEADERS, STORAGE_KEYS } from '../const';
import ApiHelper from '../helpers/ApiHelper';

async function login(credentials) {
  const url = '/auth/login/';
  let data = { ...credentials };
  if (localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) {
    data.refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
  console.log(data);
  const resp = await ApiHelper.request({
    url,
    method: 'POST',
    data,
  });

  if (!resp.accessToken) {
    return new Error('Failed generate auth token from server');
  }
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, resp?.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, resp?.refreshToken);

  return resp?.user;
}

async function signup(data) {
  const resp = await BackendService.postData('/auth/signup', data);
  if (!resp.accessToken) {
    return new Error('Failed generate auth token from server');
  }
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, resp.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, resp.refreshToken);

  return resp?.user;
}

async function logout() {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.clear();

  if (!token) return;
  try {
    return BackendService.destroy(
      '/auth/logout',
      { refreshToken },
      {
        [HEADERS.AUTH]: `Bearer ${token}`,
      },
    );
  } catch (error) {
    console.error(error);
  }
}

async function userProfile() {
  const url = '/auth/user-profile';
  return ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  });
}

const AuthService = {
  login,
  logout,
  signup,
  userProfile,
};

export default AuthService;
