import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cityAPI from '../../api/cityAPI';

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const HomeContainer = () => {
  //get all cities
  const [options, setOptions] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(true);
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const fetchCities = async () => {
      const cities = await cityAPI.getAll();
      setOptions(cities.data);
      setIsLoadingCity(false);
    };
    fetchCities();
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
    setIsLoadingDistrict(true);
    const fetchDistricts = async () => {
      if (selectedOptionCity) {
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
        <p>
          {selectedOptionCity?.label} &nbsp; {selectedOptionDistrict?.label}
        </p>
      </Container>
    </HomeWrapper>
  );
};

HomeContainer.propTypes = {
  loggedRegister: PropTypes.string,
};
