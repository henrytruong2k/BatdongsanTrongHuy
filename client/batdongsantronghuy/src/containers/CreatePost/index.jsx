import React, { useState } from 'react';
import Swal from 'sweetalert2';
import postAPI from '../../api/postAPI';
import CreateForm from './components/CreateForm';
import { useHistory } from 'react-router-dom';

function CreatePost(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const juridical = values['Juridical'].map((item) => item.label);
      const reqJuridical = juridical.join(',');
      const furniture = values['Furniture'].map((item) => item.label);
      const reqFurniture = furniture.join(',');
      const request = {
        ...values,
        Juridical: reqJuridical,
        Furniture: reqFurniture,
        ProjectId: values['ProjectId'].value,
        CategoryId: values['CategoryId'].value,
      };
      console.log('handle Request', request);

      const response = await postAPI.createPost(request);
      if (response.succeeded) {
        setLoading(false);
        history.push('/thanh-toan');
      }
      console.log('response của create post: ', response);
    } catch (error) {
      console.log('Đăng bài thất bại: ', error);
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Tạo bài viết mới</h1>
      <CreateForm onSubmit={handleFormSubmit} loading={loading} />
      {errorMessage && (
        <p style={{ color: 'red' }} className="text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CreatePost;
