import React from 'react';
import { getTrackBackground, Range } from 'react-range';
import Select from 'react-select';
import cityAPI from '../../../../api/cityAPI';
import useCityOptions from '../../../../components/hooks/useCityOptions';
import { nFormatter } from '../../../../ults/nFormatter';
import './style.scss';

const SearchBar = ({ filterURL, onSubmit }) => {
  const STEP = 1000000;
  const MIN = 0;
  const MAX = 10000000000;
  const { cityOptions, isLoadingCity } = useCityOptions();
  const arr = JSON.parse(localStorage.getItem('cities'));

  const [filter, setFilter] = React.useState(() => {
    const data = arr.filter((x) => x.value === parseInt(filterURL?.cityId));
    return {
      PageSize: 9,
      PageNumber: 1,
      city: data[0] || null,
      district: '',
      price: [MIN, MAX],
      keyword: '',
    };
  });

  //city
  const handleChangeCity = (value) => {
    setFilter({
      ...filter,
      city: value,
    });
  };

  //district
  const [districts, setDistricts] = React.useState([]);

  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);

  const [isDisabled, setIsDisabled] = React.useState(true);
  const selectDistrict = React.useRef();
  const onClear = () => {
    selectDistrict.current.select.clearValue();
  };

  React.useEffect(() => {
    try {
      const fetchDistricts = async () => {
        setIsDisabled(true);
        if (!filter.city) {
          onClear();
        }
        if (filter.city) {
          onClear();
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(
            filter?.city?.value
          );
          setDistricts(response.data);
          setIsLoadingDistrict(false);
          setIsDisabled(false);
        }
      };
      fetchDistricts();
    } catch (error) {
      console.log(error);
    }
  }, [filter?.city]);

  const handleChangeDistrict = (value) => {
    setFilter({
      ...filter,
      district: value,
    });
  };

  const districtOptions = districts.map((item) => {
    return { value: item.id, label: item.districtName };
  });
  const handleDelete = () => {
    setFilter({
      ...filter,
      city: '',
      district: '',
      price: [MIN, MAX],
      keyword: '',
    });
  };
  const handleChangeKeyword = (e) => {
    setFilter({
      ...filter,
      keyword: e.target.value,
    });
  };
  const handleOnFinalChange = (values) => {
    setFilter({
      ...filter,
      price: values,
    });
  };
  const handleSubmit = (filter) => {
    if (!onSubmit) return;
    onSubmit(filter);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div className="tab-bar" id="tab-bar">
        <div className="tab-bar__item">Nhà đất bán</div>
      </div>

      <div className="search-bar">
        <div>
          <div className="search-bar__input">
            <input
              type="text"
              id="txtSearch"
              placeholder="Tìm kiếm địa điểm, khu vực"
              onChange={handleChangeKeyword}
            />
            <div className="btn-request" onClick={() => handleSubmit(filter)}>
              <i className="fa fa-search" aria-hidden="true"></i> Tìm kiếm
            </div>
          </div>
          <div className="search-bar__filters">
            <div className="search-bar__option">
              <Select
                defaultValue={filter?.city}
                cacheOptions
                value={filter?.city}
                onChange={handleChangeCity}
                options={cityOptions}
                isLoading={isLoadingCity}
                placeholder="Tỉnh/Thành phố"
                loadingMessage={() => 'Đang tìm kiếm...'}
                noOptionsMessage={() => 'Không tìm thấy'}
              />
            </div>
            <div className="search-bar__option">
              <Select
                ref={selectDistrict}
                cacheOptions
                value={filter?.district}
                onChange={handleChangeDistrict}
                options={districtOptions}
                isLoading={isLoadingDistrict}
                placeholder="Quận/huyện..."
                loadingMessage={() => 'Đang tìm kiếm...'}
                noOptionsMessage={() => 'Không tìm thấy'}
                isDisabled={isDisabled}
              />
            </div>
            <div className="search-bar__option">
              <Range
                values={filter?.price}
                step={STEP}
                min={MIN}
                max={MAX}
                rtl={false}
                onChange={(values) => {
                  setFilter({
                    ...filter,
                    price: values,
                  });
                }}
                onFinalChange={handleOnFinalChange}
                renderTrack={({ props, children }) => (
                  <>
                    <output
                      style={{
                        fontSize: '14px',
                        marginTop: '-14px',
                        color: '#fff',
                      }}
                      id="output"
                    >
                      Từ&nbsp;
                      {nFormatter(filter?.price[0], 1)}
                      &nbsp;đến&nbsp;
                      {nFormatter(filter?.price[1], 1)}
                    </output>
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '32px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: filter.price,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '20px',
                      width: '15px',
                      borderRadius: '100%',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0px 2px 6px #AAA',
                    }}
                  >
                    <div
                      style={{
                        height: '16px',
                        width: '5px',
                        backgroundColor: isDragged ? '#548BF4' : '#CCC',
                      }}
                    />
                  </div>
                )}
              />
            </div>
            <div className="search-bar__option">
              <Select placeholder="Diện tích" isDisabled={true}></Select>
            </div>
            <div className="search-bar__option">
              <div className="handle-option">
                <div id="moreFilters">
                  <i
                    className="fa fa-chevron-circle-down"
                    aria-hidden="true"
                  ></i>
                  Thêm
                </div>
                <div id="deleteFilters" onClick={handleDelete}>
                  <i className="fa fa-refresh" aria-hidden="true"></i>Xóa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
