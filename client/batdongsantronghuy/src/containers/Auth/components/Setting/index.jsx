import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Container, Row, Col } from 'react-bootstrap';

Setting.propTypes = {};

function Setting({ user }) {
  return (
    <Container>
      <Row>
        <Col className="col-12">
          <h4>Quản lý tài khoản</h4>
        </Col>
        <Col className="col-3">
          <div className="avatar">
            <img src="/assets/1.jpg" alt="Avatar" />
          </div>
        </Col>
        <Col className="col-9">
          <div>
            <p>Tên: {user?.fullName}</p>
            <p>Email: {user?.email}</p>
            <p>Địa chỉ: {user?.address ? user?.address : 'Chưa cập nhật'}</p>
            <p>SĐT: {user?.address ? user?.address : 'Chưa cập nhật'}</p>
            {!user?.isSocial && <button>Đổi mật khẩu</button>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Setting;
