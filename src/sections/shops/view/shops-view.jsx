import { Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { CustomTable } from 'src/components/custom-table/custom-table';
import ShopRow from '../components/shop-row';
import ShopRegistrationDialog from '../components/register-shop-form';

export const ShopsView = ({
  tableColumns,
  shops,
  shopsCount,
  pagination,
  searchParams,
  subscriptionOptions,
  isOpenRegisterForm,
  isLoadingShops,
  isLoadingSubscriptionOptions,
  isLoadingMerchantRegister,
  handleToggleRegisterForm,
  handleChangeSearch,
  handleRegisterMerchant,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Merchant Shops</Typography>
            <Button
              variant="outlined"
              startIcon={<AddBusinessIcon />}
              onClick={handleToggleRegisterForm}
            >
              Add New
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            size="small"
            label="Search By Name"
            name="name"
            value={searchParams.name}
            onChange={handleChangeSearch}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <Paper>
            <CustomTable
              columns={tableColumns}
              documentCount={shopsCount}
              dataLength={shops.length}
              page={pagination.page}
              limit={pagination.limit}
              handleChangePage={pagination.handleChangePage}
              handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
              isLoading={isLoadingShops}
              tableBody={<ShopRow data={shops} onRowClick={null} />}
            />
          </Paper>
        </Grid>
      </Grid>
      {isOpenRegisterForm && (
        <ShopRegistrationDialog
          open={isOpenRegisterForm}
          subscriptionOptions={subscriptionOptions}
          isLoadingSubscriptionOptions={isLoadingSubscriptionOptions}
          isSubmitting={isLoadingMerchantRegister}
          onClose={handleToggleRegisterForm}
          onSubmit={handleRegisterMerchant}
        />
      )}
    </Container>
  );
};
