// SERVER URL
const IP_URL = import.meta.env.VITE_SERVER_URL;

// URIs
export const BACKEND_API = {
  // AUTHENTICATION API'S
  LOGIN: IP_URL + '/authentication/noAuth/admin-login',
  LOGOUT: IP_URL + '/authentication/auth/admin-logout',

  USER_EMAIL_VALIDATE: IP_URL + '/admin/noAuth/verify-email',
  USER_RESET_PWD: IP_URL + '/admin/noAuth/reset-pwd',
  USER_REGISTER: IP_URL + '/admin/supAuth/register',
  USER_UPDATE: IP_URL + '/admin/supAuth/update',
  USER_CHANGE_PWD: IP_URL + '/admin/auth/change-pwd',
  USERS: IP_URL + '/admin/supAuth/list',

  MERCHANTS: IP_URL + '/merchant/auth/list',
  MERCHANT_REGISTER: IP_URL + '/merchant/auth/register',
  MERCHANT_UPDATE: IP_URL + '/merchant/auth/update'
};
