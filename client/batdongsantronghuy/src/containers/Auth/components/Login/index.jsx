import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';

function Login(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //close dialog
      if (closeDialog) {
        closeDialog();
      }

      console.log('New user: ', user);
    } catch (error) {
      console.log('Fail to register: ', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
      setErrorMessage(error.message);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} />
      {errorMessage && (
        <p style={{ color: 'red' }} className="text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
};

export default Login;
