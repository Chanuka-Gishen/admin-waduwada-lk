import { useEffect, useState } from 'react';
import { SubscriptionPlansView } from '../view/subscription-plans-view';
import useSubscription from 'src/hooks/use-subscription';
import {
  SUB_PLAN_DISCOUNT_TYP_FLAT,
  SUB_PLAN_DURATION_ANNUAL,
  SUB_PLAN_DURATION_MONTHLY,
} from 'src/constants/subscription-constants';
import { useRouter } from 'src/routes/hooks';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

const SubscriptionPlansController = () => {
  const router = useRouter();

  const {
    subscriptionPlans,
    isLoadingSubscriptionPlans,
    isLoadingSubscriptionPlanCreate,
    isLoadingSubscriptionPlanUpdate,
    fetchSubscriptionPlans,
    createSubscriptionPlan,
    updateSubscriptionPlan,
  } = useSubscription();

  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState(null);
  const [initialValues, setInitialValues] = useState({
    subPlanName: '',
    subPlanDescription: '',
    subPlanPricing: [
      {
        duration: SUB_PLAN_DURATION_MONTHLY,
        price: 0,
        isDiscountActive: false,
        discountAmount: 0,
        discountType: SUB_PLAN_DISCOUNT_TYP_FLAT,
        discountStartDate: null,
        discountEndDate: null,
      },
      {
        duration: SUB_PLAN_DURATION_ANNUAL,
        price: 0,
        isDiscountActive: false,
        discountAmount: 0,
        discountType: SUB_PLAN_DISCOUNT_TYP_FLAT,
        discountStartDate: null,
        discountEndDate: null,
      },
    ],
    currency: 'LKR',
    features: [],
    isActive: true,
    sortOrder: 0,
  });

  const [isOpenAddSubscriptionPlan, setIsOpenAddSubscriptionPlan] = useState(false);
  const [isOpenUpdateSubscriptionPlan, setIsOpenUpdateSubscriptionPlan] = useState(false);

  const handleOnClickRow = (id) => {
    router.push(NAVIGATION_ROUTES.subscription_plans.plan.id + id);
  };

  const handleToggleAddSubscriptionPlan = () => {
    setIsOpenAddSubscriptionPlan(!isOpenAddSubscriptionPlan);
  };

  const handleToggleUpdateSubscriptionPlan = (record = null) => {
    if (!isOpenUpdateSubscriptionPlan && !record) return;

    if (!isOpenUpdateSubscriptionPlan) {
      setInitialValues({
        subPlanName: record.subPlanName,
        subPlanDescription: record.subPlanDescription,
        subPlanPricing: record.subPlanPricing,
        currency: record.currency,
        features: record.features,
        isActive: record.isActive,
        sortOrder: record.sortOrder,
      });

      setSelectedSubscriptionPlan(record);
    } else {
      setInitialValues({
        subPlanName: '',
        subPlanDescription: '',
        subPlanPricing: [
          {
            duration: SUB_PLAN_DURATION_MONTHLY,
            price: 0,
            isDiscountActive: false,
            discountAmount: 0,
            discountType: 'flat',
            discountStartDate: null,
            discountEndDate: null,
          },
          {
            duration: SUB_PLAN_DURATION_ANNUAL,
            price: 0,
            isDiscountActive: false,
            discountAmount: 0,
            discountType: 'flat',
            discountStartDate: null,
            discountEndDate: null,
          },
        ],
        currency: 'LKR',
        features: [],
        isActive: true,
        sortOrder: 0,
      });
    }

    setIsOpenUpdateSubscriptionPlan(!isOpenUpdateSubscriptionPlan);
  };

  const handleAddSubscriptionPlan = async (values, resetForm) => {
    const result = await createSubscriptionPlan(values);

    if (result) {
      handleToggleAddSubscriptionPlan();
      resetForm();
      await fetchSubscriptionPlans();
    }
  };

  const handleUpdateSubscriptionPlan = async (values, resetForm) => {
    if (!selectedSubscriptionPlan) return;

    const data = {
      id: selectedSubscriptionPlan._id,
      ...values,
    };

    const result = await updateSubscriptionPlan(data);

    if (result) {
      handleToggleUpdateSubscriptionPlan();
      resetForm();
      await fetchSubscriptionPlans();
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  return (
    <SubscriptionPlansView
      initialValues={initialValues}
      subscriptionPlans={subscriptionPlans}
      selectedSubscriptionPlan={selectedSubscriptionPlan}
      isOpenAddSubscriptionPlan={isOpenAddSubscriptionPlan}
      isOpenUpdateSubscriptionPlan={isOpenUpdateSubscriptionPlan}
      isLoadingSubscriptionPlans={isLoadingSubscriptionPlans}
      isLoadingSubscriptionPlanCreate={isLoadingSubscriptionPlanCreate}
      isLoadingSubscriptionPlanUpdate={isLoadingSubscriptionPlanUpdate}
      handleOnClickRow={handleOnClickRow}
      handleToggleAddSubscriptionPlan={handleToggleAddSubscriptionPlan}
      handleToggleUpdateSubscriptionPlan={handleToggleUpdateSubscriptionPlan}
      handleAddSubscriptionPlan={handleAddSubscriptionPlan}
      handleUpdateSubscriptionPlan={handleUpdateSubscriptionPlan}
    />
  );
};

export default SubscriptionPlansController;
