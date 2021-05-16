import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
};

function InputField(props) {
  const { form, name, label, disabled, className, type, ...others } = props;

  const { formState } = form;

  const hasError = formState.errors[name];
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <TextField
          className={className}
          variant="outlined"
          {...field}
          type={type}
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={formState.errors[name]?.message}
          {...others}
          fullWidth
        />
      )}
    />
  );
}

export default InputField;
