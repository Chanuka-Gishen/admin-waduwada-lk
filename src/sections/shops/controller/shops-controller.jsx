import { useEffect, useState } from 'react';
import usePagination from 'src/hooks/use-pagination';
import { ShopsView } from '../view/shops-view';
import useMerchant from 'src/hooks/use-merchant';
import useSubscription from 'src/hooks/use-subscription';
import useShop from 'src/hooks/use-shop';

const ShopsController = () => {
  const tableColumns = [
    'Shop',
    'Type',
    'Subscription',
    'Custom Orders',
    'Established Year',
    'BR Number',
    'Status',
    'Created At',
    'Last Updated At',
  ];

  const { isLoadingMerchantRegister, registerMerchant } = useMerchant();
  const { shops, shopsCount, isLoadingShops, fetchShops } = useShop();
  const { subscriptionOptions, isLoadingSubscriptionOptions, fetchSubscriptionPlanOptions } =
    useSubscription();

  const pagination = usePagination();

  const [searchParams, setSearchParams] = useState({ name: '' });

  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  const queryParams = { ...pagination.params, ...searchParams };

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
      fetchShops(queryParams);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlanOptions();
  }, []);

  useEffect(() => {
    fetchShops(queryParams);
  }, [pagination.limit, pagination.page, searchParams.name]);

  return (
    <ShopsView
      tableColumns={tableColumns}
      shops={shops}
      shopsCount={shopsCount}
      searchParams={searchParams}
      pagination={pagination}
      subscriptionOptions={subscriptionOptions}
      isOpenRegisterForm={isOpenRegisterForm}
      isLoadingShops={isLoadingShops}
      isLoadingSubscriptionOptions={isLoadingSubscriptionOptions}
      isLoadingMerchantRegister={isLoadingMerchantRegister}
      handleToggleRegisterForm={handleToggleRegisterForm}
      handleChangeSearch={handleChangeSearch}
      handleRegisterMerchant={handleRegisterMerchant}
    />
  );
};

export default ShopsController;
