import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Stack, Typography, alpha, useTheme } from '@mui/material';

import { bgGradient } from 'src/theme/css';
import { SetPasswordForm } from '../component/set-password-form';

export const SetPasswordView = ({ isLoading, handleConfirm }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
            sx={{
              position: 'fixed',
              top: { xs: 16, md: 24 },
              left: { xs: 16, md: 24 },
            }}
          /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" textAlign={'center'} sx={{ mb: 5 }}>
            Change your password to continue
          </Typography>

          <SetPasswordForm isLoading={isLoading} handleConfirm={handleConfirm} />
        </Card>
      </Stack>
    </Box>
  );
};

SetPasswordForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
