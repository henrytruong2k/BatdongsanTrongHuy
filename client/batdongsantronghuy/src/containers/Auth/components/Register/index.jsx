import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

function Register(props) {
  const { closeDialog } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      //close dialog
      if (closeDialog) {
        closeDialog();
      }

      console.log('New user: ', user);
      enqueueSnackbar('Đăng kí thành công. Vui lòng kiểm tra email', {
        variant: 'success',
      });
    } catch (error) {
      console.log('Fail to register: ', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func,
};

export default Register;
