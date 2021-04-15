import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';

function Register(props) {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      console.log('New user: ', user);
      // enqueueSnackbar('Đăng kí thành công!', { variant: 'success' });
    } catch (error) {
      console.log('Fail to register: ', error);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Register;
