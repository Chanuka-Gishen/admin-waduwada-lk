import axios from 'axios';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useMerchant = () => {
  const sourceToken = axios.CancelToken.source();

  const [merchants, setMerchants] = useState([]);
  const [merchantCount, setMerchantCount] = useState(0);

  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);
  const [isLoadingMerchantRegister, setIsLoadingMerchantRegister] = useState(false);
  const [isLoadingMerchantUpdate, setIsLoadingMerchantUpdate] = useState(false);

  const fetchMerchants = async (params) => {
    setIsLoadingMerchants(true);

    await backendAuthApi({
      url: BACKEND_API.MERCHANTS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setMerchants(res.data.responseData.data);
          setMerchantCount(res.data.responseData.count);
        }

        setIsLoadingMerchants(false);
      })
      .catch(() => {
        setIsLoadingMerchants(false);
      });
  };

  const registerMerchant = async (data) => {
    let isSuccess = false;

    setIsLoadingMerchantRegister(true);

    await backendAuthApi({
      url: BACKEND_API.MERCHANT_REGISTER,
      method: 'POST',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingMerchantRegister(false);
      })
      .catch(() => {
        setIsLoadingMerchantRegister(false);
      });

    return isSuccess;
  };

  const updateMerchant = async (data) => {
    let isSuccess = false;

    setIsLoadingMerchantUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.MERCHANT_UPDATE,
      method: 'PUT',
      cancelToken: sourceToken.token,
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingMerchantUpdate(false);
      })
      .catch(() => {
        setIsLoadingMerchantUpdate(false);
      });

    return isSuccess;
  };

  return {
    merchants,
    merchantCount,
    isLoadingMerchants,
    isLoadingMerchantRegister,
    isLoadingMerchantUpdate,
    fetchMerchants,
    registerMerchant,
    updateMerchant,
  };
};

export default useMerchant;
