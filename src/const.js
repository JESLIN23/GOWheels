// export const BACKEND_URL = 'http://localhost:6060/api/v1';
export const BACKEND_URL = 'https://api-gowheels.cyclic.cloud/api/v1';


export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/signup',
  FORGOTPASSWORD: '/forgotpassword',
  LOGOUT: '/logout',

  SEARCH: '/search',
  HOME: '/home',
  PROFILE: '/profile',
  TERMS_CONDETIONS: '/terms_&_condetions',
  PRIVACY_POLICY: '/privacy_policy',
  FAQ: '/faq',
  CONTACTUS: '/contactus',
  ABOUTUS: '/about',
  OFFERS: '/offers',
  CHECKOUT: '/checkout',
  BOOKINGS: '/booking',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'gowheels-auth-accesstoken',
  REFRESH_TOKEN: 'gowheels-auth-refreshtoken',
  USER_ID: 'gowheels-auth-user-id',
  FIRST_NAME: 'gowheels-first-name',
  SECOND_NAME: 'gowheels-second-name',
  CAR_FILTER_DATA: 'gowheels-car-filter-data',
  SELECTED_CAR: 'gowheels-selected-car',
};

export const HEADERS = {
  AUTH: 'authorization',
};

export const DEFAULT_ERROR_MESSAGE =
  'Oops, Something went wrong. If this persists, please contact us.';
