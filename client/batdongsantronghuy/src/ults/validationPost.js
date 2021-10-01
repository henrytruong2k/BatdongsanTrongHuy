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

  //upgrade
  Price: yup
    .number()
    .typeError('Diện tích đường đi bắt buộc phải là một con số.')
    .integer('Vui lòng nhập số tiền là số nguyên')
    .moreThan(100000, 'Hạn mức tối thiểu là 100.000 VND.'),
  FrontiSpiece: yup
    .number()
    .typeError('Diện tích mặt tiền bắt buộc phải là một con số.')
    .integer('Vui lòng nhập số diện tích mặt tiền là số nguyên')
    .moreThan(0, 'Vui lòng nhập số diện tích mặt tiền'),
  Wayin: yup
    .number()
    .typeError('Diện tích đường đi bắt buộc phải là một con số.')
    .integer('Vui lòng nhập số diện tích đường đi là số nguyên')
    .moreThan(0, 'Vui lòng nhập số diện tích đường đi'),
  Direction: yup.string().required('Vui lòng nhập hướng nhà.'),
  NumberofFloor: yup.string().required('Vui lòng nhập số tầng.'),
  Bedroom: yup.string().required('Vui lòng nhập số phòng ngủ.'),
});
