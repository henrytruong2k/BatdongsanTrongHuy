import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function Register(props) {
  const handleFormSubmit = (values) => {
    console.log('handleFormSubmit:', values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Register;
