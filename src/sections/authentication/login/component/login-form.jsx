import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';

import { PasswordField } from 'src/components/password-field/password-field';
import commonUtil from 'src/utils/common-util';

const LoginForm = ({
  formik,
  isUserEmailVerified,
  isUserFirstLogin,
  isLoadingVerifyEmail,
  isLoadingLogin,
  handleVerifyUserLogin,
}) => {
  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 1 }}>
          <TextField
            label="User Name/Email"
            autoComplete="off"
            fullWidth
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (!isUserEmailVerified) {
                  handleVerifyUserLogin();
                } else {
                  handleSubmit();
                }
              }
            }}
          />
          {isUserEmailVerified && !isUserFirstLogin && (
            <PasswordField
              label={'User Password'}
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          )}
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

        {!isUserEmailVerified && (
          <Button
            fullWidth
            loading={isLoadingVerifyEmail}
            disabled={isLoadingVerifyEmail || commonUtil.stringIsEmptyOrSpaces(values.email)}
            size="large"
            variant="contained"
            color="inherit"
            loadingPosition="start"
            onClick={handleVerifyUserLogin}
          >
            Verify Email
          </Button>
        )}

        {isUserEmailVerified && !isUserFirstLogin && (
          <Button
            fullWidth
            loading={isLoadingLogin}
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            loadingPosition="start"
          >
            Continue
          </Button>
        )}
      </form>
    </FormikProvider>
  );
};

export default LoginForm;
