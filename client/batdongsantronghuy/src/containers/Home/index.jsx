import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import useGeoLocation from '../../components/hooks/useGeoLocation';
import AdsBanner from './components/AdsBanner';
import AreaSection from './components/AreaSection';
import NewSection from './components/NewSection';
import ProjectSection from './components/ProjectSection';
import RecommendPost from './components/RecommendPost';
import useGetHomeContent from './hooks/useGetHomeContent';
import './style.scss';

export const HomeContainer = () => {
  useGeoLocation();

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

  const favoriteList = useSelector((state) => state.favorite.favoriteItems);

  //scroll event
  const [styleAds, setStyleAds] = useState({ opacity: 0, transition: '0.3s' });
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (Math.ceil(scrolled) >= 330 && Math.ceil(scrolled) <= 1660) {
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
        </div>

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
