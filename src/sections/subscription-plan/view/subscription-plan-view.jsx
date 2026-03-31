import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import PlanPricingRow from '../components/plan-pricing-row';
import SubscriptionInfoForm from '../components/subscription-info-form';
import SubscriptionPricingForm from '../components/subscription-pricing-form';
import SubscriptionFeatureForm from '../components/subscription-feature-form';
import ConfirmationDialog from 'src/components/confirmation-dialog/confirmation-dialog';

export const SubscriptionPlanView = ({
  plan,
  planInitialValues,
  pricingInitialValues,
  featureInitialValues,
  isOpenUpdate,
  isOpenUpdatePricing,
  isOpenAddFeature,
  isOpenUpdateFeature,
  isOpenDeleteFeature,
  isLoading,
  isLoadingSubscriptionPlanUpdate,
  isLoadingSubscriptionPlanPricingUpdate,
  isLoadingSubscriptionPlanFeatureCreate,
  isLoadingSubscriptionPlanFeatureUpdate,
  isLoadingSubscriptionPlanFeatureDelete,
  onBack,
  handleToggleUpdateDialog,
  handleToggleUpdatePricingDialog,
  handleToggleAddFeatureDialog,
  handleToggleUpdateFeatureDialog,
  handleToggleDeleteFeature,
  handleUpdate,
  handleUpdatePricing,
  handleAddFeature,
  handleUpdateFeature,
  handleDeleteFeature,
}) => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={NAVIGATION_ROUTES.subscription_plans.base}
    >
      Subscription Plans
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {isLoading ? 'Loading...' : (plan?.name ?? 'Not Found')}
    </Typography>,
  ];

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!plan) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 3 }}>
          Subscription plan not found
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mt: 2 }}>
          Back to Plans
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
      <Grid container spacing={3}>
        {/* Main Plan Details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardHeader
              title={
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h4" component="h1">
                      {plan.name}
                    </Typography>
                    <Chip
                      label={plan.is_active ? 'Active' : 'Inactive'}
                      color={plan.is_active ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={handleToggleUpdateDialog}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Stack>
              }
              subheader={
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {plan.description || 'No description provided'}
                </Typography>
              }
            />
            <CardContent>
              {/* Pricing Table */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Pricing
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Duration</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {plan.pricing?.map((pricing) => (
                        <PlanPricingRow
                          key={pricing.id}
                          pricing={pricing}
                          onEdit={handleToggleUpdatePricingDialog}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Features */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Features Included</Typography>
                  <Button
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={handleToggleAddFeatureDialog}
                  >
                    Add Feature
                  </Button>
                </Box>

                <List>
                  {plan.features?.map((feature) => (
                    <ListItem
                      key={feature.id}
                      secondaryAction={
                        <Box>
                          <Tooltip title="Edit Feature">
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleToggleUpdateFeatureDialog(feature)}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Feature">
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleToggleDeleteFeature(feature)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    >
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feature.feature} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isOpenUpdate && (
        <SubscriptionInfoForm
          open={isOpenUpdate}
          initialValues={planInitialValues}
          isSubmitting={isLoadingSubscriptionPlanUpdate}
          onClose={handleToggleUpdateDialog}
          onSubmit={handleUpdate}
        />
      )}
      {isOpenUpdatePricing && (
        <SubscriptionPricingForm
          open={isOpenUpdatePricing}
          initialValues={pricingInitialValues}
          isSubmitting={isLoadingSubscriptionPlanPricingUpdate}
          onClose={handleToggleUpdatePricingDialog}
          onSubmit={handleUpdatePricing}
        />
      )}
      {isOpenAddFeature && (
        <SubscriptionFeatureForm
          open={isOpenAddFeature}
          isAdd={true}
          initialValues={featureInitialValues}
          isSubmitting={isLoadingSubscriptionPlanFeatureCreate}
          onClose={handleToggleAddFeatureDialog}
          onSubmit={handleAddFeature}
        />
      )}
      {isOpenUpdateFeature && (
        <SubscriptionFeatureForm
          open={isOpenUpdateFeature}
          isAdd={false}
          initialValues={featureInitialValues}
          isSubmitting={isLoadingSubscriptionPlanFeatureUpdate}
          onClose={handleToggleUpdateFeatureDialog}
          onSubmit={handleUpdateFeature}
        />
      )}
      {isOpenDeleteFeature && (
        <ConfirmationDialog
          open={isOpenDeleteFeature}
          contentText={
            'Are you sure that you want to delete this feature? Cannot undo once proceeded'
          }
          isLoading={isLoadingSubscriptionPlanFeatureDelete}
          handleClose={handleToggleDeleteFeature}
          handleSubmit={handleDeleteFeature}
        />
      )}
    </Container>
  );
};
