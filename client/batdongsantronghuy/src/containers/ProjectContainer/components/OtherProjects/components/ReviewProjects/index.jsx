import React from 'react';

const ReviewProjects = () => {
  return (
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
          <h3>Đánh giá dự án Tecco Garden: Căn hộ bình dân phía Nam Hà Nội</h3>
          <ul>
            <li>
              Đánh giá dự án Eco Green Sài Gòn: Căn hộ vị trí đẹp ở Quận 7, giá
              từ 55 triệu/m2
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
  );
};

export default ReviewProjects;
