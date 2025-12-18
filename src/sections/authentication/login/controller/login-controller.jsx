import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { LoginView } from '../view/login-view';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { useRouter } from 'src/routes/hooks';

import useAuthStore from 'src/store/auth-store';
import { loginSchema } from 'src/schema';
import useAuth from 'src/hooks/use-auth';

//-------------------------------------------------------

const LoginController = () => {
  const router = useRouter();
  const { loginUser } = useAuthStore.getState();

  const { isLoadingVerifyEmail, isLoadingLogin, verifyUserEmailController, loginController } =
    useAuth();

  const { saveUserData } = useAuthStore.getState();

  const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);
  const [isUserFirstLogin, setIsUserFirstLogin] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleVerifyUserLogin = async () => {
    const user = await verifyUserEmailController(formik.values.email);

    setIsUserEmailVerified(user ? true : false);
    setIsUserFirstLogin(user ? user.isAdminFirstLogin : false);

    if (user && user.isAdminFirstLogin) {
      saveUserData(user);
      router.push(NAVIGATION_ROUTES.set_password);
    }
  };

  const handleLogin = async (data) => {
    const response = await loginController(data);

    if (response) {
      loginUser(response);
      router.push(NAVIGATION_ROUTES.dashboard.base);
    }
  };

  return (
    <LoginView
      formik={formik}
      isUserEmailVerified={isUserEmailVerified}
      isUserFirstLogin={isUserFirstLogin}
      isLoadingVerifyEmail={isLoadingVerifyEmail}
      isLoadingLogin={isLoadingLogin}
      handleVerifyUserLogin={handleVerifyUserLogin}
    />
  );
};

export default LoginController;
