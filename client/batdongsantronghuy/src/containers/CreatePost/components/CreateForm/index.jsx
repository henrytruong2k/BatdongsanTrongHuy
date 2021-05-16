import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Fab, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';

import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import SelectField from '../../../../components/form-controls/SelectField';
import useCityOptions from '../../../../components/CustomHook/useCityOptions';
import { Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { EXPDATE } from '../../../../constants/config';
import Select from 'react-select';
import cityAPI from '../../../../api/cityAPI';
import useProjectOptions from '../../../../components/CustomHook/useProjectOptions';
import useCategoryOptions from '../../../../components/CustomHook/useCategoryOptions';

moment.locale('vi');
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 1, 0),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  password: {
    width: '50%',
  },
  input: {
    marginBottom: theme.spacing(2),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(0.5),
    left: 0,
    right: 0,
  },
}));
const now = new Date();
const today = moment(now).format('YYYY-MM-DD');
const expPost = moment(now).add(EXPDATE, 'days').format('YYYY-MM-DD');

function CreateForm(props) {
  const classes = useStyles();
  const schema = '';

  const form = useForm({
    defaultValues: {
      Title: '',
      Street: '',
      CityId: '',
      DistrictId: '',
      Direction: '',
      Price: '',
      FrontiSpiece: '',
      Wayin: '',
      NumberofFloor: '',
      Bedroom: '',
      Furniture: '',
      Juridical: '',
      ImageFile: '',
      LocationX: '',
      LocationY: '',
      NameContact: '',
      AddressContact: '',
      PhoneContact: '',
      EmailContact: '',
      StartDate: today,
      EndDate: expPost,
      ProjectId: '',
      CategoryId: '',
    },
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  const { cityOptions, isLoadingCity } = useCityOptions();
  //select
  const [city, setCity] = useState(null);
  const handleChangeCity = (values) => {
    console.log('handle change city', values);
    setCity(values);
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        setIsDisabled(true);
        if (city) {
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(city.value);
          setDistricts(response.data);
          setIsLoadingDistrict(false);
          setIsDisabled(false);
        }
      };
      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  }, [city]);
  const districtOptions = districts.map((item) => {
    return { value: item.id, label: item.districtName };
  });

  const { projectOptions, isLoadingProject } = useProjectOptions();
  const { categoryOptions, isLoadingOption } = useCategoryOptions();
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          form={form}
          name="Title"
          label="Tiêu đề"
          className={classes.input}
        />
        <InputField
          form={form}
          name="Street"
          label="Đường"
          className={classes.input}
        />

        <SelectField
          form={form}
          name="CityId"
          options={cityOptions}
          isLoading={isLoadingCity}
          placeholder="Chọn thành phố..."
          loadingMessage={() => 'Đang tìm kiếm...'}
          // onChange={handleChangeCity}
        />

        <SelectField
          form={form}
          name="DistrictId"
          options={districtOptions}
          isLoading={isLoadingDistrict}
          disabled={isDisabled}
          placeholder="Chọn quận..."
          loadingMessage={() => 'Đang tìm kiếm...'}
        />

        <InputField
          form={form}
          name="Description"
          label="Mô tả"
          className={classes.input}
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Price"
          label="Giá"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="FrontiSpiece"
          label="Mặt tiền"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Wayin"
          label="Đường đi"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Direction"
          label="Hướng nhà"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="NumberofFloor"
          label="Số tầng"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Bedroom"
          label="Giường ngủ"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Furniture"
          label="Nội thất"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Juridical"
          label="Giấy tờ pháp lý"
        />
        <div>
          <label>Ảnh</label>
        </div>
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            type="file"
            name="ImageFile"
            id="upload-photo"
            name="upload-photo"
            onChange={(e) => form.setValue('ImageFile', e.target.files[0])}
          />
          <Fab
            color="secondary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddIcon /> Upload photo
          </Fab>
        </label>
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="LocationX"
          label="Tọa độ X"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="LocationY"
          label="Tọa độ Y"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="NameContact"
          label="Họ tên người bán"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="AddressContact"
          label="Địa chỉ người bán"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="PhoneContact"
          label="Số điện thoại liên hệ"
        />
        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="EmailContact"
          label="Email liên hệ"
        />
        <InputField
          label="Ngày bắt đầu"
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          defaultValue={today}
          name="StartDate"
        />
        <InputField
          form={form}
          label="Ngày kết thúc"
          className={`${classes.input} ${classes.password} pr-lg-2`}
          InputLabelProps={{ shrink: true, required: true }}
          name="EndDate"
          defaultValue={expPost}
          type="date"
        />
        {/* <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="ProjectId"
          label="Dự án"
        /> */}

        <SelectField
          form={form}
          name="ProjectId"
          options={projectOptions}
          isLoading={isLoadingProject}
          placeholder="Chọn dự án..."
          loadingMessage={() => 'Đang tìm kiếm...'}
        />
        <SelectField
          form={form}
          name="CategoryId"
          options={categoryOptions}
          isLoading={isLoadingOption}
          placeholder="Chọn loại bài viết..."
          loadingMessage={() => 'Đang tìm kiếm...'}
        />

        <div>
          <button disabled={isSubmitting} type="submit" className="btn-submit">
            Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
