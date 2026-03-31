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
import {
  SUB_PLAN_DISCOUNT_TYP_FLAT,
  SUB_PLAN_DURATION_ANNUAL,
  SUB_PLAN_DURATION_MONTHLY,
} from 'src/constants/subscription-constants';

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
        initialValues={{
          name: '',
          description: '',
          pricing: [
            {
              duration: SUB_PLAN_DURATION_MONTHLY,
              price: 0,
              is_discount_active: false,
              discount_amount: 0,
              discount_type: SUB_PLAN_DISCOUNT_TYP_FLAT,
              discount_start_date: null,
              discount_end_date: null,
            },
            {
              duration: SUB_PLAN_DURATION_ANNUAL,
              price: 0,
              is_discount_active: false,
              discount_amount: 0,
              discount_type: SUB_PLAN_DISCOUNT_TYP_FLAT,
              discount_start_date: null,
              discount_end_date: null,
            },
          ],
          currency: 'LKR',
          features: [],
          is_active: true,
          sort_order: 0,
        }}
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
                  name="name"
                  label="Plan Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  size="small"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  disabled={isSubmitting}
                />

                {/* Plan Description */}
                <TextField
                  name="description"
                  label="Plan Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  required
                  rows={2}
                  size="small"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  disabled={isSubmitting}
                />

                {/* Pricing Section */}
                <Typography variant="subtitle1" fontWeight="medium">
                  Pricing
                </Typography>

                <FieldArray name="pricing">
                  {() => (
                    <Grid container spacing={2}>
                      {values.pricing.map((price, index) => (
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
                              {...getFieldProps(`pricing[${index}].price`)}
                              error={
                                touched.pricing?.[index]?.price &&
                                Boolean(errors.pricing?.[index]?.price)
                              }
                              helperText={
                                touched.pricing?.[index]?.price && errors.pricing?.[index]?.price
                              }
                              slotProps={{ input: { inputComponent: CurrencyInput } }}
                            />

                            {/* Discount Section */}
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={values.pricing[index].is_discount_active}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `pricing[${index}].is_discount_active`,
                                      e.target.checked
                                    );
                                  }}
                                  disabled={isSubmitting}
                                />
                              }
                              label="Enable Discount"
                            />

                            {values.pricing[index].is_discount_active && (
                              <>
                                <TextField
                                  fullWidth
                                  label="Discount Amount"
                                  size="small"
                                  {...getFieldProps(`pricing[${index}].discount_amount`)}
                                  error={
                                    touched.pricing?.[index]?.discount_amount &&
                                    Boolean(errors.pricing?.[index]?.discount_amount)
                                  }
                                  helperText={
                                    touched.pricing?.[index]?.discount_amount &&
                                    errors.pricing?.[index]?.discount_amount
                                  }
                                  slotProps={{ input: { inputComponent: CurrencyInput } }}
                                />

                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                  <FormControl fullWidth>
                                    <DatePicker
                                      label="Discount Start Date"
                                      value={values.pricing[index].discount_start_date}
                                      onChange={(date) => {
                                        setFieldValue(
                                          `pricing[${index}].discount_start_date`,
                                          date
                                        );
                                      }}
                                      slotProps={{
                                        textField: {
                                          size: 'small',
                                          fullWidth: true,
                                          error: Boolean(
                                            errors.pricing?.[index]?.discount_start_date
                                          ),
                                          helperText: errors.pricing?.[index]?.discount_start_date,
                                        },
                                      }}
                                      disabled={isSubmitting}
                                    />
                                    <FormHelperText
                                      error={
                                        touched.pricing?.[index]?.discount_start_date &&
                                        Boolean(errors.pricing?.[index]?.discount_start_date)
                                      }
                                    >
                                      {touched.pricing?.[index]?.discount_start_date &&
                                        errors.pricing?.[index]?.discount_start_date}
                                    </FormHelperText>
                                  </FormControl>
                                  <FormControl fullWidth>
                                    <DatePicker
                                      label="Discount End Date"
                                      value={values.pricing[index].discount_end_date}
                                      onChange={(date) => {
                                        setFieldValue(`pricing[${index}].discount_end_date`, date);
                                      }}
                                      minDate={values.pricing[index].discount_start_date}
                                      slotProps={{
                                        textField: {
                                          size: 'small',
                                          fullWidth: true,
                                          error: Boolean(
                                            errors.pricing?.[index]?.discount_end_date
                                          ),
                                          helperText: errors.pricing?.[index]?.discount_end_date,
                                        },
                                      }}
                                      disabled={isSubmitting}
                                    />
                                    <FormHelperText
                                      error={
                                        touched.pricing?.[index]?.discount_end_date &&
                                        Boolean(errors.pricing?.[index]?.discount_end_date)
                                      }
                                    >
                                      {touched.pricing?.[index]?.discount_end_date &&
                                        errors.pricing?.[index]?.discount_end_date}
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
                      onKeyDown={(e) => {
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
                  name="sort_order"
                  label="Sort Order"
                  type="number"
                  value={values.sort_order}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  size="small"
                  error={touched.sort_order && Boolean(errors.sort_order)}
                  helperText={touched.sort_order && errors.sort_order}
                  disabled={isSubmitting}
                />

                {/* Active Status */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.is_active}
                      onChange={(e) => setFieldValue('is_active', e.target.checked)}
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
