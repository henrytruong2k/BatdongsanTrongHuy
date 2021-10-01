import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getTrackBackground, Range } from 'react-range';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Slider from 'react-slick';
import styled from 'styled-components';
import cityAPI from '../../api/cityAPI';
import postAPI from '../../api/postAPI';
import useCityOptions from '../../components/hooks/useCityOptions';
import useGeoLocation from '../../components/hooks/useGeoLocation';
import Wrapper from '../../components/Wrapper';
import { deepEqual } from '../../ults/deepEqual';
import { nFormatter } from '../../ults/nFormatter';
import PostList from '../Project/components/PostList';
import AdsBanner from './components/AdsBanner';
import AreaSection from './components/AreaSection';
import NewSection from './components/NewSection';
import ProjectSection from './components/ProjectSection';
import RecommendPost from './components/RecommendPost';
import useGetHomeContent from './hooks/useGetHomeContent';
import './style.scss';

export const HomeContainer = () => {
  useGeoLocation();
  //filter value
  const initialFilter = {
    PageSize: 9,
    PageNumber: 1,
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

  const [pagination, setPagination] = useState({
    limit: 9,
    total: 9,
    page: 1,
  });
  //favorite
  const favoriteList = useSelector((state) => state.favorite.favoriteItems);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const request = {
          PageNumber: pagination?.page,
          PageSize: filter?.PageSize,
          CityId: filter?.city?.value,
          DistrictId: filter?.district?.value,
          Keyword: filter?.keyword,
          MaxPrice: filter?.price[1],
          MinPrice: filter?.price[0],
        };

        const response = await postAPI.getAll(request);

        setPostList(response?.data);
        setPagination({
          ...pagination,
          limit: response?.pageSize,
          total: response?.totalRecords,
          page: response?.pageNumber,
        });
      };
      fetchPosts();
    } catch (error) {
      console.log('Failed to fetch post list: ', error);
    }

    setIsLoading(false);
  }, [filter]);

  //handle page change
  const handlePageChange = (e, page) => {
    setFilter({
      ...filter,
      PageNumber: page,
    });
    setPagination({
      ...pagination,
      page,
    });
  };

  const renderPostList = useMemo(() => {
    return (
      <PostList
        posts={postList}
        loading={isLoading}
        pagination={pagination}
        changePage={handlePageChange}
        favoriteList={favoriteList}
      />
    );
  }, [postList, isLoading, pagination, favoriteList]);

  const { cityOptions, isLoadingCity } = useCityOptions();
  const handleChangeCity = (value) => {
    setFilter({
      ...filter,
      city: value,
    });
  };

  //function reset district
  const selectDistrict = useRef();
  const onClear = () => {
    selectDistrict.current.select.clearValue();
  };

  useEffect(() => {
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

  //react-range
  const STEP = 1000000;
  const MIN = 0;
  const MAX = 10000000000;
  const [values, setValues] = React.useState([MIN, MAX]);

  // const [keyword, setKeyword] = useState('');
  const handleChangeKeyword = (event) => {
    // setKeyword(event.target.value);
    setFilter({
      ...filter,
      keyword: event.target.value,
    });
  };
  const handleOnFinalChange = (values) => {
    setFilter({
      ...filter,
      price: values,
    });
  };

  //handle search
  const handleSearch = async () => {
    //same value
    if (deepEqual(filter, initialFilter)) {
      return;
    }
    const request = {
      PageNumber: 1,
      PageSize: filter.PageSize,
      CityId: filter?.city?.value,
      DistrictId: filter?.district?.value,
      Keyword: filter?.keyword,
      MaxPrice: filter?.price[1],
      MinPrice: filter?.price[0],
    };
    setIsLoading(true);
    const response = await postAPI.getAll(request);

    setPagination({
      ...pagination,
      page: 1,
      limit: response.pageSize,
      total: response.totalRecords,
    });
    setPostList(response.data);
    setIsLoading(false);
  };

  //handle Refresh
  const handleRefresh = () => {
    setPagination({
      ...pagination,
      page: 1,
    });
    setFilter(initialFilter);
    setValues([MIN, MAX]);
  };

  //projects
  const { projects, news, postsHighlight, contentBanners, loading } =
    useGetHomeContent();
  const settings = {
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };

  //scroll event
  const [styleAds, setStyleAds] = useState({ opacity: 0, transition: '0.3s' });
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;

      if (Math.ceil(scrolled) >= 300 && Math.ceil(scrolled) <= 2000) {
        setStyleAds({ ...styleAds, opacity: 1, transition: '0.5s' });
      } else {
        setStyleAds({ ...styleAds, opacity: 0, transition: '0s' });
      }
    });
  }, []);

  return (
    <>
      <div>
        <div className="ads ads--left" style={styleAds}>
          <img
            src="https://file4.batdongsan.com.vn/2021/09/30/UVSXfqBy/20210930224302-f269.jpg"
            alt="Ads"
          />
        </div>
        <div className="ads ads--right" style={styleAds}>
          <img
            src="https://file4.batdongsan.com.vn/2021/09/30/UVSXfqBy/20210930222106-8f2a.jpg"
            alt="Ads"
          />
        </div>
      </div>
      <Container fluid className="pl-0 pr-0">
        <div className="slider-homepage">
          <Slider {...settings}>
            <img
              src="https://file4.batdongsan.com.vn/Banners/HieuNM/HuyenNTD/1920x560/20210726-1127/images/bg1.jpg?1627273543079"
              alt="Ads banner"
            />
            <img
              src="https://file4.batdongsan.com.vn/Banners/HieuNM/HuyenNTD/1920x560/20210726-1127/images/bg2.jpg?1627273543079"
              alt="Ads banner"
            />
          </Slider>
          <div className="tab-bar">
            <div className="tab-bar__item">Nhà đất bán</div>
          </div>
          <div className="search-bar">
            <Container>
              <Row>
                <Col className="col-lg-4">
                  <Select
                    defaultOptions
                    cacheOptions
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
                          style={{
                            fontSize: '14px',
                            marginTop: '-14px',
                            color: '#fff',
                          }}
                          id="output"
                        >
                          Từ&nbsp;
                          {nFormatter(values[0], 1)}
                          &nbsp;đến&nbsp;
                          {nFormatter(values[1], 1)}
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
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="btn-search"
                  >
                    Tìm kiếm
                  </button>

                  {/* <RotateLeftIcon
                    fontSize="large"
                    color="primary"
                    className="btn-refresh"
                    onClick={handleRefresh}
                  /> */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Container>{renderPostList}</Container>

        <Container fluid className="bg-grey">
          <Container>
            <RecommendPost list={postsHighlight} favoriteList={favoriteList} />
          </Container>
        </Container>
        <Container>
          <ProjectSection projects={projects} loading={loading} />
        </Container>

        <Container>
          <AreaSection contentBanners={contentBanners} loading={loading} />
        </Container>
        <Container>
          <AdsBanner />
        </Container>
        <Container>
          <NewSection news={news} loading={loading} />
        </Container>
      </Container>
    </>
  );
};
