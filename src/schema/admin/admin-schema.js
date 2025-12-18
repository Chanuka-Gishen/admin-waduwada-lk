import * as Yup from 'yup';

import { USER_ROLE } from 'src/constants/user-role';

const adminSchema = Yup.object().shape({
  adminFirstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces')
    .optional(),

  adminLastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces')
    .optional(),

  adminEmail: Yup.string()
    .email('Invalid email format')
    .lowercase()
    .max(100, 'Email must be less than 100 characters')
    .optional(),

  adminRole: Yup.string()
    .oneOf([USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN], 'Invalid role')
    .optional(),

  adminIsActive: Yup.boolean().optional(),

  isAdminFirstLogin: Yup.boolean().optional(),
});

export default adminSchema;
