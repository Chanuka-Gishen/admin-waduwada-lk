import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';

import commonUtil from 'src/utils/common-util';
import { formatCurrency } from 'src/utils/format-number';
import {
  SUB_PLAN_DURATION_ANNUAL,
  SUB_PLAN_DURATION_MONTHLY,
} from 'src/constants/subscription-constants';

const SubscriptionPlanCard = ({ plan, handleEditClick }) => {
  const discountedPrices = commonUtil.getSubscriptionDiscountedPrice(plan);
  const monthlyPrice =
    plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_MONTHLY)?.price || 0;
  const yearlyPrice =
    plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_ANNUAL)?.price || 0;
  const hasDiscount = plan.subPlanPricing.some((p) => p.isDiscountActive);
  const isFree = monthlyPrice === 0 && yearlyPrice === 0;

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: plan.isActive ? '2px solid' : '1px solid',
          borderColor: plan.isActive ? 'primary.main' : 'divider',
        }}
      >
        {/* Popular Badge */}
        {plan.subPlanName === 'Enterprise' && (
          <Badge
            badgeContent={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon fontSize="small" />
                <Typography variant="caption">Popular</Typography>
              </Box>
            }
            color="warning"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              '& .MuiBadge-badge': {
                padding: '4px 8px',
                borderRadius: '12px',
              },
            }}
          />
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <Chip
            label="Sale"
            color="error"
            size="small"
            icon={<LocalOfferIcon />}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
            }}
          />
        )}

        <CardContent sx={{ flexGrow: 1, pt: 4 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Typography variant="h5" component="h2" fontWeight="bold">
              {plan.subPlanName}
            </Typography>
            <FormControlLabel
              control={<Switch readOnly={true} checked={plan.isActive} size="small" di />}
              label={
                <Typography
                  variant="caption"
                  color={plan.isActive ? 'success.main' : 'text.secondary'}
                >
                  {plan.isActive ? 'Active' : 'Inactive'}
                </Typography>
              }
              labelPlacement="end"
            />
          </Box>

          {/* Description */}
          <Typography color="text.secondary" paragraph>
            {plan.subPlanDescription}
          </Typography>

          {/* Pricing */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }} xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Monthly
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                    {monthlyPrice > 0 &&
                      plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_MONTHLY)
                        ?.isDiscountActive && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through', mr: 1 }}
                        >
                          {formatCurrency(monthlyPrice)}
                        </Typography>
                      )}
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {isFree ? 'Free' : formatCurrency(discountedPrices.monthly)}
                    </Typography>
                    {!isFree && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        /mo
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }} xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Yearly
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                    {yearlyPrice > 0 &&
                      plan.subPlanPricing.find((p) => p.duration === SUB_PLAN_DURATION_ANNUAL)
                        ?.isDiscountActive && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through', mr: 1 }}
                        >
                          {formatCurrency(yearlyPrice)}
                        </Typography>
                      )}
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {isFree ? 'Free' : formatCurrency(discountedPrices.yearly)}
                    </Typography>
                    {!isFree && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        /yr
                      </Typography>
                    )}
                  </Box>
                  {!isFree && (
                    <Typography variant="caption" color="success.main">
                      Save {Math.round((1 - discountedPrices.yearly / (monthlyPrice * 12)) * 100)}%
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Features List */}
          <Typography variant="subtitle2" gutterBottom>
            Features ({plan.features.length})
          </Typography>
          <List dense>
            {plan.features.slice(0, 8).map((feature, idx) => (
              <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">{feature}</Typography>} />
              </ListItem>
            ))}
            {plan.features.length > 8 && (
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="primary">
                      +{plan.features.length - 8} more features
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </CardContent>

        <Divider />

        <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Sort Order: {plan.sortOrder}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Edit Plan">
              <IconButton onClick={() => handleEditClick(plan)} color="primary" size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SubscriptionPlanCard;
