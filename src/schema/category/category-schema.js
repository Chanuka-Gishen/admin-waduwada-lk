import * as yup from 'yup';

const categorySchema = yup.object({
  name: yup
    .string()
    .typeError('Name must be a string')
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim('Name cannot have leading/trailing spaces')
    .matches(
      /^[a-zA-Z0-9\s\-_]+$/,
      'Name can only contain letters, numbers, spaces, hyphens, and underscores'
    ),

  parent_id: yup
    .string()
    .uuid('Parent ID must be a valid UUID')
    .nullable()
    .optional()
    .transform((value) => (value === '' ? null : value)),

  icon_url: yup
    .string()
    .url('Icon URL must be a valid URL')
    .optional()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
      'Icon URL must be a valid image URL (png, jpg, jpeg, gif, svg, webp)'
    ),

  is_active: yup.boolean().typeError('Is active must be a boolean').default(true),
});

export default categorySchema;
