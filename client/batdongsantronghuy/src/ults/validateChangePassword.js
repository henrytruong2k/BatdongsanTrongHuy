import * as yup from 'yup';

export const validateChangePassword = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự.'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự.'),

  confirmPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu xác nhận.')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự.')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
});
