import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import useCityOptions from '../../../../components/hooks/useCityOptions';
import Select from 'react-select';
import { Button, makeStyles } from '@material-ui/core';
import useDistrictOptions from '../../../../components/hooks/useDistrictOptions';
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import 'moment/locale/vi';
import useCategoryOptions from '../../../../components/hooks/useCategoryOptions';
import useProjectOptions from '../../../../components/hooks/useProjectOptions';
import L from 'leaflet';
import Tooltip from '@material-ui/core/Tooltip';
import './style.scss';
import AddIcon from '@material-ui/icons/Add';
import {
  MapContainer,
  useMapEvents,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { Fab, Backdrop, CircularProgress } from '@material-ui/core';
import { validationPost } from '../../../../ults/validationPost';
import { yupResolver } from '@hookform/resolvers/yup';

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
function EditForm(props) {
  const classes = useStyles();

  const { post, objDefault, loading } = props;

  const [position, setPosition] = useState({
    lat: post?.locationX,
    lng: post?.locationY,
  });

  //handle map
  const markerRef = useRef(null);
  const markerIcon = new L.icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });
  const [draggable, setDraggable] = useState(false);
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
    setDraggable(true);
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
        <Popup minWidth={100}>
          <span onClick={toggleDraggable}>
            {draggable ? (
              'Bất động sản của bạn đã cập nhập và hiện đang ở đây'
            ) : (
              <Tooltip title="Click vào để cập nhật bất động sản của bạn" arrow>
                <div className="mapping d-flex">
                  <img
                    src={post?.images[0]?.url}
                    alt={post?.title}
                    width="50px"
                    height="50px"
                  />
                  <div>
                    <b>
                      Bạn đang ở đây,&nbsp;
                      {post?.address?.street},&nbsp;
                      {post?.address?.district?.districtName},
                      {post?.address?.city?.cityName}.
                    </b>
                  </div>
                </div>
              </Tooltip>
            )}
          </span>
        </Popup>
      </Marker>
    );
  };

  //handle form
  const schema = validationPost;
  const form = useForm({
    defaultValues: {
      Title: post?.title,
      Street: post?.address?.street,
      CityId: post?.address?.cityId,
      DistrictId: post?.address?.districtId,
      Direction: post?.direction,
      Description: post?.description,
      Price: post?.price,
      FrontiSpiece: post?.frontiSpiece,
      Wayin: post?.wayin,
      NumberofFloor: post?.numberofFloor,
      Bedroom: post?.bedroom,
      Furniture: post?.furniture,
      Juridical: post?.juridical,
      ImageFile: post?.images,
      LocationX: post?.locationX,
      LocationY: post?.locationY,
      NameContact: post?.nameContact,
      AddressContact: post?.addressContact,
      PhoneContact: post?.phoneContact,
      EmailContact: post?.emailContact,
      StartDate: moment(post?.startDate).format('YYYY-MM-DD'),
      EndDate: moment(post?.endDate).format('YYYY-MM-DD'),
      ProjectId: post?.project?.id,
      CategoryId: post?.category?.id,
    },
    resolver: yupResolver(schema),
  });

  const [cityIdValue, setCityIdValue] = useState(post?.address?.cityId);
  // const [districtIdValue, setCityIdValue] = useState(post?.address?.cityId);

  const { cityOptions, isLoadingCity } = useCityOptions();
  const { districtOptions, isLoadingDistrict } =
    useDistrictOptions(cityIdValue);
  const { categoryOptions, isLoadingOption } = useCategoryOptions();
  const { projectOptions, isLoadingProject } = useProjectOptions();

  const handleChangeCityId = (value) => {
    setCityIdValue(value.value);
    form.setValue('CityId', value.value);
  };
  const handleChangeDistrictId = (value) => {
    form.setValue('DistrictId', value.value);
  };
  const handleChangeCategoryId = (value) => {
    form.setValue('CategoryId', value.value);
  };
  const handleChangeProjectId = (value) => {
    form.setValue('ProjectId', value.value);
  };
  //CKEditor
  const [desc, setDesc] = useState(post?.description);
  const onEditorChange = (e) => {
    setDesc(e.editor.getData());
  };

  //handle submit
  const onSubmit = async (values, e) => {
    const { onSubmit } = props;
    const newValues = {
      ...values,
      Description: desc,
      LocationX: position?.lat,
      LocationY: position?.lng,
      id: post?.id,
    };
    console.log('value on Submit edit form: ', newValues);
    if (onSubmit) {
      await onSubmit(newValues);
    }
    form.reset();
  };

  //handle images
  const [imgs, setImgs] = useState(post?.images);
  console.log('imgs', imgs);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress size="5rem" color="inherit" />
      </Backdrop>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputLeft}
          form={form}
          name="Title"
          label="Tiêu đề"
          autoFocus={true}
        />

        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputRight}
          form={form}
          name="Street"
          label="Đường"
        />
        <div className="d-flex">
          <Select
            defaultValue={objDefault.defaultCity}
            className={classes.selectLeft}
            onChange={handleChangeCityId}
            form={form}
            styles={customStyles}
            name="CityId"
            defaultOptions
            cacheOptions
            options={cityOptions}
            isLoading={isLoadingCity}
            placeholder="Chọn thành phố..."
            loadingMessage={() => 'Đang tìm kiếm...'}
          />
          <Select
            defaultValue={objDefault.defaultDistrict}
            className={classes.selectRight}
            styles={customStyles}
            onChange={handleChangeDistrictId}
            form={form}
            name="DistrictId"
            defaultOptions
            cacheOptions
            options={districtOptions}
            isLoading={isLoadingDistrict}
            placeholder="Chọn quận..."
            loadingMessage={() => 'Đang tìm kiếm...'}
          />
        </div>
        <div className="w-100">
          <CKEditor data={desc} onChange={onEditorChange} />
        </div>
        <div className="ckeditor-review mt-3">
          <p>Bản nháp:&nbsp;</p>
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>
        </div>

        <InputField
          InputLabelProps={{ shrink: true, required: true }}
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
          InputLabelProps={{ shrink: true, required: true }}
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
          InputLabelProps={{ shrink: true, required: true }}
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
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputRight}
          form={form}
          name="Direction"
          label="Hướng nhà"
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputLeft}
          form={form}
          name="NumberofFloor"
          label="Số tầng"
          type="number"
          inputProps={{ min: '0', step: '1' }}
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputRight}
          form={form}
          name="Bedroom"
          label="Giường ngủ"
          type="number"
          inputProps={{ min: '0', step: '1' }}
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputLeft}
          form={form}
          name="Furniture"
          label="Nội thất"
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputRight}
          form={form}
          name="Juridical"
          label="Giấy tờ"
        />
        <div>
          <label htmlFor="upload-photo">
            <input
              className="d-none"
              type="file"
              name="ImageFile"
              id="upload-photo"
              multiple={true}
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
                  src={file.url}
                  alt={file.post.title}
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
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputLeft}
          form={form}
          name="NameContact"
          label="Họ tên người bán"
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputRight}
          form={form}
          name="AddressContact"
          label="Địa chỉ người bán"
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
          className={classes.inputLeft}
          form={form}
          name="PhoneContact"
          label="Số điện thoại liên hệ"
        />
        <InputField
          InputLabelProps={{ shrink: true, required: true }}
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
          name="StartDate"
        />
        <InputField
          form={form}
          label="Ngày kết thúc"
          className={classes.inputRight}
          InputLabelProps={{ shrink: true, required: true }}
          name="EndDate"
          type="date"
        />
        <div className="d-flex">
          <Select
            defaultValue={objDefault.defaultProject}
            styles={customStyles}
            form={form}
            name="ProjectId"
            options={projectOptions}
            isLoading={isLoadingProject}
            placeholder="Chọn dự án..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={classes.selectLeft}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
            onChange={handleChangeProjectId}
          />
          <Select
            defaultValue={objDefault.defaultCategory}
            styles={customStyles}
            form={form}
            name="CategoryId"
            options={categoryOptions}
            isLoading={isLoadingOption}
            placeholder="Chọn loại bài viết..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={classes.selectRight}
            noOptionsMessage={() => 'Không tìm thấy kết quả'}
            onChange={handleChangeCategoryId}
          />
        </div>
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
  );
}

export default EditForm;
