import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Setting.propTypes = {};

function Setting({ userInformation }) {
  console.log('userInformation: ', userInformation);
  return (
    <div className="setting-form">
      <h3>Quản lý tài khoản người dùng</h3>
      <p>Họ tên: {userInformation.userName}</p>
      <p>Email: {userInformation.email}</p>
      <p>Trạng thái: {userInformation.isVerified && 'Đã kích hoạt'}</p>
      <ul>
        Quyền:
        {userInformation.roles.map((role) => {
          return (
            <li>
              <i className="fa fa-key mr-2"></i>
              {role}
            </li>
          );
        })}
      </ul>
      <button
        className="btn-update"
        onClick={() => console.log('click cập nhật')}
      >
        Cập nhật
      </button>
    </div>
  );
}

export default Setting;
