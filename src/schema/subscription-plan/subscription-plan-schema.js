import * as yup from 'yup';
import {
  SUB_PLAN_DISCOUNT_TYPES,
  SUB_PLAN_DURATION,
  SUB_PLAN_DURATION_ANNUAL,
  SUB_PLAN_DURATION_MONTHLY,
} from 'src/constants/subscription-constants';

const pricingSchema = yup.object({
  duration: yup
    .string()
    .oneOf(SUB_PLAN_DURATION, 'Invalid duration')
    .required('Duration is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price must be valid')
    .required('Price is required'),
  isDiscountActive: yup.boolean().default(false),
  discountAmount: yup
    .number()
    .typeError('Discount amount must be a number')
    .min(0, 'Discount amount cannot be negative')
    .default(0)
    .when('isDiscountActive', {
      is: true,
      then: (schema) => schema.required('Discount amount is required when discount is active'),
      otherwise: (schema) => schema.nullable(),
    }),
  discountType: yup
    .string()
    .oneOf(SUB_PLAN_DISCOUNT_TYPES, 'Invalid discount type')
    .default('flat'),
  discountStartDate: yup.date().nullable().default(null),
  discountEndDate: yup
    .date()
    .nullable()
    .default(null)
    .min(yup.ref('discountStartDate'), 'Discount end date must be after start date')
    .when('discountStartDate', {
      is: (date) => !!date,
      then: (schema) => schema.required('Discount end date is required when start date is set'),
    }),
});

const SubscriptionPlanSchema = yup.object({
  subPlanName: yup.string().trim().required('Plan name is required'),
  subPlanDescription: yup.string().trim().default(''),
  subPlanPricing: yup
    .array()
    .of(pricingSchema)
    .min(2, 'Both monthly and yearly pricing are required')
    .max(2, 'Only monthly and yearly pricing allowed')
    .test('unique-durations', 'Both monthly and yearly pricing must be provided', (value) => {
      if (!value) return false;
      const durations = value.map((p) => p.duration);
      return (
        durations.includes(SUB_PLAN_DURATION_MONTHLY) &&
        durations.includes(SUB_PLAN_DURATION_ANNUAL)
      );
    }),
  currency: yup.string().default('LKR'),
  features: yup.array().of(yup.string()).default([]),
  isActive: yup.boolean().default(true),
  sortOrder: yup
    .number()
    .typeError('Sort order must be a number')
    .integer('Sort order must be an integer')
    .default(0),
});

export default SubscriptionPlanSchema;
