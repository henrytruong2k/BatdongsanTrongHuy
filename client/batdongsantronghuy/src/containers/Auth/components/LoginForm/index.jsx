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
import { validationLogin } from '../../../../ults/validationLogin';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(2, 2, 0),
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

  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const schema = validationLogin;
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography className={classes.title}>Đăng nhập</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          form={form}
          name="email"
          label="Email"
          className={classes.input}
        />

        <PasswordField
          className={classes.input}
          form={form}
          name="password"
          label="Mật khẩu"
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          fullWidth
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
