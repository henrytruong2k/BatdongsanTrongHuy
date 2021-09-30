import React from 'react';
import { StyledAreaSection } from './StyledAreaSection';
import { Link } from 'react-router-dom';

const AreaSection = ({ contentBanners }) => {
  return (
    <StyledAreaSection>
      <h2 className="home__title">Bất động sản theo địa điểm</h2>
      <div className="area__list">
        <div className="area__item area__item--big">
          <img
            src={contentBanners[0]?.image}
            alt={contentBanners[0]?.cityName}
          />
          <Link to={`/bai-dang?cityId=${contentBanners[0]?.cityId}`}>
            <p>{contentBanners[0]?.cityName}</p>
            <p>{contentBanners[0]?.numberPost} bài đăng</p>
          </Link>
        </div>

        <div className="area__list area__list--sub-list">
          {contentBanners.slice(1, contentBanners.length).map((item, index) => {
            return (
              <div key={index} className="area__item">
                <img src={item.image} alt={item.cityName} />

                <Link to={`/bai-dang?cityId=${item.cityId}`}>
                  <p>{item.cityName}</p>
                  <p>{item.numberPost} bài đăng</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </StyledAreaSection>
  );
};

export default AreaSection;
