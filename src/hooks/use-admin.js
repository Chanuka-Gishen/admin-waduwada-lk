import axios from 'axios';
import { useRef, useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useAuthStore from 'src/store/auth-store';
import responseUtil from 'src/utils/responseUtil';

const useAdmin = () => {
  const router = useRouter();

  const sourceToken = useRef(axios.CancelToken.source()).current;

  const { logoutUser } = useAuthStore();

  const [admins, setAdmins] = useState([]);

  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const [isLoadingAdminRegister, setIsLoadingAdminRegister] = useState(false);
  const [isLoadingAdminUpdate, setIsLoadingAdminUpdate] = useState(false);
  const [isLoadingAdminChangePwd, setIsLoadingAdminChangePwd] = useState(false);

  const fetchAdmins = async () => {
    setIsLoadingAdmins(true);

    await backendAuthApi({
      url: BACKEND_API.USERS,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setAdmins(res.data.responseData);
        }

        setIsLoadingAdmins(false);
      })
      .catch(() => {
        setIsLoadingAdmins(false);
      });
  };

  const registerAdmin = async (data) => {
    let isSuccess = false;

    setIsLoadingAdminRegister(true);

    try {
      const res = await backendAuthApi({
        url: BACKEND_API.USER_REGISTER,
        method: 'POST',
        cancelToken: sourceToken.token,
        data,
      });

      if (responseUtil.isResponseSuccess(res.data.responseCode)) {
        isSuccess = true;

        await fetchAdmins();
      }
    } catch (error) {
      setIsLoadingAdminRegister(false);
    } finally {
      setIsLoadingAdminRegister(false);
    }

    return isSuccess;
  };

  const updateAdmin = async (data) => {
    let isSuccess = false;

    setIsLoadingAdminUpdate(true);

    try {
      const res = await backendAuthApi({
        url: BACKEND_API.USER_UPDATE,
        method: 'PUT',
        cancelToken: sourceToken.token,
        data,
      });

      if (responseUtil.isResponseSuccess(res.data.responseCode)) {
        isSuccess = true;
        await fetchAdmins();
      }
    } catch (error) {
      setIsLoadingAdminUpdate(false);
    } finally {
      setIsLoadingAdminUpdate(false);
    }

    return isSuccess;
  };

  const changePasswordAdmin = async (data) => {
    setIsLoadingAdminChangePwd(true);

    try {
      const res = await backendAuthApi({
        url: BACKEND_API.USER_CHANGE_PWD,
        method: 'PUT',
        cancelToken: sourceToken.token,
        data,
      });

      if (responseUtil.isResponseSuccess(res.data.responseCode)) {
        logoutUser();

        router.replace(NAVIGATION_ROUTES.login);

        return { success: true, data: null };
      }

      return { success: false, data: null };
    } catch (error) {
      setIsLoadingAdminChangePwd(false);
    } finally {
      setIsLoadingAdminChangePwd(false);
    }
  };

  return {
    admins,
    isLoadingAdmins,
    isLoadingAdminRegister,
    isLoadingAdminUpdate,
    isLoadingAdminChangePwd,
    fetchAdmins,
    registerAdmin,
    updateAdmin,
    changePasswordAdmin,
  };
};

export default useAdmin;
