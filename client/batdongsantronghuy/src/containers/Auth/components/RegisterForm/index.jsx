import {
  Avatar,
  Button,
  LinearProgress,
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
import { validationRegister } from '../../../../ults/validationRegister';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
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
  password: {},
  input: {
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(0.5),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const schema = validationRegister;
  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title}>Đăng ký tài khoản</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          form={form}
          name="fullname"
          label="Họ tên"
          className={classes.input}
        />
        <InputField
          form={form}
          name="email"
          label="Email"
          className={classes.input}
        />

        <PasswordField
          className={`mr-lg-2 pr-lg-1 ${classes.input}`}
          form={form}
          name="password"
          label="Mật khẩu"
        />
        <PasswordField
          className={`ml-lg-2 ${classes.input}`}
          form={form}
          name="confirmPassword"
          label="Mật khẩu xác nhận"
        />

        <InputField
          form={form}
          name="phoneNumber"
          label="Số điện thoại"
          className={classes.input}
        />
        <Button
          disabled={isSubmitting}
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
