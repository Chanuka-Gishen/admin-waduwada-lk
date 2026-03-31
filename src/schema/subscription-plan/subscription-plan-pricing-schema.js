import * as yup from 'yup';
import { SUB_PLAN_DISCOUNT_TYPES, SUB_PLAN_DURATION } from 'src/constants/subscription-constants';

const subscriptionPlanPricingSchema = yup.object({
  duration: yup
    .string()
    .oneOf(SUB_PLAN_DURATION, 'Invalid duration')
    .required('Duration is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price must be valid')
    .required('Price is required'),
  is_discount_active: yup.boolean().default(false),
  discount_amount: yup
    .number()
    .typeError('Discount amount must be a number')
    .min(0, 'Discount amount cannot be negative')
    .default(0)
    .when('isDiscountActive', {
      is: true,
      then: (schema) => schema.required('Discount amount is required when discount is active'),
      otherwise: (schema) => schema.nullable(),
    }),
  discount_type: yup
    .string()
    .oneOf(SUB_PLAN_DISCOUNT_TYPES, 'Invalid discount type')
    .default('flat'),
  discount_start_date: yup.date().nullable().default(null),
  discount_end_date: yup
    .date()
    .nullable()
    .default(null)
    .min(yup.ref('discountStartDate'), 'Discount end date must be after start date')
    .when('discountStartDate', {
      is: (date) => !!date,
      then: (schema) => schema.required('Discount end date is required when start date is set'),
    }),
});

export default subscriptionPlanPricingSchema;
