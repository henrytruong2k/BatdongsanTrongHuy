import React from 'react';
import postAPI from '../../api/postAPI';
import CreateForm from './components/CreateForm';

function CreatePost(props) {
  const handleFormSubmit = async (values) => {
    try {
      console.log('values: ', values);
      const request = {
        ...values,
        CityId: values['CityId'].value,
        DistrictId: values['DistrictId'].value,
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
    </div>
  );
}

export default CreatePost;
