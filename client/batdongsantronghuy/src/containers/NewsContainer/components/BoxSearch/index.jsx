import React, { useState } from 'react';
import newAPI from '../../../../api/newAPI';
import { MODE } from '../../../../constants/mode';
import './style.scss';

const BoxSearch = ({ newTypeList, setNewList, setType, setLoading }) => {
  const [option, setOption] = useState('all');
  const [keyword, setKeyword] = useState('');

  const handleChangeSelect = (e) => {
    setOption(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (keyword === '' && option === 'all') {
      return;
    }
    setLoading(true);
    setType(MODE.SEARCH);
    if (keyword !== '') {
      if (option !== 'all') {
        const filterList = await newAPI.getAll({
          TypeId: option,
          Keyword: keyword,
        });
        setNewList(filterList?.data);
      } else {
        const filterList = await newAPI.getAll({
          Keyword: keyword,
        });
        setNewList(filterList?.data);
      }
    } else {
      if (option !== 'all') {
        const filterList = await newAPI.getAll({ TypeId: option });
        setNewList(filterList?.data);
      }
    }

    setLoading(false);
  };
  const handleRefresh = async () => {
    setType(null);
    setOption('all');
    setKeyword('');
    const filterList = await newAPI.getAll();
    setNewList(filterList?.data);
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-search"
          placeholder="Nhập từ khóa để tìm theo cụm từ"
          name={keyword}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          className="select-text"
          onChange={handleChangeSelect}
          defaultValue="all"
        >
          <option value="all">Tất cả</option>

          {newTypeList.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <input className="btn-submit" type="submit" value="Tìm kiếm" />
      </form>
      <div className="icon-refresh" onClick={handleRefresh}>
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default BoxSearch;
