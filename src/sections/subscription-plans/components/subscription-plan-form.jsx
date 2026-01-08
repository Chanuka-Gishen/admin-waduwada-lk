import React, { useState } from 'react';
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
  Grid,
  Chip,
  FormControl,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form, FieldArray } from 'formik';
import { CurrencyInput } from 'src/components/currency-input/currency-input';
import SubscriptionPlanSchema from 'src/schema/subscription-plan/subscription-plan-schema';

const SubscriptionPlanForm = ({
  open,
  isAdd,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting = false,
}) => {
  const [featureInput, setFeatureInput] = useState('');

  const handleFormSubmit = async (values, { resetForm }) => {
    onSubmit(values, resetForm);
  };

  const addFeature = (setFieldValue, currentFeatures) => {
    if (featureInput.trim() && !currentFeatures.includes(featureInput.trim())) {
      const newFeatures = [...currentFeatures, featureInput.trim()];
      setFieldValue('features', newFeatures);
      setFeatureInput('');
    }
  };

  const removeFeature = (setFieldValue, currentFeatures, index) => {
    const newFeatures = currentFeatures.filter((_, i) => i !== index);
    setFieldValue('features', newFeatures);
  };

  return (
    <Dialog open={open} fullScreen>
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
          {!isAdd ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
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
        validationSchema={SubscriptionPlanSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          getFieldProps,
          isValid,
        }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Plan Name */}
                <TextField
                  name="subPlanName"
                  label="Plan Name"
                  value={values.subPlanName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  size="small"
                  error={touched.subPlanName && Boolean(errors.subPlanName)}
                  helperText={touched.subPlanName && errors.subPlanName}
                  disabled={isSubmitting}
                />

                {/* Plan Description */}
                <TextField
                  name="subPlanDescription"
                  label="Plan Description"
                  value={values.subPlanDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  required
                  rows={2}
                  size="small"
                  error={touched.subPlanDescription && Boolean(errors.subPlanDescription)}
                  helperText={touched.subPlanDescription && errors.subPlanDescription}
                  disabled={isSubmitting}
                />

                {/* Pricing Section */}
                <Typography variant="subtitle1" fontWeight="medium">
                  Pricing
                </Typography>

                <FieldArray name="subPlanPricing">
                  {() => (
                    <Grid container spacing={2}>
                      {values.subPlanPricing.map((price, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={price.duration}>
                          <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              {price.duration.charAt(0).toUpperCase() + price.duration.slice(1)}{' '}
                              Price
                            </Typography>
                            <TextField
                              fullWidth
                              required
                              label="Price"
                              size="small"
                              {...getFieldProps(`subPlanPricing[${index}].price`)}
                              error={
                                touched.subPlanPricing?.[index]?.price &&
                                Boolean(errors.subPlanPricing?.[index]?.price)
                              }
                              helperText={
                                touched.subPlanPricing?.[index]?.price &&
                                errors.subPlanPricing?.[index]?.price
                              }
                              slotProps={{ input: { inputComponent: CurrencyInput } }}
                            />

                            {/* Discount Section */}
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={values.subPlanPricing[index].isDiscountActive}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `subPlanPricing[${index}].isDiscountActive`,
                                      e.target.checked
                                    );
                                  }}
                                  disabled={isSubmitting}
                                />
                              }
                              label="Enable Discount"
                            />

                            {values.subPlanPricing[index].isDiscountActive && (
                              <>
                                <TextField
                                  fullWidth
                                  label="Discount Amount"
                                  size="small"
                                  {...getFieldProps(`subPlanPricing[${index}].discountAmount`)}
                                  error={
                                    touched.subPlanPricing?.[index]?.discountAmount &&
                                    Boolean(errors.subPlanPricing?.[index]?.discountAmount)
                                  }
                                  helperText={
                                    touched.subPlanPricing?.[index]?.discountAmount &&
                                    errors.subPlanPricing?.[index]?.discountAmount
                                  }
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />

                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                  <FormControl fullWidth>
                                    <DatePicker
                                      label="Discount Start Date"
                                      value={values.subPlanPricing[index].discountStartDate}
                                      onChange={(date) => {
                                        setFieldValue(
                                          `subPlanPricing[${index}].discountStartDate`,
                                          date
                                        );
                                      }}
                                      slotProps={{
                                        textField: {
                                          size: 'small',
                                          fullWidth: true,
                                          error: Boolean(
                                            errors.subPlanPricing?.[index]?.discountStartDate
                                          ),
                                          helperText:
                                            errors.subPlanPricing?.[index]?.discountStartDate,
                                        },
                                      }}
                                      disabled={isSubmitting}
                                    />
                                    <FormHelperText
                                      error={
                                        touched.subPlanPricing?.[index]?.discountStartDate &&
                                        Boolean(errors.subPlanPricing?.[index]?.discountStartDate)
                                      }
                                    >
                                      {touched.subPlanPricing?.[index]?.discountStartDate &&
                                        errors.subPlanPricing?.[index]?.discountStartDate}
                                    </FormHelperText>
                                  </FormControl>
                                  <FormControl fullWidth>
                                    <DatePicker
                                      label="Discount End Date"
                                      value={values.subPlanPricing[index].discountEndDate}
                                      onChange={(date) => {
                                        setFieldValue(
                                          `subPlanPricing[${index}].discountEndDate`,
                                          date
                                        );
                                      }}
                                      minDate={values.subPlanPricing[index].discountStartDate}
                                      slotProps={{
                                        textField: {
                                          size: 'small',
                                          fullWidth: true,
                                          error: Boolean(
                                            errors.subPlanPricing?.[index]?.discountEndDate
                                          ),
                                          helperText:
                                            errors.subPlanPricing?.[index]?.discountEndDate,
                                        },
                                      }}
                                      disabled={isSubmitting}
                                    />
                                    <FormHelperText
                                      error={
                                        touched.subPlanPricing?.[index]?.discountEndDate &&
                                        Boolean(errors.subPlanPricing?.[index]?.discountEndDate)
                                      }
                                    >
                                      {touched.subPlanPricing?.[index]?.discountEndDate &&
                                        errors.subPlanPricing?.[index]?.discountEndDate}
                                    </FormHelperText>
                                  </FormControl>
                                </Box>
                              </>
                            )}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>

                {/* Features */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Features
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature(setFieldValue, values.features);
                        }
                      }}
                      label="Add Feature"
                      size="small"
                      fullWidth
                      disabled={isSubmitting}
                    />
                    <Button
                      onClick={() => addFeature(setFieldValue, values.features)}
                      disabled={!featureInput.trim() || isSubmitting}
                      variant="outlined"
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {values.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        onDelete={() =>
                          !isSubmitting && removeFeature(setFieldValue, values.features, index)
                        }
                        disabled={isSubmitting}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Sort Order */}
                <TextField
                  name="sortOrder"
                  label="Sort Order"
                  type="number"
                  value={values.sortOrder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  size="small"
                  error={touched.sortOrder && Boolean(errors.sortOrder)}
                  helperText={touched.sortOrder && errors.sortOrder}
                  disabled={isSubmitting}
                />

                {/* Active Status */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isActive}
                      onChange={(e) => setFieldValue('isActive', e.target.checked)}
                      disabled={isSubmitting}
                    />
                  }
                  label="Active Plan"
                />
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
                {!isAdd ? 'Update Plan' : 'Create Plan'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SubscriptionPlanForm;
