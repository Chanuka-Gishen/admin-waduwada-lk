import React from 'react';
import { Formik, Form } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import subscriptionPlanPricingSchema from 'src/schema/subscription-plan/subscription-plan-pricing-schema';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import { DatePicker } from '@mui/lab';

const SubscriptionPricingForm = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting = false,
}) => {
  const handleFormSubmit = async (values, { resetForm }) => {
    onSubmit(values, resetForm);
  };

  return (
    <Dialog open={open} maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="span">
          Update Subscription Pricing
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={subscriptionPlanPricingSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, getFieldProps, isValid }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {values.duration.charAt(0).toUpperCase() + values.duration.slice(1)} Price
                </Typography>
                <TextField
                  fullWidth
                  required
                  label="Price"
                  size="small"
                  {...getFieldProps('price')}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                />

                {/* Discount Section */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.is_discount_active}
                      onChange={(e) => {
                        setFieldValue('is_discount_active', e.target.checked);
                      }}
                      disabled={isSubmitting}
                    />
                  }
                  label="Enable Discount"
                />

                {values.is_discount_active && (
                  <>
                    <TextField
                      fullWidth
                      label="Discount Amount"
                      size="small"
                      {...getFieldProps('discount_amount')}
                      error={touched.discount_amount && Boolean(errors.discount_amount)}
                      helperText={touched.discount_amount && errors.discount_amount}
                      slotProps={{ input: { inputComponent: CurrencyInput } }}
                    />

                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Discount Start Date"
                          value={values.discount_start_date}
                          onChange={(date) => {
                            setFieldValue('discount_start_date', date);
                          }}
                          slotProps={{
                            textField: {
                              size: 'small',
                              fullWidth: true,
                              error: Boolean(errors.discount_start_date),
                              helperText: errors.discount_start_date,
                            },
                          }}
                          disabled={isSubmitting}
                        />
                        <FormHelperText
                          error={touched.discount_start_date && Boolean(errors.discount_start_date)}
                        >
                          {touched.discount_start_date && errors.discount_start_date}
                        </FormHelperText>
                      </FormControl>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Discount End Date"
                          value={values.discount_end_date}
                          onChange={(date) => {
                            setFieldValue('discount_end_date', date);
                          }}
                          minDate={values.discount_start_date}
                          slotProps={{
                            textField: {
                              size: 'small',
                              fullWidth: true,
                              error: Boolean(errors.discount_end_date),
                              helperText: errors.discount_end_date,
                            },
                          }}
                          disabled={isSubmitting}
                        />
                        <FormHelperText
                          error={touched.discount_end_date && Boolean(errors.discount_end_date)}
                        >
                          {touched.discount_end_date && errors.discount_end_date}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </>
                )}
              </Box>
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
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SubscriptionPricingForm;
