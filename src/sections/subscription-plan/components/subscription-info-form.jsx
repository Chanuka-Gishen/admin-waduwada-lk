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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UpdateSubscriptionPlanSchema from 'src/schema/subscription-plan/update-subscription-plan-schema';

const SubscriptionInfoForm = ({ open, onClose, onSubmit, initialValues, isSubmitting = false }) => {
  const handleFormSubmit = async (values, { resetForm }) => {
    onSubmit(values, resetForm);
  };

  return (
    <Dialog open={open} maxWidth="md">
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
          Edit Subscription Plan Info
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
        validationSchema={UpdateSubscriptionPlanSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, getFieldProps, isValid }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Plan Name */}
                <TextField
                  name="name"
                  label="Plan Name"
                  fullWidth
                  required
                  size="small"
                  {...getFieldProps('name')}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  disabled={isSubmitting}
                />

                {/* Plan Description */}
                <TextField
                  name="description"
                  label="Plan Description"
                  fullWidth
                  multiline
                  required
                  rows={2}
                  size="small"
                  {...getFieldProps('description')}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  disabled={isSubmitting}
                />

                {/* Sort Order */}
                <TextField
                  name="sort_order"
                  label="Sort Order"
                  type="number"
                  fullWidth
                  size="small"
                  {...getFieldProps('sort_order')}
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
                Update Plan
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SubscriptionInfoForm;
