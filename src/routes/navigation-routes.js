export const NAVIGATION_ROUTES = {
  // authentication routes
  login: '/login',
  set_password: '/set-password',
  register: 'register',

  // not found
  not_found: '404',
  all_path: '*',

  // main routes
  dashboard: {
    base: '/dashboard',
    main: '',
  },
  categories: {
    base: '/categories',
  },
  shops: {
    base: '/shops',
  },
  merchants: {
    base: '/merchants',
  },
  subscription_plans: {
    base: '/subscription_plans',
    plan: {
      base: '/subscription_plans/:id',
      id: '/subscription_plans/',
    },
  },
  admins: {
    base: '/administration',
  },
};
