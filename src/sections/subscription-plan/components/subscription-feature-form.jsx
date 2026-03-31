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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import SubscriptionPlanFeatureSchema from 'src/schema/subscription-plan/subscription-plan-feature-schema';

const SubscriptionFeatureForm = ({
  open,
  isAdd,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting = false,
}) => {
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
          {isAdd ? 'Add Subscription Feature' : 'Update Subscription Feature'}
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
        validationSchema={SubscriptionPlanFeatureSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, setFieldValue, getFieldProps, isValid }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2, overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  name="feature"
                  label="Feature"
                  fullWidth
                  required
                  size="small"
                  {...getFieldProps('feature')}
                  error={touched.feature && Boolean(errors.feature)}
                  helperText={touched.feature && errors.feature}
                  disabled={isSubmitting}
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
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SubscriptionFeatureForm;
