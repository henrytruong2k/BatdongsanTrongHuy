import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {};

function SelectField(props) {
  const { form, name, ref, disabled, className, options, value, ...others } =
    props;
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          ref={ref}
          defaultOptions
          cacheOptions
          isClearable
          className={className}
          options={options}
          value={value}
          isDisabled={disabled}
          {...others}
        />
      )}
    />
  );
}

export default SelectField;
