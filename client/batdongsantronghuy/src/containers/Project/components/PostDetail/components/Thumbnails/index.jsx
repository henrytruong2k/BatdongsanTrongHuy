import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './style.scss';

function Thumbnails({ postImages }) {
  //handle thumbnails display
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const sliders = postImages.map((item) => {
    return {
      id: item.id,
      image: item.url,
    };
  });

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,

    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
  };

  const settingsThumbs = {
    infinite: false,
    slidesToShow: 6.8,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    arrows: false,

    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <div className="slider-wrapper">
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={(slider) => setSlider1(slider)}
      >
        {sliders.map((slide) => (
          <div className="slick-slide" key={slide.id}>
            <img
              className="slick-slide-image"
              src={slide.image}
              alt={slide.image}
            />
          </div>
        ))}
      </Slider>

      <div className="thumbnail-slider-wrap">
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={(slider) => setSlider2(slider)}
        >
          {sliders.map((slide) => (
            <div className="slick-slide" key={slide.id}>
              <img
                className="slick-slide-image"
                src={slide.image}
                alt={slide.image}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Thumbnails;
