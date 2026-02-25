import { useState } from 'react';
import axios from 'axios';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';

const useShop = () => {
  const sourceToken = axios.CancelToken.source();

  const [shops, setShops] = useState([]);
  const [shopsCount, setShopsCount] = useState(0);

  const [isLoadingShops, setIsLoadingShops] = useState(true);

  const fetchShops = async (params) => {
    await backendAuthApi({
      url: BACKEND_API.SHOPS,
      method: 'GET',
      cancelToken: sourceToken.token,
      params,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setShops(res.data.responseData.data.length > 0 ? res.data.responseData.data : []);
          setShopsCount(res.data.responseData.count);
        }

        setIsLoadingShops(false);
      })
      .catch(() => {
        setIsLoadingShops(false);
      });
  };

  return { shops, shopsCount, isLoadingShops, fetchShops };
};

export default useShop;
