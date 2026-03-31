import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubscriptionPlanView } from '../view/subscription-plan-view';
import useSubscription from 'src/hooks/use-subscription';

import { useRouter } from 'src/routes/hooks';

const SubscriptionPlanController = () => {
  const { id } = useParams();

  const router = useRouter();

  const {
    subscriptionPlan,
    isLoadingSubscriptionplan,
    isLoadingSubscriptionPlanUpdate,
    isLoadingSubscriptionPlanPricingUpdate,
    isLoadingSubscriptionPlanFeatureCreate,
    isLoadingSubscriptionPlanFeatureUpdate,
    isLoadingSubscriptionPlanFeatureDelete,
    fetchSubscriptionplan,
    updateSubscriptionPlan,
    updateSubscriptionPlanPricing,
    updateSubscriptionPlanFeature,
    createSubscriptionPlanFeature,
    deleteSubscriptionPlanFeature,
  } = useSubscription();

  const featureInitialValue = { feature: '' };

  const [selectedFeature, setSelectedFeature] = useState(null);

  const [planInitialValues, setPlanInitialValues] = useState({});
  const [pricingInitialValues, setPricingInitialValues] = useState({});
  const [featureInitialValues, setFeatureInitialValues] = useState(featureInitialValue);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenUpdatePricing, setIsOpenUpdatePricing] = useState(false);
  const [isOpenAddFeature, setIsOpenAddFeature] = useState(false);
  const [isOpenUpdateFeature, setIsOpenUpdateFeature] = useState(false);
  const [isOpenDeleteFeature, setIsOpenDeleteFeature] = useState(false);

  const onBack = () => {
    router.back();
  };

  const handleToggleUpdateDialog = () => {
    if (!isOpenUpdate) {
      setPlanInitialValues({
        id: subscriptionPlan.id,
        name: subscriptionPlan.name,
        description: subscriptionPlan.description,
        currency: subscriptionPlan.currency,
        is_active: subscriptionPlan.is_active,
        sort_order: subscriptionPlan.sort_order,
      });
    } else {
      setPlanInitialValues({});
    }

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleToggleUpdatePricingDialog = (data = null) => {
    if (!isOpenUpdatePricing && !data) return;

    if (!isOpenUpdatePricing) {
      setPricingInitialValues({
        duration: data.duration,
        price: data.price,
        isDiscountActive: data.isDiscountActive,
        discountAmount: data.discountAmount,
        discountType: data.discountType,
        discountStartDate: data.discountStartDate,
        discountEndDate: data.discountEndDate,
      });
    } else {
      setPricingInitialValues({});
    }

    setIsOpenUpdatePricing(!isOpenUpdatePricing);
  };

  const handleToggleAddFeatureDialog = () => {
    setFeatureInitialValues(featureInitialValue);

    setIsOpenAddFeature(!isOpenAddFeature);
  };

  const handleToggleUpdateFeatureDialog = (data = {}) => {
    if (!isOpenUpdateFeature && !data) return;

    if (!isOpenUpdateFeature) {
      setFeatureInitialValues({
        id: data.id,
        feature: data.feature,
      });
    } else {
      setFeatureInitialValues({});
    }

    setIsOpenUpdateFeature(!isOpenUpdateFeature);
  };

  const handleToggleDeleteFeature = (row = null) => {
    if (!isOpenDeleteFeature && !row) return;

    setSelectedFeature(row);

    setIsOpenDeleteFeature(!isOpenDeleteFeature);
  };

  const handleUpdate = async (values) => {
    const result = await updateSubscriptionPlan(values);

    if (result) {
      handleToggleUpdateDialog();
      fetchSubscriptionplan(id);
    }
  };

  const handleUpdatePricing = async (values) => {
    const result = await updateSubscriptionPlanPricing(values);

    if (result) {
      handleToggleUpdatePricingDialog();
      fetchSubscriptionplan(id);
    }
  };

  const handleAddFeature = async (values) => {
    const result = await createSubscriptionPlanFeature(id, values);

    if (result) {
      handleToggleAddFeatureDialog();
      fetchSubscriptionplan(id);
    }
  };

  const handleUpdateFeature = async (values) => {
    const result = await updateSubscriptionPlanFeature(values);

    if (result) {
      handleToggleUpdateFeatureDialog();
      fetchSubscriptionplan(id);
    }
  };

  const handleDeleteFeature = async () => {
    if (!selectedFeature) return;

    const result = await deleteSubscriptionPlanFeature(selectedFeature.id);

    if (result) {
      handleToggleDeleteFeature();
      fetchSubscriptionplan(id);
    }
  };

  useEffect(() => {
    fetchSubscriptionplan(id);
  }, []);

  return (
    <SubscriptionPlanView
      plan={subscriptionPlan}
      planInitialValues={planInitialValues}
      pricingInitialValues={pricingInitialValues}
      featureInitialValues={featureInitialValues}
      isOpenUpdate={isOpenUpdate}
      isOpenUpdatePricing={isOpenUpdatePricing}
      isOpenAddFeature={isOpenAddFeature}
      isOpenUpdateFeature={isOpenUpdateFeature}
      isOpenDeleteFeature={isOpenDeleteFeature}
      isLoading={isLoadingSubscriptionplan}
      isLoadingSubscriptionPlanUpdate={isLoadingSubscriptionPlanUpdate}
      isLoadingSubscriptionPlanPricingUpdate={isLoadingSubscriptionPlanPricingUpdate}
      isLoadingSubscriptionPlanFeatureCreate={isLoadingSubscriptionPlanFeatureCreate}
      isLoadingSubscriptionPlanFeatureUpdate={isLoadingSubscriptionPlanFeatureUpdate}
      isLoadingSubscriptionPlanFeatureDelete={isLoadingSubscriptionPlanFeatureDelete}
      onBack={onBack}
      handleToggleUpdateDialog={handleToggleUpdateDialog}
      handleToggleUpdatePricingDialog={handleToggleUpdatePricingDialog}
      handleToggleAddFeatureDialog={handleToggleAddFeatureDialog}
      handleToggleUpdateFeatureDialog={handleToggleUpdateFeatureDialog}
      handleToggleDeleteFeature={handleToggleDeleteFeature}
      handleUpdate={handleUpdate}
      handleUpdatePricing={handleUpdatePricing}
      handleAddFeature={handleAddFeature}
      handleUpdateFeature={handleUpdateFeature}
      handleDeleteFeature={handleDeleteFeature}
    />
  );
};

export default SubscriptionPlanController;
