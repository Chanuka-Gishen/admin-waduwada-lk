import { Container, Grid, Paper, TextField, Typography } from '@mui/material';

import { CustomTable } from 'src/components/custom-table/custom-table';
import MerchantRow from '../components/merchant-row';

export const MerchantsView = ({
  tableColumns,
  merchants,
  merchantCount,
  searchParams,
  pagination,
  isLoadingMerchants,
  handleChangeSearch,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4">Manage Merchant Users</Typography>
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
    </Container>
  );
};
