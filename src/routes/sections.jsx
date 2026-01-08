import { lazy, Suspense, useMemo } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useAuthStore from 'src/store/auth-store';

// --------------- Public Pages ---------------
export const LoginPage = lazy(() => import('src/pages/login'));
export const SetPasswordPage = lazy(() => import('src/pages/set-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// --------------- Auth Pages ---------------
export const IndexPage = lazy(() => import('src/pages/app'));
export const AdministrationPage = lazy(() => import('src/pages/admins'));
export const MerchantsPage = lazy(() => import('src/pages/merchants'));
export const SubscriptionPlansPage = lazy(() => import('src/pages/subscription-plans'));

// ----------------------------------------------------------------------

// Authenticated Routes
const AuthenticatedRoutes = (
  <DashboardLayout>
    <Suspense>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

// Public Routes
const PublicRoutes = [
  { path: NAVIGATION_ROUTES.login, element: <LoginPage /> },
  { path: NAVIGATION_ROUTES.set_password, element: <SetPasswordPage /> },
  { path: NAVIGATION_ROUTES.not_found, element: <Page404 /> },
  {
    path: NAVIGATION_ROUTES.all_path,
    element: <Navigate to={NAVIGATION_ROUTES.not_found} replace />,
  }, // Redirect to login if not authenticated
];

const Router = () => {
  const { auth } = useAuthStore.getState();
  const isAuthenticated = auth.isLoggedIn;

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        AuthenticatedRoutes
      ) : (
        <Navigate to={NAVIGATION_ROUTES.login} replace />
      ),
      children: [
        { path: '/', element: <Navigate to={NAVIGATION_ROUTES.dashboard.base} replace /> },
        { path: NAVIGATION_ROUTES.dashboard.base, element: <IndexPage /> },
        { path: NAVIGATION_ROUTES.merchants.base, element: <MerchantsPage /> },
        { path: NAVIGATION_ROUTES.subscription_plans.base, element: <SubscriptionPlansPage /> },
        { path: NAVIGATION_ROUTES.admins.base, element: <AdministrationPage /> },
      ],
    },
    ...PublicRoutes,
    {
      path: NAVIGATION_ROUTES.all_path,
      element: <Page404 />,
    },
  ]);

  return routes;
};

export default Router;
