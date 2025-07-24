import React from 'react';
import {
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import useAuthStore from 'src/store/auth-store';

// ----------------------------------------------------------------------

export const DashboardView = ({
}) => {
  const theme = useTheme();
  const { auth } = useAuthStore.getState();

  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <Typography>Dashboard</Typography>
        </Grid>
        
      </Grid>
    </Container>
  );
};

DashboardView.propTypes = {};
