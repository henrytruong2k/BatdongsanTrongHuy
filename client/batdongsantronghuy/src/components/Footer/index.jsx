import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCityOptions from '../hooks/useCityOptions';

import './style.scss';

export const Footer = () => {
  const { cities, isLoadingCity } = useCityOptions();

  return (
    <div className="footer pt-lg-5 pb-lg-4">
      <Container>
        <Row>
          <Col className="col-lg-3">
            <h4 className="footer__logo">BẤT ĐỘNG SẢN TRỌNG HUY</h4>
            <p>
              Công ty tiên phong hàng đầu Việt Nam về lĩnh vực bất động sản.
            </p>
            <form>
              <input id="inputEmail" type="email" placeholder="Nhập email..." />
              <button type="submit">
                <i className="fa fa-location-arrow"></i>
              </button>
            </form>
          </Col>
          <Col className="footer__cities col-lg-3 offset-lg-1">
            <h5>Danh sách thành phố lớn</h5>
            <ul>
              {isLoadingCity
                ? 'Loading...'
                : cities?.slice(0, 5)?.map((item) => {
                    return (
                      <li key={item.id}>
                        <i className="fa fa-caret-right mr-2"></i>
                        <Link key={item.id} to={item.slug}>
                          {item.cityName}
                        </Link>
                      </li>
                    );
                  })}
            </ul>
            <ul>
              {cities?.slice(6, cities.length)?.map((item) => {
                return (
                  <li key={item.id}>
                    <i className="fa fa-caret-right mr-2"></i>
                    <Link key={item.id} to={item.slug}>
                      {item.cityName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col className="footer__social col-lg-2">
            <h5>Mạng xã hội</h5>
            <ul>
              <li>
                <i className="fa fa-facebook-square mr-2"></i>
                <a href="/#" target="_blank">
                  Facebook
                </a>
              </li>
              <li>
                <i className="fa fa-instagram mr-2"></i>
                <a href="/#" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <i className="fa fa-twitter mr-2"></i>
                <a href="/#" target="_blank">
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
          <Col className="col-lg-3">
            <h5>Liên hệ tại:</h5>
            <ul>
              <li>
                <i className="fa fa-map-marker mr-2"></i>
                16 Creek Ave. Farming, NY
              </li>
              <li>
                <i className="fa fa-phone mr-2"></i>
                (+88) 666 121 4321
              </li>
              <li>
                <i className="fa fa-envelope mr-2"></i>
                info.colorlib@gmail.com
              </li>
              <li>
                <i className="fa fa-clock-o mr-2"></i>
                Mon - Sat, 08 AM - 06 PM
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
