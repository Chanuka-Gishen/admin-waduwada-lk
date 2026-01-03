import { Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MerchantRegistrationDialog from '../components/register-merchant-form';
import { CustomTable } from 'src/components/custom-table/custom-table';
import MerchantRow from '../components/merchant-row';

export const MerchantsView = ({
  tableColumns,
  merchants,
  merchantCount,
  searchParams,
  pagination,
  isOpenRegisterForm,
  isLoadingMerchants,
  isLoadingMerchantRegister,
  handleChangeSearch,
  handleToggleRegisterForm,
  handleRegisterMerchant,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Merchants</Typography>
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
              documentCount={merchantCount}
              dataLength={merchants.length}
              page={pagination.page}
              limit={pagination.limit}
              handleChangePage={pagination.handleChangePage}
              handleChangeRowsPerPage={pagination.handleChangeRowsPerPage}
              isLoading={isLoadingMerchants}
              tableBody={<MerchantRow data={merchants} onRowClick={null} />}
            />
          </Paper>
        </Grid>
      </Grid>
      {isOpenRegisterForm && (
        <MerchantRegistrationDialog
          open={isOpenRegisterForm}
          isSubmitting={isLoadingMerchantRegister}
          onClose={handleToggleRegisterForm}
          onSubmit={handleRegisterMerchant}
        />
      )}
    </Container>
  );
};
