import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Fab,
  makeStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import SelectField from '../../../../components/form-controls/SelectField';
import AddIcon from '@material-ui/icons/Add';
import { EXPDATE } from '../../../../constants/config';
import Select from 'react-select';
import cityAPI from '../../../../api/cityAPI';
import { furnitureOptions, juridicalOptions } from '../../../../data/data';
import useCityOptions from '../../../../components/hooks/useCityOptions';
import useProjectOptions from '../../../../components/hooks/useProjectOptions';
import useCategoryOptions from '../../../../components/hooks/useCategoryOptions';
import CKEditor from 'ckeditor4-react';
import useGeoLocation from '../../../../components/hooks/useGeoLocation';
import MarkersMap from '../../../Project/components/PostDetail/components/MarkersMap';
import L from 'leaflet';

import {
  MapContainer,
  useMapEvents,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { validationPost } from '../../../../ults/validationPost';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

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
    zIndex: '1',
  },
  selectLeft: {
    width: '49%',
    marginRight: '1%',
    zIndex: '99',
    marginBottom: theme.spacing(2),
  },
  selectRight: {
    width: '49%',
    marginLeft: '1%',
    zIndex: '99',
    marginBottom: theme.spacing(2),
  },
  inputLeft: {
    width: '49%',
    zIndex: 1,
    marginRight: '1%',
    marginBottom: theme.spacing(2),
  },
  inputRight: {
    width: '49%',
    zIndex: 1,
    marginLeft: '1%',
    marginBottom: theme.spacing(2),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(0.5),
    left: 0,
    right: 0,
  },
  backdrop: {
    zIndex: 999,
    color: '#fff',
  },
}));

//custom select
const customStyles = {
  control: (base) => ({
    ...base,
    height: 56,
    minHeight: 56,
  }),
};

const now = new Date();
const today = moment(now).format('YYYY-MM-DD');
const expPost = moment(now).add(EXPDATE, 'days').format('YYYY-MM-DD');

