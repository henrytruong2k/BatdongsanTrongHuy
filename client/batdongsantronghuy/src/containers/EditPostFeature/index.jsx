import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import postAPI from '../../api/postAPI';
import Loading from '../../components/Loading';
import EditForm from './components/EditForm';

function EditPostFeature({ post, loading }) {
  const [loadingAPI, setLoadingAPI] = useState(false);
  const history = useHistory();
  const handleFormSubmit = async (values, e) => {
    try {
      setLoadingAPI(true);
      console.log('handle Submit edit edit feature: ', values);
      const response = await postAPI.updatePost(values);
      console.log('response ', response);
      if (response.succeeded) {
        setLoadingAPI(false);
        history.push('/cai-dat-tai-khoan/quan-ly-bai-viet');
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: `Bài viết số ${response.data} đã được cập nhật`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const defaultCity = () => {
    return {
      value: post?.address?.city?.id,
      label: post?.address?.city?.cityName,
    };
  };

  const defaultDistrict = () => {
    return {
      value: post?.address?.district?.id,
      label: post?.address?.district?.districtName,
    };
  };

  const defaultCategory = () => {
    return {
      value: post?.category?.id,
      label: post?.category?.name,
    };
  };
  const defaultProject = () => {
    return {
      value: post?.project?.id,
      label: post?.project?.name,
    };
  };

  const objDefault = {
    defaultCity: defaultCity(),
    defaultDistrict: defaultDistrict(),
    defaultCategory: defaultCategory(),
    defaultProject: defaultProject(),
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <EditForm
          post={post}
          objDefault={objDefault}
          onSubmit={handleFormSubmit}
          loading={loadingAPI}
        />
      )}
    </>
  );
}

export default EditPostFeature;
