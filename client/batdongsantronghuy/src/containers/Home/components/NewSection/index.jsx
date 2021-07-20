import React from 'react';
import { Link } from 'react-router-dom';
import { router } from '../../../../constants/router';
import { StyledNewSection } from './StyledNewSection';
import Slider from 'react-slick';
import { addDefaultSrc } from '../../../../ults/addDefaultSrc';

const NewSection = ({ news, loading }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.94,
    slidesToScroll: 1,
    autoPlay: true,
  };
  return (
    <StyledNewSection>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="home__title">Tin tiêu điểm</h2>
        <Link to={router.TINTUC}>
          Xem thêm&nbsp;
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>
      <div>
        <Slider {...settings}>
          {news.map((item, index) => {
            return <NewItem key={item.id} item={item} index={index} />;
          })}
        </Slider>
      </div>
    </StyledNewSection>
  );
};

export default NewSection;

const NewItem = ({ item, index }) => {
  return (
    <div>
      <Link to={router.TINTUC + `/${item.id}`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            width="353"
            height="200"
            onError={addDefaultSrc}
          />
        ) : (
          <img
            src="./assets/news-image.jpg"
            width="353"
            height="200"
            alt={item.title}
          />
        )}
      </Link>
      <div className="hotnews-link">
        <span>0{++index}.</span>
        <Link to={router.TINTUC + `/${item.id}`}>
          <p className="title--truncate">{item.title}</p>
        </Link>
      </div>
    </div>
  );
};
