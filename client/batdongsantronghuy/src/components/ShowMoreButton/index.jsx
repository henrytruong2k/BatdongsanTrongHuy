import React from 'react';
import './style.scss';

const ShowMoreButton = ({ text = 'Xem thêm', handleClickShowMore }) => {
  const handleClick = () => {
    if (!handleClickShowMore) return;
    handleClickShowMore();
  };
  return (
    <div className="show-more" onClick={handleClick}>
      <div className="show-more__button">
        {text} <i className="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default ShowMoreButton;
