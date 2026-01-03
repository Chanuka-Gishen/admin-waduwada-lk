import { useEffect, useState } from 'react';
import { MerchantsView } from '../view/merchants-view';
import useMerchant from 'src/hooks/use-merchant';
import usePagination from 'src/hooks/use-pagination';

const MerchantsController = () => {
  const tableColumns = [
    'Name',
    'Is Verified',
    'Email',
    'Primary Mobile',
    'Secondary Mobile',
    'NIC',
  ];

  const {
    merchants,
    merchantCount,
    isLoadingMerchants,
    isLoadingMerchantRegister,
    fetchMerchants,
    registerMerchant,
  } = useMerchant();

  const pagination = usePagination();

  const [searchParams, setSearchParams] = useState({ name: '' });

  const [isOpenRegisterForm, setIsOpenRegisterForm] = useState(false);

  const merchantQueryParams = { ...pagination.params, ...searchParams };

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
      fetchMerchants(merchantQueryParams);
    }
  };

  useEffect(() => {
    fetchMerchants(merchantQueryParams);
  }, [pagination.page, pagination.limit, searchParams]);

  return (
    <MerchantsView
      tableColumns={tableColumns}
      merchants={merchants}
      merchantCount={merchantCount}
      searchParams={searchParams}
      pagination={pagination}
      isOpenRegisterForm={isOpenRegisterForm}
      isLoadingMerchants={isLoadingMerchants}
      isLoadingMerchantRegister={isLoadingMerchantRegister}
      handleChangeSearch={handleChangeSearch}
      handleToggleRegisterForm={handleToggleRegisterForm}
      handleRegisterMerchant={handleRegisterMerchant}
    />
  );
};

export default MerchantsController;
