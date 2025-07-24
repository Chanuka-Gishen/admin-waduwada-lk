// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + '/authentication/noAuth/admin-login',
  LOGOUT: IP_URL + '/authentication/auth/admin-logout',

  USER_EMAIL_VALIDATE: IP_URL + '/admin/noAuth/verify-email',
  USER_RESET_PWD: IP_URL + '/admin/noAuth/reset-pwd',
  USER_REGISTER: IP_URL + '/user/supAuth/create',
  USERS: IP_URL + '/user/auth/all',
  USER_UPDATE: IP_URL + '/user/supAuth/update',
  USER_ACTIVITIES: IP_URL + '/user/supAuth/get-activities',
};
