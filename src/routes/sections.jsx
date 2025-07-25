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
  const { auth } = useAuthStore();
  
  const routes = useRoutes(
    useMemo(() => {
      const isAuthenticated = auth.isLoggedIn && !auth.user.isUserFirstLogin;
      
      return [
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
          ],
        },
        ...PublicRoutes,
      ];
    }, [auth.isLoggedIn, auth.user.isUserFirstLogin])
  );

  return routes;
};

export default Router;
