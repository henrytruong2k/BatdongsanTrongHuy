import { Button, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    username: yup.string().required('Nhập tài khoản'),
    password: yup.string().required('Nhập mật khẩu'),
  });
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log('FORM DANG KI: ', values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <h3 className="text-center">Form Đăng ký</h3>
      <InputField form={form} name="username" label="User Name" />
      <InputField form={form} name="password" label="Password" />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Đăng ký
      </Button>
    </form>
  );
}

export default RegisterForm;
