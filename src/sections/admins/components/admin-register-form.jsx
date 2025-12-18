import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { Formik } from 'formik';

import adminSchema from 'src/schema/admin/admin-schema';
import { USER_ROLE } from 'src/constants/user-role';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AdminRegisterForm = ({ open, isLoading, handleOpenClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle id="alert-dialog-title">Register New Admin</DialogTitle>

      <Formik
        initialValues={{
          adminFirstName: '',
          adminLastName: '',
          adminEmail: '',
          adminRole: USER_ROLE.ADMIN,
          adminIsActive: true,
        }}
        enableReinitialize
        validationSchema={adminSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleBlur,
          handleSubmit,
          getFieldProps,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="First Name"
                    name="adminFirstName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('adminFirstName')}
                    error={touched.adminFirstName && Boolean(errors.adminFirstName)}
                    helperText={touched.adminFirstName && errors.adminFirstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="Last Name"
                    name="adminLastName"
                    required
                    fullWidth
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('adminLastName')}
                    error={touched.adminLastName && Boolean(errors.adminLastName)}
                    helperText={touched.adminLastName && errors.adminLastName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <TextField
                    label="Admin Email"
                    name="adminEmail"
                    fullWidth
                    required
                    autoComplete="off"
                    variant="outlined"
                    {...getFieldProps('adminEmail')}
                    error={touched.adminEmail && Boolean(errors.adminEmail)}
                    helperText={touched.adminEmail && errors.adminEmail}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.adminRole && errors.adminRole)}
                  >
                    <InputLabel id="select-label">Admin Role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Admin Role"
                      name="adminRole"
                      required
                      value={values.adminRole}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN].map((role, index) => (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={Boolean(touched.adminRole && errors.adminRole)}>
                      {touched.adminRole && errors.adminRole}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    required
                    error={Boolean(touched.adminIsActive && errors.adminIsActive)}
                  >
                    <InputLabel id="select-label">Active Status</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Active Status"
                      name="adminIsActive"
                      required
                      value={values.adminIsActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Disabled</MenuItem>
                    </Select>
                    <FormHelperText error={Boolean(touched.adminIsActive && errors.adminIsActive)}>
                      {touched.adminIsActive && errors.adminIsActive}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleOpenClose();
                  resetForm();
                }}
                disabled={isLoading}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={isLoading} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
