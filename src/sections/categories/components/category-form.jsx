import { Form, Formik } from 'formik';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { categorySchema } from 'src/schema';

export const CategoryForm = ({
  initialValues,
  categoryOptions,
  open,
  isLoading,
  isLoadingCategoryOptions,
  onClose,
  onSubmit,
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
          Add New Category
        </Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={categorySchema}
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
                <Grid size={12}>
                  <TextField
                    label="Category Name"
                    autoComplete="off"
                    fullWidth
                    required
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    label="Icon Url"
                    autoComplete="off"
                    fullWidth
                    {...getFieldProps('icon_url')}
                    error={Boolean(touched.icon_url && errors.icon_url)}
                    helperText={touched.icon_url && errors.icon_url}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <FormLabel>Parent Category</FormLabel>
                    <Autocomplete
                      options={categoryOptions}
                      disabled={isLoadingCategoryOptions}
                      value={categoryOptions.find((opt) => opt.id === values.parent_id) || null}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => setFieldValue('parent_id', value?.id ?? null)}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    <FormHelperText error={touched.parent_id && errors.parent_id}>
                      {touched.parent_id && errors.parent_id}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl
                    component="fieldset"
                    error={touched.is_active && Boolean(errors.is_active)}
                  >
                    <FormLabel>Status</FormLabel>
                    <RadioGroup
                      row
                      name="is_active"
                      value={values.is_active}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="Active" />
                      <FormControlLabel value={false} control={<Radio />} label="Not Active" />
                    </RadioGroup>
                    {touched.is_active && errors.is_active && (
                      <FormHelperText error>{errors.is_active}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={onClose} disabled={isLoading} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid || isLoading}
                loading={isLoading}
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
