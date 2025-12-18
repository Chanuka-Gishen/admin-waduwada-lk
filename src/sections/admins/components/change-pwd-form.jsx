import { Formik } from 'formik';

import { Button, Stack, Typography } from '@mui/material';

import { PasswordField } from 'src/components/password-field/password-field';
import { resetPasswordSchema } from 'src/schema';

export const ChangePwdForm = ({ isLoading, handleConfirm }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Change Password</Typography>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values) => {
          handleConfirm(values);
        }}
      >
        {({ errors, touched, handleSubmit, getFieldProps }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ my: 3 }}>
              <PasswordField
                label="Password"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <PasswordField
                label="Confirm Password"
                {...getFieldProps('confirmPassword')}
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                type="reset"
                variant="contained"
                color="secondary"
                loading={isLoading}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};
