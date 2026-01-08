import { AddCircleOutline } from '@mui/icons-material';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import SubscriptionPlanForm from '../components/subscription-plan-form';
import { Fragment } from 'react';
import SubscriptionPlanCard from '../components/subscription-plan-card';

export const SubscriptionPlansView = ({
  initialValues,
  subscriptionPlans,
  selectedSubscriptionPlan,
  isOpenAddSubscriptionPlan,
  isOpenUpdateSubscriptionPlan,
  isLoadingSubscriptionPlans,
  isLoadingSubscriptionPlanCreate,
  isLoadingSubscriptionPlanUpdate,
  handleToggleAddSubscriptionPlan,
  handleToggleUpdateSubscriptionPlan,
  handleAddSubscriptionPlan,
  handleUpdateSubscriptionPlan,
}) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Manage Subscription Plans</Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutline />}
              onClick={handleToggleAddSubscriptionPlan}
            >
              Add New
            </Button>
          </Stack>
        </Grid>
        {isLoadingSubscriptionPlans ? (
          <Grid size={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Loading...
            </Box>
          </Grid>
        ) : null}
        {!isLoadingSubscriptionPlans && subscriptionPlans.length === 0 ? (
          <Grid size={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">
                No subscription plans found. Create your first plan.
              </Typography>
            </Box>
          </Grid>
        ) : null}
        {!isLoadingSubscriptionPlans && subscriptionPlans.length > 0 ? (
          <Fragment>
            {subscriptionPlans.map((plan, index) => (
              <SubscriptionPlanCard
                key={index}
                plan={plan}
                handleEditClick={handleToggleUpdateSubscriptionPlan}
              />
            ))}
          </Fragment>
        ) : null}
      </Grid>
      {isOpenAddSubscriptionPlan && (
        <SubscriptionPlanForm
          open={isOpenAddSubscriptionPlan}
          isAdd={true}
          initialValues={initialValues}
          onClose={handleToggleAddSubscriptionPlan}
          isSubmitting={isLoadingSubscriptionPlanCreate}
          onSubmit={handleAddSubscriptionPlan}
        />
      )}
      {isOpenUpdateSubscriptionPlan && (
        <SubscriptionPlanForm
          isAdd={false}
          open={isOpenUpdateSubscriptionPlan}
          onClose={handleToggleUpdateSubscriptionPlan}
          initialValues={initialValues}
          isSubmitting={isLoadingSubscriptionPlanUpdate}
          onSubmit={handleUpdateSubscriptionPlan}
        />
      )}
    </Container>
  );
};
