import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { StyledProjectSection } from './StyledProjectSection';
import { router } from '../../../../constants/router';

const ProjectSection = ({ projects }) => {
  if (!projects) return;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.9,
    slidesToScroll: 1,
    autoPlay: true,
  };
  return (
    <StyledProjectSection>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="home__title">Dự án nổi bật</h2>
        <Link to={router.DUAN}>
          Xem thêm&nbsp;
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </Link>
      </div>

      <div>
        <Slider {...settings}>
          {projects.map((item) => {
            return <ProjectItem key={item.id} item={item} />;
          })}
        </Slider>
      </div>
    </StyledProjectSection>
  );
};

export default ProjectSection;

const ProjectItem = ({ item }) => {
  return (
    <div>
      <Link to={router.DUAN + `/${item.id}`}>
        <img src={item.image} alt={item.name} width="256" height="146" />
      </Link>
      <Link to={router.DUAN + `/${item.id}`}>
        <p className="title--truncate">{item.name}</p>
      </Link>
    </div>
  );
};
