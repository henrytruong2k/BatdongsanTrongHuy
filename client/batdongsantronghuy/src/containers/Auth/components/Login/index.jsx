import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, loginFacebook, loginGoogle } from '../../userSlice';
import LoginForm from '../LoginForm';

function Login(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const handleFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      if (user?.succeeded === false) {
        setErrorMessage(user.message);
        return;
      } else {
        history.push('/');
      }
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('Fail to login in login: ', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleLoginFacebook = async (values) => {
    try {
      const action = loginFacebook({
        token: values?.accessToken,
        image: values?.picture.data.url,
      });
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (closeDialog) {
        closeDialog();
      }
      console.log('New user from fb: ', user);
    } catch (error) {
      console.log('Failed to login facebook: ', error);
    }
  };
  const handleLoginGoogle = async (values) => {
    try {
      //handle get images from values.profileObj

      const action = loginGoogle({
        token: values?.tokenId,
        image: values?.profileObj?.imageUrl,
      });
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (closeDialog) {
        closeDialog();
      }
      console.log('New user from google: ', user);
    } catch (error) {
      console.log('Failed to login google: ', error);
    }
  };

  return (
    <div>
      <LoginForm
        onSubmit={handleFormSubmit}
        onFacebookLogin={handleLoginFacebook}
        onGoogleLogin={handleLoginGoogle}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default Login;
