import * as yup from 'yup';

const PHONE_REGEX = /^[0-9-()+ ]*$/;
export const validationRegister = yup.object().shape({
  fullname: yup
    .string()
    .required('Vui lòng điền đầy đủ họ tên.')
    .test(
      'should has at least two words',
      'Vui lòng nhập ít nhất 2 từ',
      (value) => {
        return value.split(' ').length >= 2;
      }
    ),
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Nhập tài khoản theo định dạng: yourname@example.com.'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự.'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu xác nhận.')
    .min(6, 'Vui lòng nhập ít nhất 6 kí tự.')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
  phoneNumber: yup
    .string()
    .required('Vui lòng nhập số điện thoại.')
    .min(10, 'Vui lòng nhập số điện thoại ít nhất 10 chữ số')
    .matches(PHONE_REGEX, 'Vui lòng kiểm tra lại kí tự'),
});
