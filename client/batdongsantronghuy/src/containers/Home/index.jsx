import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cityAPI from '../../api/cityAPI';

import postAPI from '../../api/postAPI';
import PostList from '../Project/components/PostList';
import { getTrackBackground, Range } from 'react-range';

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 100px;
`;

export const HomeContainer = () => {
  //get all cities
  const [options, setOptions] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(true);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  console.log('isLoadingDistrict: ', isLoadingDistrict);
  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const cities = await cityAPI.getAll();
      setOptions(cities.data);
      setIsLoadingCity(false);
    };
    fetchCities();

    const fetchPosts = async () => {
      const postList = await postAPI.getAll();
      setPostList(postList.data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const cityOptions = options.map((item) => {
    return { value: item.id, label: item.cityName };
  });

  const [selectedOptionCity, setSelectedOptionCity] = useState(null);
  const handleChangeCity = (value) => {
    setSelectedOptionCity(value);
  };

  //get all districts by city id
  const selectDistrict = useRef();
  const onClear = () => {
    selectDistrict.current.select.clearValue();
  };
  const [districtOptions, setDistrictOptions] = useState([]);
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedOptionCity) {
        setIsLoadingDistrict(true);
        const districts = await cityAPI.getDistrictsByCityId(
          selectedOptionCity.value
        );
        setDistrictOptions(districts.data);

        setIsLoadingDistrict(false);
        onClear();
        setIsDisabled(false);
      }
    };
    fetchDistricts();
  }, [selectedOptionCity]);
  const [selectedOptionDistrict, setSelectedOptionDistrict] = useState(null);
  const handleChangeDistrict = (value) => {
    setSelectedOptionDistrict(value);
  };

  const districtOptionsResponse = districtOptions.map((item) => {
    return { value: item.id, label: item.districtName };
  });

  //react-range
  const STEP = 500000;
  const MIN = 0;
  const MAX = 10000000000;
  const [values, setValues] = React.useState([0, 10]);

  //redux for register
  const loggedRegister = useSelector((state) => state.user.current);

  const [isClicked, setIsClicked] = useState(false);
  const handleSearch = async (city, district) => {
    setIsClicked(true);
    city = selectedOptionCity?.value;
    district = selectedOptionDistrict?.value;
    if (city) {
      setIsLoading(true);
      const cityPost = await postAPI.getPostByCityId(city);
      console.log('cityPost: ', cityPost.data);
      setIsLoading(false);
      setPostList(cityPost.data);
      console.log(cityPost.data.length);
      if (district) {
        setIsLoading(true);
        const districtPost = await postAPI.getPostByDistrictId(district);
        console.log('districtPost: ', districtPost);
        setIsLoading(false);
        setPostList(districtPost.data);
      }
    }
  };
  return (
    <HomeWrapper>
      <Container>
        <h1 className="text-center">This is home page</h1>
        {loggedRegister.url && (
          <a href={loggedRegister.url}>{loggedRegister.url}</a>
        )}
        <Select
          defaultOptions
          cacheOptions
          value={selectedOptionCity}
          onChange={handleChangeCity}
          options={cityOptions}
          isLoading={isLoadingCity}
          placeholder="Chọn thành phố..."
          loadingMessage={() => 'Đang tìm kiếm...'}
        />
        <Select
          ref={selectDistrict}
          defaultOptions
          cacheOptions
          value={selectedOptionDistrict}
          onChange={handleChangeDistrict}
          options={districtOptionsResponse}
          isLoading={isLoadingDistrict}
          placeholder="Chọn quận..."
          loadingMessage={() => 'Đang tìm kiếm...'}
          noOptionsMessage={() => 'Không tìm thấy kết quả'}
          isDisabled={isDisabled}
        />

        {/* react-range */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            rtl={false}
            onChange={(values) => {
              setValues(values);
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
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
                      values,
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
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '42px',
                  width: '42px',
                  borderRadius: '4px',
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
          <output style={{ marginTop: '30px' }} id="output">
            Từ&nbsp;
            {Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(values[0])}
            &nbsp;đến&nbsp;
            {Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(values[1])}
          </output>
        </div>

        <Button type="submit" onClick={handleSearch}>
          TÌM KIẾM
        </Button>

        {isClicked && (
          <p>
            Đã tìm kiếm {postList.length} phù hợp cho
            {selectedOptionCity?.label}
            &nbsp;
            {selectedOptionDistrict?.label}
          </p>
        )}

        <PostList posts={postList} loading={isLoading} />
      </Container>
    </HomeWrapper>
  );
};

HomeContainer.propTypes = {
  loggedRegister: PropTypes.string,
};
