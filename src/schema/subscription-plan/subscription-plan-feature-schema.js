import * as yup from 'yup';

const SubscriptionPlanFeatureSchema = yup.object({
  feature: yup
    .string()
    .trim()
    .min(1, 'Feature must be at least 1 character')
    .max(255, 'Feature cannot exceed 255 characters')
    .required('Feature cannot be empty'),
});

export default SubscriptionPlanFeatureSchema;
