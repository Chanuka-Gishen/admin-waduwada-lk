import * as yup from 'yup';
import { MERCHANT_TYPES } from 'src/constants/merchant-constants';

const registerMerchantSchema = yup.object({
  merchantFirstName: yup.string().required('First name is required'),

  merchantLastName: yup.string().required('Last name is required'),

  merchantEmail: yup.string().email('Please provide a valid email address'),

  merchantType: yup
    .string()
    .oneOf(MERCHANT_TYPES, 'Please select a valid merchant type')
    .required('Merchant type is required'),

  merchantPrimaryMobileNumber: yup
    .string()
    .transform((value) => (value ? value.replace(/\D/g, '') : value))
    .matches(/^7\d{8}$/, 'Primary mobile number must be 9 digits starting with 7')
    .required('Primary mobile number is required'),

  merchantSecondaryMobileNumber: yup
    .string()
    .transform((value) => (value ? value.replace(/\D/g, '') : value))
    .matches(/^[17]\d{8}$/, 'Secondary mobile number must be 9 digits starting with 1 or 7')
    .nullable()
    .transform((value) => value || null),

  merchantNicNumber: yup
    .string()
    .matches(
      /^([0-9]{9}[xXvV]|[0-9]{12})$/,
      'NIC number must be valid format: 9 digits with X/V or 12 digits'
    )
    .required('NIC number is required')
    .transform((value) => value?.trim()),

  merchantSubscription: yup.string().required('Subscription is required'),

  merchantMailingAddress: yup
    .string()
    .max(500, 'Address must be less than 500 characters')
    .when('merchantType', {
      is: 'carpenter',
      then: (schema) => schema.required('Address is required for carpenters'),
      otherwise: (schema) => schema.nullable().transform((value) => value || null),
    }),
});

export default registerMerchantSchema;
