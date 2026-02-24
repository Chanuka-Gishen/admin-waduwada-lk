import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { ShopsView } from '../view/shops-view';
import useMerchant from 'src/hooks/use-merchant';
import useSubscription from 'src/hooks/use-subscription';

const ShopsController = () => {
  const tableColumns = [
    'Shop',
    'Type',
    'Custom Orders',
    'Established Year',
    'BR Number',
    'Specialities',
    'Subscription',
  ];

  const { isLoadingMerchantRegister, registerMerchant } = useMerchant();

  const { subscriptionOptions, isLoadingSubscriptionOptions, fetchSubscriptionPlanOptions } =
    useSubscription();

  const pagination = usePagination();

  const [searchParams, setSearchParams] = useState({ name: '' });

  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  const handleChangeSearch = (e) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleRegisterForm = () => {
    setIsOpenRegisterForm(!isOpenRegisterForm);
  };

  const handleRegisterMerchant = async (values, resetForm) => {
    const result = await registerMerchant(values);

    if (result) {
      handleToggleRegisterForm();
      resetForm();
    }
  };

  useEffect(() => {
    fetchSubscriptionPlanOptions();
  }, []);

  return (
    <ShopsView
      tableColumns={tableColumns}
      searchParams={searchParams}
      pagination={pagination}
      subscriptionOptions={subscriptionOptions}
      isOpenRegisterForm={isOpenRegisterForm}
      isLoadingSubscriptionOptions={isLoadingSubscriptionOptions}
      isLoadingMerchantRegister={isLoadingMerchantRegister}
      handleToggleRegisterForm={handleToggleRegisterForm}
      handleChangeSearch={handleChangeSearch}
      handleRegisterMerchant={handleRegisterMerchant}
    />
  );
};

export default ShopsController;
