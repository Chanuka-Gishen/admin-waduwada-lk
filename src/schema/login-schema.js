import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('User Name is required'),
  password: Yup.string().required('Password is required'),
});

export default loginSchema;
