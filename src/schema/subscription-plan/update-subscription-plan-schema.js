import * as yup from 'yup';

const UpdateSubscriptionPlanSchema = yup.object({
  name: yup.string().trim().required('Plan name is required'),
  description: yup.string().trim().default(''),
  currency: yup.string().default('LKR'),
  is_active: yup.boolean().default(true),
  sort_order: yup
    .number()
    .typeError('Sort order must be a number')
    .integer('Sort order must be an integer')
    .default(0),
});

export default UpdateSubscriptionPlanSchema;
