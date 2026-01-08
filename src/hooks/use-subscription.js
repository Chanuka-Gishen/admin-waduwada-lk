import axios from 'axios';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useSubscription = () => {
  const sourceToken = axios.CancelToken.source();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);

  const [isLoadingSubscriptionPlans, setIsLoadingSubscriptionPlans] = useState(true);
  const [isLoadingSubscriptionOptions, setIsLoadingSubscriptionOptions] = useState(true);
  const [isLoadingSubscriptionPlanCreate, setIsLoadingSubscriptionPlanCreate] = useState(false);
  const [isLoadingSubscriptionPlanUpdate, setIsLoadingSubscriptionPlanUpdate] = useState(false);

  const fetchSubscriptionPlans = async () => {
    setIsLoadingSubscriptionPlans(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTIONS,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSubscriptionPlans(res.data.responseData);
        }

        setIsLoadingSubscriptionPlans(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlans(false);
      });
  };

  const fetchSubscriptionPlanOptions = async () => {
    setIsLoadingSubscriptionOptions(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_OPTIONS,
      method: 'GET',
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSubscriptionOptions(res.data.responseData);
        }
        setIsLoadingSubscriptionOptions(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionOptions(false);
      });
  };

  const createSubscriptionPlan = async (data) => {
    if (isLoadingSubscriptionPlanCreate) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanCreate(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_CREATE,
      method: 'POST',
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanCreate(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanCreate(false);
      });

    return isSuccess;
  };

  const updateSubscriptionPlan = async (data) => {
    if (isLoadingSubscriptionPlanUpdate) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_UPDATE,
      method: 'PUT',
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanUpdate(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanUpdate(false);
      });

    return isSuccess;
  };

  return {
    subscriptionPlans,
    subscriptionOptions,
    isLoadingSubscriptionPlans,
    isLoadingSubscriptionOptions,
    isLoadingSubscriptionPlanCreate,
    isLoadingSubscriptionPlanUpdate,
    fetchSubscriptionPlans,
    fetchSubscriptionPlanOptions,
    createSubscriptionPlan,
    updateSubscriptionPlan,
  };
};

export default useSubscription;
