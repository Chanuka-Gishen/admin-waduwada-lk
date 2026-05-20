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
  MERCHANT_UPDATE: IP_URL + '/merchant/auth/update',

  SUBSCRIPTION_CREATE: IP_URL + '/subscription/supAuth/add',
  SUBSCRIPTION_UPDATE: IP_URL + '/subscription/supAuth/update',
  SUBSCRIPTION_FEATURE_ADD: IP_URL + '/subscription/supAuth/feature-add',
  SUBSCRIPTION_FEATURE_UPDATE: IP_URL + '/subscription/supAuth/feature-update',
  SUBSCRIPTION_FEATURE_DELETE: IP_URL + '/subscription/supAuth/feature-delete',
  SUBSCRIPTION_PRICING_UPDATE: IP_URL + '/subscription/supAuth/pricing-update',
  SUBSCRIPTION: IP_URL + '/subscription/auth/',
  SUBSCRIPTIONS: IP_URL + '/subscription/noAuth/list',
  SUBSCRIPTION_OPTIONS: IP_URL + '/subscription/supAuth/options',
  SUBSCRIPTION_PLAN: IP_URL + '/subscription/auth/',

  SHOPS: IP_URL + '/shops/noAuth',

  CATEGORIES: IP_URL + '/category/noAuth/',
  CATEGORY_CREATE: IP_URL + '/category/supAuth',
  CATEGORY_UPDATE: IP_URL + '/category/supAuth',
  CATEGORY_OPTIONS: IP_URL + '/category/auth/options',
};
