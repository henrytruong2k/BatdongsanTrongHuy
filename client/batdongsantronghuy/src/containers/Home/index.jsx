import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cityAPI from '../../api/cityAPI';
import { useSnackbar } from 'notistack';
import postAPI from '../../api/postAPI';
import PostList from '../Project/components/PostList';

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

  //redux for register
  const loggedRegister = useSelector((state) => state.user.current);

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar('You clicked to show noti', { variant: 'success' });
  };
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
        <Button onClick={handleClick}>Show noti</Button>
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
