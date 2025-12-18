import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { CustomTable } from 'src/components/custom-table/custom-table';
import { AdminRow } from '../components/admin-row';
import { ChangePwdForm } from '../components/change-pwd-form';
import { AdminUpdateForm } from '../components/admin-update-form';
import { AdminRegisterForm } from '../components/admin-register-form';

export const AdminsView = ({
  admins,
  isSelectedCurrentAdmin,
  initialValues,
  tableColumns,
  isOpenCreate,
  isOpenUpdate,
  isLoading,
  isLoadingRegister,
  isLoadingUpdate,
  isLoadingChangePwd,
  handleToggleRegister,
  handleToggleUpdate,
  handleRegister,
  handleUpdate,
  handleChangePwd,
}) => {
  return (
    <Container maxWidth="xl" sx={{ mt: '20px' }}>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Stack direction={'row'} alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Adminstration</Typography>
            <Button
              variant="outlined"
              startIcon={<AddBoxIcon />}
              disabled={isLoadingRegister}
              onClick={handleToggleRegister}
            >
              Add New
            </Button>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Paper>
            <CustomTable
              columns={tableColumns}
              dataLength={admins.length}
              isLoading={isLoading}
              documentCount={admins.length}
              tableBody={<AdminRow data={admins} onEdit={handleToggleUpdate} />}
              enableAction={true}
              enablePagination={false}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 4 }}>
          <ChangePwdForm isLoading={isLoadingChangePwd} handleConfirm={handleChangePwd} />
        </Grid>
      </Grid>
      {isOpenCreate && (
        <AdminRegisterForm
          open={isOpenCreate}
          isLoading={isLoadingRegister}
          handleOpenClose={handleToggleRegister}
          handleConfirm={handleRegister}
        />
      )}
      {isOpenUpdate && (
        <AdminUpdateForm
          open={isOpenUpdate}
          initialValues={initialValues}
          isSelectedCurrentAdmin={isSelectedCurrentAdmin}
          isLoading={isLoadingUpdate}
          handleOpenClose={handleToggleUpdate}
          handleConfirm={handleUpdate}
        />
      )}
    </Container>
  );
};
