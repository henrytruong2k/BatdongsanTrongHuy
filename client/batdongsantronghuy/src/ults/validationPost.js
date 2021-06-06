import * as yup from 'yup';

export const validationPost = yup.object().shape({
  Title: yup.string().required('Vui lòng nhập tiêu đề.'),
});
