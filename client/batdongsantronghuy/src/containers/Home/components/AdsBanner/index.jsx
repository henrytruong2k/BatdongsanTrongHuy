import React from 'react';
import Slider from 'react-slick';

const AdsBanner = () => {
  const settings = {
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <img
          src="https://file4.batdongsan.com.vn/2021/06/28/UVSXfqBy/20210628170821-3838.jpg"
          alt="Ads banner"
        />
        <img
          src="https://file4.batdongsan.com.vn/2021/06/30/UVSXfqBy/20210630165528-4ce4.jpg"
          alt="Ads banner"
        />
      </Slider>
    </div>
  );
};

export default AdsBanner;
