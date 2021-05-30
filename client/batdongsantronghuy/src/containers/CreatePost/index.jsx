import React, { useState } from 'react';
import postAPI from '../../api/postAPI';
import CreateForm from './components/CreateForm';

function CreatePost(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const handleFormSubmit = async (values) => {
    try {
      const juridical = values['Juridical'].map((item) => item.label);
      const reqJuridical = juridical.join(', ');

      const request = {
        ...values,
        Juridical: reqJuridical,
        ProjectId: values['ProjectId'].value,
        CategoryId: values['CategoryId'].value,
      };
      console.log('handle Request', request);
      const response = await postAPI.createPost(request);
      console.log('response của create post: ', response);
    } catch (error) {
      console.log('Đăng bài thất bại: ', error);
    }
  };
  return (
    <div>
      <h1>Tạo bài viết mới</h1>
      <CreateForm onSubmit={handleFormSubmit} />
      {errorMessage && (
        <p style={{ color: 'red' }} className="text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CreatePost;
