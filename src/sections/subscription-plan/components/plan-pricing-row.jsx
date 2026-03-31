import { TableRow, TableCell, Chip, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { formatCurrency } from 'src/utils/format-number';
import { SUB_PLAN_DURATION_ANNUAL } from 'src/constants/subscription-constants';

const PlanPricingRow = ({ pricing, onEdit }) => {
  const finalPrice = pricing.is_discount_active
    ? pricing.price - pricing.discount_amount
    : pricing.price;
  const hasDiscount = pricing.isDiscountActive;

  return (
    <TableRow>
      <TableCell>
        <Chip
          label={pricing.duration}
          size="small"
          color={pricing.duration === SUB_PLAN_DURATION_ANNUAL ? 'primary' : 'default'}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2">{formatCurrency(pricing.price)}</Typography>
      </TableCell>
      <TableCell>
        {pricing.is_discount_active ? (
          <Box>
            <Typography variant="body2" color="success.main">
              {formatCurrency(finalPrice)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (
              {hasDiscount
                ? `-${formatCurrency(pricing.discount_amount)}`
                : `-${pricing.discount_amount}%`}
              )
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">No discount</Typography>
        )}
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={() => onEdit(pricing)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PlanPricingRow;
