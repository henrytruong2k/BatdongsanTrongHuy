import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cityAPI from '../../api/cityAPI';
import './style.scss';
import postAPI from '../../api/postAPI';
import PostList from '../Project/components/PostList';
import { getTrackBackground, Range } from 'react-range';
import useCityOptions from '../../components/CustomHook/useCityOptions';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 100px;
`;

export const HomeContainer = () => {
  //filter value
  const initialFilter = {
    city: '',
    district: '',
    price: [],
    keyword: '',
  };
  const [filter, setFilter] = useState(initialFilter);

  //get all cities

  const [districts, setDistricts] = useState([]);

  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const response = await postAPI.getAll();
        setPostList(response?.data);
        setIsLoading(false);
      };
      //execute
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const { cityOptions, isLoadingCity } = useCityOptions();
  const handleChangeCity = (value) => {
    setFilter({
      ...filter,
      city: value,
    });
  };

  //get all districts by city id

  //function reset district
  const selectDistrict = useRef();
  const onClear = () => {
    selectDistrict.current.select.clearValue();
  };

  useEffect(() => {
    try {
      const fetchDistricts = async () => {
        setIsDisabled(true);
        if (filter.city) {
          onClear();
          setIsLoadingDistrict(true);
          const response = await cityAPI.getDistrictsByCityId(
            filter.city.value
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

  //react-range
  const STEP = 1000000;
  const MIN = 0;
  const MAX = 100000000000;
  const [values, setValues] = React.useState([MIN, MAX]);

  const [isClicked, setIsClicked] = useState(false);

  const handleChangeKeyword = (event) => {
    setFilter({
      ...filter,
      keyword: event.target.value,
    });
  };
  const handleOnFinalChange = (values) => {
    console.log('handleOnFinalChange ', values);
    setFilter({
      ...filter,
      price: values,
    });
  };

  const renderPostList = useMemo(() => {
    return <PostList posts={postList} loading={isLoading} />;
  }, [postList, isLoading]);

  //handle search
  const handleSearch = async () => {
    setIsClicked(true);
    console.log(
      'khách hàng chọn: ' +
        ' city: ' +
        filter.city?.value +
        ' district: ' +
        filter.district?.value +
        ' price: ' +
        filter?.price +
        ' keyword: ' +
        filter.keyword
    );
    //filter city
    if (filter.city) {
      //có filter district
      if (filter.district) {
        if (filter.price.length > 0) {
          if (filter.keyword) {
            console.log('city+district+price+keyword');
            setIsLoading(true);
            const response = await postAPI.getPostByDistrictIdPrice(
              filter.district.value,
              filter.price[1],
              filter.price[0]
            );

            const result = response.data.filter((post) =>
              post.title.toLowerCase().includes(filter.keyword.toLowerCase())
            );
            setPostList(result);
            setIsLoading(false);
          } else {
            console.log('city+district+price');
            setIsLoading(true);
            const response = await postAPI.getPostByDistrictIdPrice(
              filter.district.value,
              filter.price[1],
              filter.price[0]
            );
            setPostList(response.data);
            setIsLoading(false);
          }
        } else if (filter.keyword) {
          console.log('city+district+keyword');
          setIsLoading(true);
          const response = await postAPI.getPostByDistrictId(
            filter.district.value
          );
          console.log(response.data);
          const result = response.data.filter((post) =>
            post.title.toLowerCase().includes(filter.keyword.toLowerCase())
          );
          console.log('result city+keyword', result);
          setIsLoading(false);
          setPostList(result);
        } else {
          setIsLoading(true);
          const response = await postAPI.getPostByDistrictId(
            filter.district.value
          );
          console.log(response.data);
          setPostList(response.data);
          setIsLoading(false);
        }
      }
      //ko district
      else {
        if (filter.price.length > 0) {
          if (filter.keyword) {
            console.log('city+price+keyword');
          } else {
            console.log('city+price');
            setIsLoading(true);
            const response = await postAPI.getPostByCityPrice(
              filter.city.value,
              filter.price[1],
              filter.price[0]
            );
            setPostList(response.data);
            setIsLoading(false);
            console.log('filter city+price: ', response.data);
          }
        } else if (filter.keyword) {
          console.log('city+keyword');
          setIsLoading(true);
          const response = await postAPI.getPostByCityId(filter.city.value);
          const postList = response.data;
          const result = postList.filter((post) =>
            post.title.toLowerCase().includes(filter.keyword.toLowerCase())
          );
          console.log('result city+keyword', result);
          setIsLoading(false);
          setPostList(result);
        } else {
          setIsLoading(true);
          const response = await postAPI.getPostByCityId(filter.city.value);
          setIsLoading(false);
          setPostList(response.data);
        }
      }
    }
    //ko city, có keyword ?
    else if (filter.price.length > 0) {
      if (filter.keyword) {
        console.log('price + keyword');
        setIsLoading(true);
        const response = await postAPI.getPostByPrice(
          filter.price[1],
          filter.price[0]
        );

        const postList = response.data;
        const result = postList.filter((post) =>
          post.title.toLowerCase().includes(filter.keyword.toLowerCase())
        );
        console.log('result', result);
        setPostList(result);
        setIsLoading(false);
      } else {
        console.log('price');
        // if (filter.price[0] === 0 && filter.price[1] === 0) {
        //   console.log('0 ,0');
        //   setIsLoading(true);
        //   const response = await postAPI.getAll();
        //   setIsLoading(false);
        //   setPostList(response.data);
        // }
        setIsLoading(true);
        const response = await postAPI.getPostByPrice(
          filter.price[1],
          filter.price[0]
        );
        setIsLoading(false);
        console.log('price: ', response.data);
        setPostList(response.data);
      }
    } else if (filter.keyword) {
      console.log('keyword');
      setIsLoading(true);
      const response = await postAPI.getPostByKeyword(filter.keyword);
      setIsLoading(false);
      setPostList(response.data);
    } else {
      console.log('ko có filter');
      setIsLoading(true);
      const response = await postAPI.getAll();
      setIsLoading(false);
      setPostList(response.data);
    }
  };

  //handle Refresh
  const handleRefresh = () => {
    setFilter(initialFilter);
    setValues([MIN, MAX]);
  };
  return (
    <HomeWrapper>
      <Container>
        <Row>
          <Col className="col-lg-4">
            <Select
              defaultOptions
              cacheOptions
              isClearable
              value={filter?.city}
              onChange={handleChangeCity}
              options={cityOptions}
              isLoading={isLoadingCity}
              placeholder="Chọn thành phố..."
              loadingMessage={() => 'Đang tìm kiếm...'}
            />
          </Col>
          <Col className="col-lg-4">
            <Select
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
            />
          </Col>
          <Col className="col-lg-4 range">
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              rtl={false}
              onChange={(values) => {
                setValues(values);
              }}
              onFinalChange={handleOnFinalChange}
              renderTrack={({ props, children }) => (
                <>
                  <output
                    style={{ fontSize: '14px', marginTop: '-14px' }}
                    id="output"
                  >
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
          </Col>

          <Col className="col-lg-8 mt-3 mb-3">
            <input
              id="inputSearch"
              className="outline-none"
              value={filter.keyword}
              onChange={handleChangeKeyword}
              placeholder="Nhập từ khóa bạn muốn tìm kiếm..."
            />
          </Col>
          <Col className="col-lg-4 mt-3 mb-3">
            <button type="submit" onClick={handleSearch} className="btn-search">
              Tìm kiếm
            </button>

            <RotateLeftIcon
              fontSize="large"
              color="primary"
              className="btn-refresh"
              onClick={handleRefresh}
            />
          </Col>
        </Row>

        {isClicked && (
          <>
            <ul>
              Tìm kiếm theo các tiêu chí:
              {filter.city && <li>Thành phố: {filter.city.label}</li>}
              {filter.district && <li>Quận: {filter.district.label}</li>}
              {filter.price.length > 0 && (
                <li>
                  Trong khoảng &nbsp;
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(filter.price[0])}
                  &nbsp;đến&nbsp;
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(filter.price[1])}
                </li>
              )}
              {filter.keyword && <li>Từ khóa: {filter.keyword}</li>}
            </ul>
          </>
        )}

        {renderPostList}
      </Container>
    </HomeWrapper>
  );
};

HomeContainer.propTypes = {
  loggedRegister: PropTypes.string,
};
