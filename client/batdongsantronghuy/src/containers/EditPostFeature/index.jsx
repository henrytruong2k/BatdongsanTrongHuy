import React, { useEffect, useState } from 'react';
import InputField from '../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import SelectField from '../../components/form-controls/SelectField';
import useCityOptions from '../../components/hooks/useCityOptions';
import Select from 'react-select';
import Loading from '../../components/Loading';
import { Button } from '@material-ui/core';

function EditPostFeature({ post, loading }) {
  const form = useForm({
    defaultValues: {
      CityId: post?.address?.cityId,
    },
  });
  const [cityIdValue, setCityIdValue] = useState(post?.address?.cityId);
  form.setValue('Title', post.title);

  const { cityOptions, isLoadingCity } = useCityOptions();
  const handleChangeCityId = (value) => {
    console.log('value', value);
  };

  const handleSubmit = (values, e) => {
    try {
      e.preventDefault();
      console.log('handle Submit edit: ', values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <form onSubmit={form.handleSubmit}>
            <InputField
              name="Title"
              label="Tiêu đề"
              form={form}
              InputLabelProps={{ shrink: true, required: true }}
            />
            <Select
              defaultValue={cityOptions.filter(
                (option) => option.value === post.address.cityId
              )}
              onChange={handleChangeCityId}
              form={form}
              name="CityId"
              defaultOptions
              cacheOptions
              isClearable
              options={cityOptions}
              isLoading={isLoadingCity}
              placeholder="Chọn thành phố..."
              loadingMessage={() => 'Đang tìm kiếm...'}
            />
            {/* <Select
              ref={selectDistrict}
              defaultOptions
              cacheOptions
              isClearable
              value={filter?.district}
              onChange={handleChangeDistrict}
              options={districtOptions}
              isLoading={isLoadingDistrict}
              placeholder="Chọn quận..."
              loadingMessage={() => 'Đang tìm kiếm...'}
              noOptionsMessage={() => 'Không tìm thấy kết quả'}
              isDisabled={isDisabled}
            /> */}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn-submit w-100 text-center mt-3"
            >
              Cập nhật
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditPostFeature;
