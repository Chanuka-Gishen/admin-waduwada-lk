import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { SetPasswordView } from '../view/set-password-view';
import axios from 'axios';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import { SNACKBAR_MESSAGE, SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useAuthStore from 'src/store/auth-store';
import useAuth from 'src/hooks/use-auth';

//-------------------------------------------------------

const SetPasswordController = () => {
  const router = useRouter();

  const { isLoadingPwdReset, resetPasswordController } = useAuth();

  const { auth, loginUser } = useAuthStore.getState();

  const handleConfirm = async (values) => {
    const data = {
      id: auth.user.id,
      ...values,
    };
    const user = await resetPasswordController(data);

    if (user) {
      loginUser(user);
      router.push(NAVIGATION_ROUTES.dashboard);
    }
  };

  // useEffect(() => {
  //   if (!router) return;
  //   if (!auth.user.id && !auth.user.isAdminFirstLogin) {
  //     router.replace(NAVIGATION_ROUTES.login);
  //     return;
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.user?.id, auth.user?.isAdminFirstLogin, router]);

  return <SetPasswordView isLoading={isLoadingPwdReset} handleConfirm={handleConfirm} />;
};

export default SetPasswordController;
