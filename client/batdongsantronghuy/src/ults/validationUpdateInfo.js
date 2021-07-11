import * as yup from 'yup';

const PHONE_REGEX = /^[0-9-()+ ]*$/;

export const validationUpdateInfo = yup.object().shape({
  FullName: yup
    .string()
    .nullable()
    .required('Vui lòng điền đầy đủ họ tên.')
    .test(
      'should has at least two words',
      'Vui lòng nhập ít nhất 2 từ.',
      (value) => {
        return value.split(' ').length >= 2;
      }
    ),
  Address: yup.string().nullable().required('Vui lòng nhập địa chỉ của bạn.'),

  PhoneNumber: yup
    .string()
    .nullable()
    .required('Vui lòng nhập số điện thoại.')
    .min(10, 'Vui lòng nhập số điện thoại ít nhất 10 chữ số.')
    .matches(PHONE_REGEX, 'Vui lòng kiểm tra lại kí tự.'),
});
