import React from 'react';
import { Link } from 'react-router-dom';
import { router } from '../../../../constants/router';
import './style.scss';

const SideBar = ({ list }) => {
  return (
    <div className="side-bar">
      <div className="container-common">
        <div className="box-header">
          <h2>Chủ đề được quan tâm</h2>
        </div>
        <div className="box-content">
          {list.map((item) => {
            return (
              <Link key={item.id} to={router.TINTUC + `/${item.id}`}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
