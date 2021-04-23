import * as yup from 'yup';

export const validationLogin = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Nhập tài khoản theo định dạng: yourname@example.com.'),
  password: yup.string().required('Vui lòng nhập mật khẩu.'),
});
