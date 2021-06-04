import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Fab, makeStyles, TextField } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import SelectField from '../../../../components/form-controls/SelectField';
import AddIcon from '@material-ui/icons/Add';
import { EXPDATE } from '../../../../constants/config';
import cityAPI from '../../../../api/cityAPI';
import { colourOptions, juridicalOptions } from '../../../../data/data';
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
  select: {
    margin: theme.spacing(1, 0),
    width: '50%',
    zIndex: '99',
    height: '56px',
  },
  input: {
    marginBottom: theme.spacing(2),
    zIndex: '1',
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
      Description: '',
      Price: '',
      FrontiSpiece: '',
      Wayin: '',
      NumberofFloor: '',
      Bedroom: '',
      Furniture: '',
      Juridical: [colourOptions[1], colourOptions[2]],
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
      getValues: null,
    },
    // resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;
  const { cityOptions, isLoadingCity } = useCityOptions();
  //select
  const [city, setCity] = useState(1);
  const [district, setDistrict] = useState(1);

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
        if (city) {
          onClear();
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
    return { value: parseInt(item.id), label: item.districtName };
  });
  const { projectOptions, isLoadingProject } = useProjectOptions();
  const { categoryOptions, isLoadingOption } = useCategoryOptions();

  const [desc, setDesc] = useState('<p>Nhà cực <em>rẻ và đẹp</em>!</p>');
  const onEditorChange = (e) => {
    setDesc(e.editor.getData());
  };

  const onSubmit = async (values) => {
    const { onSubmit } = props;
    const newValues = { ...values, Description: desc };
    if (onSubmit) {
      await onSubmit(newValues);
    }
    // form.reset();
  };

  //map

  const [position, setPosition] = useState({
    lat: 10.772329000000015,
    lng: 106.69806,
  });
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
              ? `Tọa độ của bạn ${position}`
              : 'Click vào để chọn địa điểm của bạn'}
          </span>
        </Popup>
      </Marker>
    );
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h3>Thông tin bài viết</h3>
        <div className="post">
          <InputField
            className={`${classes.input} ${classes.password} pr-lg-2`}
            form={form}
            name="Title"
            label="Tiêu đề"
          />

          <InputField
            className={`${classes.input} ${classes.password}`}
            form={form}
            name="Street"
            label="Đường"
          />

          <SelectField
            className={`${classes.select} pr-lg-2`}
            form={form}
            name="CityId"
            options={cityOptions}
            isLoading={isLoadingCity}
            placeholder="Chọn thành phố..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            onChange={(value) => {
              setCity(value);

              form.setValue('CityId', value.value);
            }}
          />

          <SelectField
            ref={selectDistrict}
            className={classes.select}
            form={form}
            name="DistrictId"
            options={districtOptions}
            isLoading={isLoadingDistrict}
            disabled={isDisabled}
            placeholder="Chọn quận..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            value={district}
            onChange={(value) => {
              setDistrict(value);
              form.setValue('DistrictId', value.value);
            }}
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
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="Price"
          label="Giá"
          type="number"
        />
        <InputField
          className={`${classes.input} ${classes.password}`}
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
          className={`${classes.input} ${classes.password} `}
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
          className={`${classes.input} ${classes.password} `}
          form={form}
          name="Bedroom"
          label="Giường ngủ"
          type="number"
        />

        <div className="d-flex">
          <SelectField
            form={form}
            defaultValue={[juridicalOptions[1], juridicalOptions[2]]}
            isMulti
            name="Juridical"
            options={juridicalOptions}
            className={`basic-multi-select ${classes.select} ${classes.input} ${classes.password} pr-lg-2`}
            classNamePrefix="select"
            placeholder="Chọn nội thất..."
            noOptionsMessage={() => 'Bạn đã chọn hết'}
          />

          <SelectField
            form={form}
            defaultValue={[colourOptions[1], colourOptions[2]]}
            isMulti
            name="Juridical"
            options={colourOptions}
            className={`basic-multi-select ${classes.select} ${classes.input} ${classes.password} pr-lg-2`}
            classNamePrefix="select"
            placeholder="Chọn giấy tờ..."
            noOptionsMessage={() => 'Bạn đã chọn hết'}
          />
        </div>
        <div className="w-100">
          <label>Ảnh: &nbsp;</label>

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
        </div>

        <div className="my-5">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
          </MapContainer>
        </div>

        <InputField
          className={`${classes.input} ${classes.password} pr-lg-2`}
          form={form}
          name="NameContact"
          label="Họ tên người bán"
        />
        <InputField
          className={`${classes.input} ${classes.password} `}
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
          className={`${classes.input} ${classes.password}`}
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
          className={`${classes.input} ${classes.password} `}
          InputLabelProps={{ shrink: true, required: true }}
          name="EndDate"
          defaultValue={expPost}
          type="date"
        />

        <div className="d-flex">
          <SelectField
            form={form}
            name="ProjectId"
            options={projectOptions}
            isLoading={isLoadingProject}
            placeholder="Chọn dự án..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={`${classes.select} pr-lg-2`}
          />
          <SelectField
            form={form}
            name="CategoryId"
            options={categoryOptions}
            isLoading={isLoadingOption}
            placeholder="Chọn loại bài viết..."
            loadingMessage={() => 'Đang tìm kiếm...'}
            className={classes.select}
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
