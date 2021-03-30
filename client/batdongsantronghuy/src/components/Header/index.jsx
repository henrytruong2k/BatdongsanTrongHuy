import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './style.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header d-lg-flex align-items-lg-center">
      <Container>
        <Row className="d-lg-flex align-items-lg-center">
          <Col className="header__logo col-lg-3">bất động sản trọng huy</Col>
          <Col className="header__menu col-lg-9">
            <NavLink to="trang-chu">Trang chủ</NavLink>
            <NavLink to="du-an">Dự án</NavLink>
            <NavLink to="tin-tuc">Tin tức</NavLink>
            <NavLink to="lien-he">Liên hệ</NavLink>
            <img
              className="mr-lg-2"
              src="/home-page/heart.svg"
              width="20"
              height="20"
              alt=""
            />
            <img
              className="mr-lg-2"
              src="/home-page/profile-user.svg"
              width="20"
              height="20"
              alt=""
            />
            <a href="sign-up">Đăng ký</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
