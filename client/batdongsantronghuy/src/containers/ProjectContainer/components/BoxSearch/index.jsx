import React, { useState } from 'react';
import projectAPI from '../../../../api/projectAPI';
import './style.scss';

function BoxSearch({ setProjectList, setLoading, setType }) {
  const [keyword, setKeyword] = useState('');
  const handleClick = async () => {
    setLoading(true);
    if (keyword !== '') {
      const filterList = await projectAPI.getAll({ keyword });
      setProjectList(filterList?.data);
      setType('search');
    } else {
      const filterList = await projectAPI.getAll();
      setProjectList(filterList?.data);
      console.log('else filter: ', filterList);
      setType(null);
    }
    setLoading(false);
  };
  return (
    <div className="box">
      <div className="box__search">
        <h5>Tìm kiếm dự án</h5>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm: (ví dụ: dự án quận 1)"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Tìm kiếm" onClick={handleClick} />
      </div>
      <div className="box__search--expand"></div>
    </div>
  );
}

export default BoxSearch;
