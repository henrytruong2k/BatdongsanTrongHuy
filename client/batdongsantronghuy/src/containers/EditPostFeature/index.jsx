import React from 'react';
import InputField from '../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';

function EditPostFeature({ post }) {
  const form = useForm({});
  return (
    <div>
      <InputField
        name="Street"
        label="Đường"
        value={post.title}
        form={form}
        InputLabelProps={{ shrink: true, required: true }}
      />
    </div>
  );
}

export default EditPostFeature;
