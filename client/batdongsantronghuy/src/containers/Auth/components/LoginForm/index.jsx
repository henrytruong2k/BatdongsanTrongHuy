import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { FACEBOOK_ID, GOOGLE_ID } from '../../../../constants/config';
import { validationLogin } from '../../../../ults/validationLogin';
import './style.scss';

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

  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  socialLoginBtn: {
    width: '48%',
  },
}));

function LoginForm(props) {
  const { errorMessage } = props;
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

  //handle login facebook
  const [loading, setLoading] = useState(false);
  const responseFacebook = async (response) => {
    setLoading(true);
    const { onFacebookLogin } = props;
    if (onFacebookLogin) {
      await onFacebookLogin(response);
    }
    setLoading(false);
  };

  //handle login google
  const responseGoogle = async (response) => {
    setLoading(true);
    const { onGoogleLogin } = props;
    if (onGoogleLogin) {
      await onGoogleLogin(response);
    }
    setLoading(false);
  };
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      {loading && <LinearProgress className={classes.progress} />}
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
          disabled={isSubmitting || loading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Đăng nhập
        </Button>
      </form>
      {errorMessage && (
        <h5 className="text-center text-danger text-small mt-3 mb-0">
          *{errorMessage}
        </h5>
      )}
      <hr />
      <div className="d-flex justify-content-between">
        <div className={classes.socialLoginBtn}>
          <FacebookLogin
            appId={FACEBOOK_ID}
            fields="name,email,picture"
            scope="public_profile, email"
            callback={responseFacebook}
            icon="fa-facebook"
          />
        </div>
        <div className={classes.socialLoginBtn}>
          <GoogleLogin
            clientId={GOOGLE_ID}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="loginGoogleBtn"
              >
                <i className="fa fa-google" />
                <span>LOGIN WITH GOOGLE</span>
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
