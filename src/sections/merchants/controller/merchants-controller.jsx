import { useEffect, useState } from 'react';
import { MerchantsView } from '../view/merchants-view';
import useMerchant from 'src/hooks/use-merchant';
import usePagination from 'src/hooks/use-pagination';

const MerchantsController = () => {
  const tableColumns = [
    'Name',
    'Role',
    'Is Verified',
    'Email',
    'Primary Mobile',
    'Secondary Mobile',
    'NIC',
  ];

  const { merchants, merchantCount, isLoadingMerchants, fetchMerchants } = useMerchant();

  const pagination = usePagination();

  const [searchParams, setSearchParams] = useState({ name: '' });

  const merchantQueryParams = { ...pagination.params, ...searchParams };

  const handleChangeSearch = (e) => {
    setSearchParams((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
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
      isLoadingMerchants={isLoadingMerchants}
      handleChangeSearch={handleChangeSearch}
    />
  );
};

export default MerchantsController;
