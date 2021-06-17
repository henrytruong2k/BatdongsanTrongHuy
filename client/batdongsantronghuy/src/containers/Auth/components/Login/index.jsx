import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userAPI from '../../../../api/userAPI';
import { login, loginFacebook } from '../../userSlice';
import LoginForm from '../LoginForm';

function Login(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (user?.succeeded === false) {
        setErrorMessage(user.message);
        return;
      }
      if (closeDialog) {
        closeDialog();
      }
      console.log('New user: ', user);
    } catch (error) {
      console.log('Fail to login in login: ', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleLoginFacebook = async (values) => {
    try {
      console.log('handle login facebook: ', values);

      const action = loginFacebook({ token: values?.accessToken });
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (closeDialog) {
        closeDialog();
      }
      console.log('New user from fb: ', user);
    } catch (error) {
      console.log('Fal to login facebook: ', error);
    }
  };

  return (
    <div>
      <LoginForm
        onSubmit={handleFormSubmit}
        onFacebookLogin={handleLoginFacebook}
      />
      {errorMessage && (
        <p className="text-center text-danger mt-3 mb-0">*{errorMessage}</p>
      )}
    </div>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
};

export default Login;
