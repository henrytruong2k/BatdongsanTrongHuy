import {
  Avatar,
  Button,
  Input,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/form-controls/PasswordField';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 1, 0),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const schema = yup.object().shape({
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
      .matches(
        EMAIL_REGEX,
        'Nhập tài khoản theo định dạng: yourname@example.com.'
      ),
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
  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title}>Đăng ký tài khoản</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField form={form} name="fullname" label="Họ tên" />
        <InputField form={form} name="email" label="Email" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField
          form={form}
          name="confirmPassword"
          label="Xác nhận Password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
