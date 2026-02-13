import * as yup from 'yup';
import { MERCHANT_TYPES, SHOP_SPECIALITIES } from 'src/constants/merchant-constants';

const registerMerchantSchema = yup.object({
  merchantFirstName: yup.string().required('First name is required'),

  merchantLastName: yup.string().required('Last name is required'),

  merchantEmail: yup.string().email('Please provide a valid email address'),

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

  merchantMailingAddress: yup
    .string()
    .max(500, 'Address must be less than 500 characters')
    .when('merchantType', {
      is: 'carpenter',
      then: (schema) => schema.required('Address is required for carpenters'),
      otherwise: (schema) => schema.nullable().transform((value) => value || null),
    }),

  shopName: yup
    .string()
    .trim()
    .min(2, 'Shop name must be at least 2 characters')
    .max(100, 'Shop name must be less than 100 characters')
    .required('Shop name is required'),

  shopType: yup
    .string()
    .oneOf(MERCHANT_TYPES, 'Please select a valid shop type')
    .required('Shop type is required'),

  shopIsAcceptingCustomOrders: yup.boolean().default(false),

  shopSpecialties: yup
    .array()
    .of(yup.string().oneOf(SHOP_SPECIALITIES, 'Invalid specialty selected'))
    .min(1, 'At least one specialty is required')
    .max(10, 'Maximum 10 specialties allowed')
    .required('Shop specialties are required'),

  shopSubscription: yup.string().required('Subscription is required'),

  shopLocationCity: yup
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters')
    .matches(/^[A-Za-z\s-']+$/, 'City can only contain letters, spaces, hyphens and apostrophes')
    .required('City is required'),

  shopLocationStreet: yup
    .string()
    .trim()
    .min(2, 'Street must be at least 2 characters')
    .max(200, 'Street must be less than 200 characters')
    .required('Street is required'),
});

export default registerMerchantSchema;
