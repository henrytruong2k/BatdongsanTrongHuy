import React, { useState } from 'react';
import { projects } from '../../../../data/data';
import OtherProjectItem from './components/OtherProjectItem';
import './style.scss';

function OtherProjects(props) {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="d-flex">
      <div className="other-projects">
        <div className="tab-header">
          <h2
            className={
              toggleState === 1 ? 'tab__item tab__item--active' : 'tab__item'
            }
            onClick={() => {
              toggleTab(1);
            }}
          >
            KHU NGHỈ DƯỠNG, SINH THÁI
          </h2>
          <h2
            className={
              toggleState === 2 ? 'tab__item tab__item--active' : 'tab__item'
            }
            onClick={() => {
              toggleTab(2);
            }}
          >
            KHU CÔNG NGHIỆP
          </h2>
          <h2
            className={
              toggleState === 3 ? 'tab__item tab__item--active' : 'tab__item'
            }
            onClick={() => {
              toggleTab(3);
            }}
          >
            CĂN HỘ, CHUNG CƯ
          </h2>
        </div>
        <div
          className={toggleState === 1 ? 'content--active' : 'content'}
          onClick={() => {
            toggleTab(1);
          }}
        >
          {projects.slice(0, 3).map((item) => {
            return <OtherProjectItem key={item.id} project={item} />;
          })}
        </div>
        <div
          className={toggleState === 2 ? 'content--active' : 'content'}
          onClick={() => {
            toggleTab(2);
          }}
        >
          {projects.slice(3, 6).map((item) => {
            return <OtherProjectItem key={item.id} project={item} />;
          })}
        </div>
        <div
          className={toggleState === 3 ? 'content--active' : 'content'}
          onClick={() => {
            toggleTab(3);
          }}
        >
          {projects.slice(6, 9).map((item) => {
            return <OtherProjectItem key={item.id} project={item} />;
          })}
        </div>
      </div>
      <div className="review-projects">
        <div className="tab-header">
          <h2 className="tab__item tab__item--active">Đánh giá dự án </h2>
        </div>
        <div className="review-card">
          <img
            src="https://file4.batdongsan.com.vn/resize/320x200/2021/06/23/zk7ggeWN/20210623083130-d699.jpg"
            alt="Review dự án"
          />
          <div className="review-card__content">
            <h3>
              Đánh giá dự án Tecco Garden: Căn hộ bình dân phía Nam Hà Nội
            </h3>
            <ul>
              <li>
                Đánh giá dự án Eco Green Sài Gòn: Căn hộ vị trí đẹp ở Quận 7,
                giá từ 55 triệu/m2
              </li>
              <li>
                Đánh giá dự án The 6Nature Đà Nẵng: Cơ hội đầu tư căn hộ cao cấp
                với view biển “triệu đô”
              </li>
              <li>
                Đánh giá dự án The Standard: Khu nhà phố biệt lập cao cấp ở Tân
                Uyên, Bình Dương
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherProjects;
