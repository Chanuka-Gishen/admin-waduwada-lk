import axios from 'axios';
import { useState } from 'react';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import responseUtil from 'src/utils/responseUtil';

const useSubscription = () => {
  const sourceToken = axios.CancelToken.source();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);

  const [isLoadingSubscriptionplan, setIsLoadingSubscriptionPlan] = useState(true);
  const [isLoadingSubscriptionPlans, setIsLoadingSubscriptionPlans] = useState(true);
  const [isLoadingSubscriptionOptions, setIsLoadingSubscriptionOptions] = useState(true);
  const [isLoadingSubscriptionPlanCreate, setIsLoadingSubscriptionPlanCreate] = useState(false);
  const [isLoadingSubscriptionPlanUpdate, setIsLoadingSubscriptionPlanUpdate] = useState(false);
  const [isLoadingSubscriptionPlanFeatureCreate, setIsLoadingSubscriptionPlanFeatureCreate] =
    useState(false);
  const [isLoadingSubscriptionPlanFeatureUpdate, setIsLoadingSubscriptionPlanFeatureUpdate] =
    useState(false);
  const [isLoadingSubscriptionPlanFeatureDelete, setIsLoadingSubscriptionPlanFeatureDelete] =
    useState(false);
  const [isLoadingSubscriptionPlanPricingUpdate, setIsLoadingSubscriptionPlanPricingUpdate] =
    useState(false);

  const fetchSubscriptionplan = async (id) => {
    setIsLoadingSubscriptionPlan(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION,
      method: 'GET',
      cancelToken: sourceToken.token,
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setSubscriptionPlan(res.data.responseData);
        }

        setIsLoadingSubscriptionPlan(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlan(false);
      });
  };

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

  const createSubscriptionPlanFeature = async (planId, data) => {
    if (isLoadingSubscriptionPlanFeatureCreate) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanFeatureCreate(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_FEATURE_ADD,
      method: 'POST',
      params: { id: planId },
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanFeatureCreate(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanFeatureCreate(false);
      });

    return isSuccess;
  };

  const updateSubscriptionPlanFeature = async (data) => {
    if (isLoadingSubscriptionPlanFeatureUpdate) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanFeatureUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_FEATURE_UPDATE,
      method: 'PATCH',
      params: { id: data.id },
      data: { feature: data.feature },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanFeatureUpdate(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanFeatureUpdate(false);
      });

    return isSuccess;
  };

  const deleteSubscriptionPlanFeature = async (id) => {
    if (isLoadingSubscriptionPlanFeatureDelete) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanFeatureDelete(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_FEATURE_DELETE,
      method: 'DELETE',
      params: { id },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanFeatureDelete(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanFeatureDelete(false);
      });

    return isSuccess;
  };

  const updateSubscriptionPlanPricing = async (data) => {
    if (isLoadingSubscriptionPlanPricingUpdate) return;

    let isSuccess = false;

    setIsLoadingSubscriptionPlanPricingUpdate(true);

    await backendAuthApi({
      url: BACKEND_API.SUBSCRIPTION_PRICING_UPDATE,
      method: 'PUT',
      data,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          isSuccess = true;
        }

        setIsLoadingSubscriptionPlanPricingUpdate(false);
      })
      .catch(() => {
        setIsLoadingSubscriptionPlanPricingUpdate(false);
      });

    return isSuccess;
  };

  return {
    subscriptionPlan,
    subscriptionPlans,
    subscriptionOptions,
    isLoadingSubscriptionplan,
    isLoadingSubscriptionPlans,
    isLoadingSubscriptionOptions,
    isLoadingSubscriptionPlanCreate,
    isLoadingSubscriptionPlanUpdate,
    isLoadingSubscriptionPlanFeatureCreate,
    isLoadingSubscriptionPlanFeatureUpdate,
    isLoadingSubscriptionPlanFeatureDelete,
    isLoadingSubscriptionPlanPricingUpdate,
    fetchSubscriptionplan,
    fetchSubscriptionPlans,
    fetchSubscriptionPlanOptions,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    createSubscriptionPlanFeature,
    updateSubscriptionPlanFeature,
    deleteSubscriptionPlanFeature,
    updateSubscriptionPlanPricing,
  };
};

export default useSubscription;