function CreateForm(props) {
  const { loading } = props;
  const classes = useStyles();
  const schema = validationPost;

  const loggedInUser = useSelector((state) => state.user.current.user);

  const form = useForm({
    defaultValues: {
      Title: '',
      Street: '',
      CityId: '',
      DistrictId: '',
      Direction: '',
      Description: '',
      Price: '',
      FrontiSpiece: '',
      Wayin: '',
      NumberofFloor: 1,
      Bedroom: 1,
      Furniture: [furnitureOptions[0], furnitureOptions[1]],
      Juridical: [juridicalOptions[0], juridicalOptions[1]],
      ImageFile: '',
      LocationX: '',
      LocationY: '',
      NameContact: loggedInUser?.userName,
      AddressContact: loggedInUser?.address,
      PhoneContact: loggedInUser?.phoneNumber,
      EmailContact: loggedInUser?.email,
      StartDate: today,
      EndDate: expPost,
      ProjectId: '',
      CategoryId: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;
  const { cityOptions, isLoadingCity } = useCityOptions();

  //select
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState({});

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [districts, setDistricts] = useState([]);

  //function reset district
  const selectDistrict = useRef();

  const onClear = () => {
    setDistrict(null);
  };
  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        setIsDisabled(true);
        if (city === null) {
          onClear();
        }
        if (city) {
          onClear();
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(city?.value);
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
    return { value: parseInt(item.id), label: item.districtName };
  });
  const { projectOptions, isLoadingProject } = useProjectOptions();

  const { categoryOptions, isLoadingOption } = useCategoryOptions();

  const [desc, setDesc] = useState('<p>Nhà cực <em>rẻ và đẹp</em>!</p>');
  const onEditorChange = (e) => {
    setDesc(e.editor.getData());
  };

  const onSubmit = async (values) => {
    console.log('create post image', values.ImageFile);

    const { onSubmit } = props;

    const newValues = {
      ...values,
      Description: desc,
      LocationX: position.lat.toString(),
      LocationY: position.lng.toString(),
    };
    if (onSubmit) {
      await onSubmit(newValues);
    }
    // form.reset();
  };
  //map
  const location = useGeoLocation();

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const showPosition = () => {
      if (!location.loaded) {
        return;
      }
      setPosition({
        lat: location?.coordinates?.lat,
        lng: location?.coordinates?.lng,
      });
    };
    showPosition();
  }, [location]);

  const markerIcon = new L.icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });

  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const DraggableMarker = () => {
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={markerIcon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? `Bất động sản của bạn ở đây`
              : 'Click vào để chọn địa điểm bất động sản của bạn'}
          </span>
        </Popup>
      </Marker>
    );
  };

  // images
  const [imgs, setImgs] = useState([]);
  const handleImages = (e) => {
    console.log('ảnh khi handleImages: ', e.target.files);
    setImgs(e.target.files);

    //submit form
    // form.setValue('ImageFile', e.target.files[0]);
    // form.setValue('ImageFile', imgs);

    form.setValue('ImageFile', e.target.files[0]);
  };
  const addImage = async (e) => {
    console.log('add image', e.target.files);
    const temp = { ...e.target.files };
    console.log('temp: ', temp);
    const list = [...imgs];
    list.push(...e.target.files);
    await setImgs([...list]);
  };
  return (
    <div className="mt-3">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress size="5rem" color="inherit" />
      </Backdrop>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h3>Thông tin bài viết</h3>
        <div className="post">
          <InputField
            className={classes.inputLeft}
            form={form}
            name="Title"
            label="Tiêu đề"
            autoFocus={true}
          />

          <InputField
            className={classes.inputRight}
            form={form}
            name="Street"
            label="Đường"
          />

          <Select
            className={classes.selectLeft}
            onChange={(value) => {
              setCity(value);
              form.setValue('CityId', value?.value);
            }}
            styles={customStyles}
            form={form}
            name="CityId"
            defaultOptions
            cacheOptions
            isClearable
            options={cityOptions}
            isLoading={isLoadingCity}
            placeholder="Chọn thành phố..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
          />

          <Select
            className={classes.selectRight}
            ref={selectDistrict}
            styles={customStyles}
            defaultOptions
            cacheOptions
            isClearable
            value={district}
            onChange={(value) => {
              setDistrict(value);
              form.setValue('DistrictId', value?.value);
            }}
            options={districtOptions}
            isLoading={isLoadingDistrict}
            placeholder="Chọn quận..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
            isDisabled={isDisabled}
          />

          <div className="w-100">
            <CKEditor data={desc} onChange={onEditorChange} />
          </div>

          <div className="ckeditor-review mt-3">
            <p>Bản nháp:&nbsp;</p>
            <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          </div>
        </div>

        <InputField
          className={classes.inputLeft}
          form={form}
          name="Price"
          label="Giá (VND)"
          type="number"
          inputProps={{ min: '0', step: '1000' }}
          InputProps={{
            endAdornment: <p className="mb-0">VND</p>,
          }}
        />
        <InputField
          className={classes.inputRight}
          form={form}
          name="FrontiSpiece"
          label="Mặt tiền"
          type="number"
          inputProps={{ min: '0', step: '1' }}
          InputProps={{
            endAdornment: (
              <p className="mb-0">
                m<sup>2</sup>
              </p>
            ),
          }}
        />
        <InputField
          className={classes.inputLeft}
          form={form}
          name="Wayin"
          label="Đường đi"
          type="number"
          inputProps={{ min: '0', step: '1' }}
          InputProps={{
            endAdornment: (
              <p className="mb-0">
                m<sup>2</sup>
              </p>
            ),
          }}
        />
        <InputField
          className={classes.inputRight}
          form={form}
          name="Direction"
          label="Hướng nhà"
        />
        <InputField
          className={classes.inputLeft}
          form={form}
          name="NumberofFloor"
          label="Số tầng"
          type="number"
          inputProps={{ min: '0', step: '1' }}
        />
        <InputField
          className={classes.inputRight}
          form={form}
          name="Bedroom"
          label="Giường ngủ"
          type="number"
          inputProps={{ min: '0', step: '1' }}
        />

        <div className="d-flex">
          <SelectField
            form={form}
            isMulti
            name="Furniture"
            options={furnitureOptions}
            className={clsx('basic-multi-select', classes.selectLeft)}
            classNamePrefix="select"
            placeholder="Chọn nội thất..."
            noOptionsMessage={() => 'Bạn đã chọn hết'}
            styles={customStyles}
          />

          <SelectField
            form={form}
            isMulti
            name="Juridical"
            options={juridicalOptions}
            className={clsx('basic-multi-select', classes.selectRight)}
            classNamePrefix="select"
            placeholder="Chọn giấy tờ..."
            noOptionsMessage={() => 'Bạn đã chọn hết'}
            styles={customStyles}
          />
        </div>
        <div className="w-100">
          <label>Ảnh: &nbsp;</label>

          <label htmlFor="upload-photo">
            <input
              className="d-none"
              type="file"
              name="ImageFile"
              id="upload-photo"
              multiple={true}
              onChange={handleImages}
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

          {imgs.length > 0 && (
            <div className="d-flex flex-wrap">
              {[...imgs].map((file) => (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="image-preview"
                />
              ))}
              <label className="add-image">
                <input
                  className="d-none"
                  type="file"
                  name="ImageFile"
                  id="upload-photo"
                  multiple={false}
                  onChange={addImage}
                />
                <AddIcon />
              </label>
            </div>
          )}
        </div>

        {position !== null && (
          <div className="my-5">
            <MapContainer center={position} zoom={17} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker />
            </MapContainer>
          </div>
        )}

        <InputField
          className={classes.inputLeft}
          form={form}
          name="NameContact"
          label="Họ tên người bán"
        />
        <InputField
          className={classes.inputRight}
          form={form}
          name="AddressContact"
          label="Địa chỉ người bán"
        />
        <InputField
          className={classes.inputLeft}
          form={form}
          name="PhoneContact"
          label="Số điện thoại liên hệ"
        />
        <InputField
          className={classes.inputRight}
          form={form}
          name="EmailContact"
          label="Email liên hệ"
        />
        <InputField
          label="Ngày bắt đầu"
          className={classes.inputLeft}
          form={form}
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          defaultValue={today}
          name="StartDate"
        />
        <InputField
          form={form}
          label="Ngày kết thúc"
          className={classes.inputRight}
          InputLabelProps={{ shrink: true, required: true }}
          name="EndDate"
          defaultValue={expPost}
          type="date"
        />

        <div className="d-flex">
          <SelectField
            styles={customStyles}
            form={form}
            name="ProjectId"
            options={projectOptions}
            isLoading={isLoadingProject}
            placeholder="Chọn dự án..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={classes.selectLeft}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
          />
          <SelectField
            styles={customStyles}
            form={form}
            name="CategoryId"
            options={categoryOptions}
            isLoading={isLoadingOption}
            placeholder="Chọn loại bài viết..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={classes.selectRight}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
          className="btn-submit w-100 text-center mt-3"
        >
          Đăng bài
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;