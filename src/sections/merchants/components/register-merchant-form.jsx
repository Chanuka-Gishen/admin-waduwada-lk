import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Grid,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { registerMerchantSchema } from 'src/schema';
import {
  MERCHANT_TYP_CARPENTER,
  MERCHANT_TYP_SHOP_OWNER,
  MERCHANT_TYPES,
} from 'src/constants/merchant-constants';
import commonUtil from 'src/utils/common-util';

const MerchantRegistrationDialog = ({ open, onClose, onSubmit, isSubmitting = false }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
        }}
      >
        <Typography variant="h4" component="span">
          Register New Merchant
        </Typography>
      </DialogTitle>

      <Formik
        initialValues={{
          merchantFirstName: '',
          merchantLastName: '',
          merchantEmail: '',
          merchantType: '',
          merchantPrimaryMobileNumber: '',
          merchantSecondaryMobileNumber: '',
          merchantNicNumber: '',
          merchantMailingAddress: '',
          merchantIsActive: true,
        }}
        validationSchema={registerMerchantSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
      >
        {({
          values,
          errors,
          touched,
          getFieldProps,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent dividers sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="First Name"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('merchantFirstName')}
                    error={Boolean(touched.merchantFirstName && errors.merchantFirstName)}
                    helperText={touched.merchantFirstName && errors.merchantFirstName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Last Name"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('merchantLastName')}
                    error={Boolean(touched.merchantLastName && errors.merchantLastName)}
                    helperText={touched.merchantLastName && errors.merchantLastName}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Email"
                    autoComplete="off"
                    type="email"
                    fullWidth
                    {...getFieldProps('merchantEmail')}
                    error={Boolean(touched.merchantEmail && errors.merchantEmail)}
                    helperText={touched.merchantEmail && errors.merchantEmail}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="status-select-label">Merchant Type</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      name="merchantType"
                      value={values.merchantType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      <MenuItem value={MERCHANT_TYP_CARPENTER}>Carpenter</MenuItem>
                      <MenuItem value={MERCHANT_TYP_SHOP_OWNER}>Shop Owner</MenuItem>
                    </Select>
                    <FormHelperText error={touched.merchantType && errors.merchantType}>
                      {touched.merchantType && errors.merchantType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Primary Mobile Number"
                    autoComplete="off"
                    placeholder="xxxxxxxxx"
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        maxLength: 9,
                        inputMode: 'numeric',
                      },
                    }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setFieldValue('merchantPrimaryMobileNumber', value);
                    }}
                    value={commonUtil.formatPhoneNumber(values.merchantPrimaryMobileNumber)}
                    error={Boolean(
                      touched.merchantPrimaryMobileNumber && errors.merchantPrimaryMobileNumber
                    )}
                    helperText={
                      touched.merchantPrimaryMobileNumber && errors.merchantPrimaryMobileNumber
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Secondary Mobile Number"
                    autoComplete="off"
                    placeholder="xxxxxxxxx"
                    fullWidth
                    slotProps={{
                      input: {
                        maxLength: 9,
                        inputMode: 'numeric',
                      },
                    }}
                    {...getFieldProps('merchantSecondaryMobileNumber')}
                    value={commonUtil.formatPhoneNumber(values.merchantSecondaryMobileNumber)}
                    error={Boolean(
                      touched.merchantSecondaryMobileNumber && errors.merchantSecondaryMobileNumber
                    )}
                    helperText={
                      touched.merchantSecondaryMobileNumber && errors.merchantSecondaryMobileNumber
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="NIC Number"
                    autoComplete="off"
                    placeholder="199912345V or 199912345678"
                    fullWidth
                    required
                    {...getFieldProps('merchantNicNumber')}
                    error={Boolean(touched.merchantNicNumber && errors.merchantNicNumber)}
                    helperText={touched.merchantNicNumber && errors.merchantNicNumber}
                  />
                </Grid>
                {values.merchantType === 'carpenter' && (
                  <Grid size={12}>
                    <TextField
                      label="Address"
                      autoComplete="off"
                      fullWidth
                      required
                      rows={2}
                      {...getFieldProps('merchantMailingAddress')}
                      error={Boolean(
                        touched.merchantMailingAddress && errors.merchantMailingAddress
                      )}
                      helperText={touched.merchantMailingAddress && errors.merchantMailingAddress}
                    />
                  </Grid>
                )}
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="status-select-label">Active Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      name="isActive"
                      value={values.merchantIsActive}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                    <FormHelperText error={touched.merchantIsActive && errors.merchantIsActive}>
                      {touched.merchantIsActive && errors.merchantIsActive}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={onClose} disabled={isSubmitting} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default MerchantRegistrationDialog;
