import React from 'react';
import './style.scss';

function BoxSearch(props) {
  return (
    <div className="box">
      <div className="box__search">
        <h5>Tìm kiếm dự án</h5>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm: (ví dụ: dự án quận 1) "
        />
        <input type="submit" value="Tìm kiếm" />
      </div>
      <div className="box__search--expand"></div>
    </div>
  );
}

export default BoxSearch;
