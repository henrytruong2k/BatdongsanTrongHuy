import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { formState } = form;
  // const hasError = formState.touchedFields[name] && formState.errors[name];
  // console.log(formState.errors[name], formState.touchedFields[name]);
  const hasError = formState.errors[name];
  return (
    <Controller
      render={({ field }) => (
        <TextField
          variant="outlined"
          margin="normal"
          {...field}
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={formState.errors[name]?.message}
          fullWidth
        />
      )}
      control={form.control}
      name={name}
    />
  );
}

export default InputField;