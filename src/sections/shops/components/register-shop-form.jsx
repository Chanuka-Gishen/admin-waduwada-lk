import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Grid,
  Autocomplete,
  Divider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { registerMerchantSchema } from 'src/schema';
import {
  MERCHANT_TYP_CARPENTER,
  MERCHANT_TYP_SHOP_OWNER,
  SHOP_SPECIALITIES,
} from 'src/constants/merchant-constants';
import { formatPhoneNumber } from 'src/utils/common-util';

const ShopRegistrationDialog = ({
  open,
  subscriptionOptions,
  onClose,
  onSubmit,
  isLoadingSubscriptionOptions,
  isSubmitting = false,
}) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
        }}
      >
        <Typography variant="h4" component="span">
          Register New Merchant Shop
        </Typography>
      </DialogTitle>

      <Formik
        initialValues={{
          merchantFirstName: '',
          merchantLastName: '',
          merchantEmail: '',
          merchantPrimaryMobileNumber: '',
          merchantSecondaryMobileNumber: '',
          merchantNicNumber: '',
          merchantMailingAddress: '',
          merchantIsActive: true,
          shopIsAcceptingCustomOrders: false,
          shopName: '',
          shopSubscription: null,
          shopType: '',
          shopLocationCity: '',
          shopLocationStreet: '',
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
                    label="Shop Name"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('shopName')}
                    error={Boolean(touched.shopName && errors.shopName)}
                    helperText={touched.shopName && errors.shopName}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="status-select-label">Shop Type</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      name="shopType"
                      label="Shop Type"
                      value={values.shopType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      <MenuItem value={MERCHANT_TYP_CARPENTER}>Carpenter</MenuItem>
                      <MenuItem value={MERCHANT_TYP_SHOP_OWNER}>Shop Owner</MenuItem>
                    </Select>
                    <FormHelperText error={touched.shopType && errors.shopType}>
                      {touched.shopType && errors.shopType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={subscriptionOptions}
                      disabled={isLoadingSubscriptionOptions}
                      value={
                        subscriptionOptions.find((opt) => opt.id === values.shopSubscription) ||
                        null
                      }
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => setFieldValue('shopSubscription', value?.id ?? null)}
                      renderInput={(params) => (
                        <TextField required label="Subscription Plan" {...params} />
                      )}
                    />

                    <FormHelperText error={touched.shopSubscription && errors.shopSubscription}>
                      {touched.shopSubscription && errors.shopSubscription}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="City"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('shopLocationCity')}
                    error={Boolean(touched.shopLocationCity && errors.shopLocationCity)}
                    helperText={touched.shopLocationCity && errors.shopLocationCity}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Street"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('shopLocationStreet')}
                    error={Boolean(touched.shopLocationStreet && errors.shopLocationStreet)}
                    helperText={touched.shopLocationStreet && errors.shopLocationStreet}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel id="status-select-label">Is Accepting Custom Orders</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      name="shopIsAcceptingCustomOrders"
                      value={values.shopIsAcceptingCustomOrders}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <FormHelperText
                      error={
                        touched.shopIsAcceptingCustomOrders && errors.shopIsAcceptingCustomOrders
                      }
                    >
                      {touched.shopIsAcceptingCustomOrders && errors.shopIsAcceptingCustomOrders}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <Divider textAlign="center">Merchant Info</Divider>
                </Grid>
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
                    required
                    fullWidth
                    {...getFieldProps('merchantEmail')}
                    error={Boolean(touched.merchantEmail && errors.merchantEmail)}
                    helperText={touched.merchantEmail && errors.merchantEmail}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Primary Mobile Number"
                    name="merchantPrimaryMobileNumber"
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
                    onBlur={handleBlur}
                    value={formatPhoneNumber(values.merchantPrimaryMobileNumber)}
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
                    value={formatPhoneNumber(values.merchantSecondaryMobileNumber)}
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

                {values.shopType === 'carpenter' && (
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

export default ShopRegistrationDialog;
