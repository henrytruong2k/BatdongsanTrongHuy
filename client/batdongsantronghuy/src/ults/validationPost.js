import * as yup from 'yup';

export const validationPost = yup.object().shape({
  Title: yup.string().required('Vui lòng nhập tiêu đề bài viết.'),
  Street: yup.string().required('Vui lòng nhập tên đường bài viết.'),
  NameContact: yup.string().required('Vui lòng nhập tên người viết.'),
  AddressContact: yup.string().required('Vui lòng nhập địa chỉ người viết.'),
  PhoneContact: yup
    .string()
    .required('Vui lòng nhập số điện thoại người viết.'),
  EmailContact: yup.string().required('Vui lòng nhập email người viết.'),
});
