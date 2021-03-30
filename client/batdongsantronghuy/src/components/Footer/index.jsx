import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';

export const Footer = () => {
  const bigCities = [
    {
      id: 1,
      slug: '/tphcm',
      name: 'TP.HCM',
    },
    {
      id: 2,
      slug: '/hanoi',
      name: 'Hà Nội',
    },
    {
      id: 3,
      slug: '/haiphong',
      name: 'Hải Phòng',
    },
    {
      id: 4,
      slug: '/cantho',
      name: 'Cần Thơ',
    },
    {
      id: 5,
      slug: '/danang',
      name: 'Đà Nẵng',
    },
  ];
  return (
    <div className="footer pt-lg-5 pb-lg-4">
      <Container>
        <Row>
          <Col className="col-lg-3">
            <p className="footer__logo">bất động sản huy trọng</p>
            <p>
              Công ty tiên phong hàng đầu Việt Nam về lĩnh vực bất động sản.
            </p>
            <p>Địa chỉ: 65 Huỳnh Thúc Kháng, p.Bến Nghé, Q.1</p>
            <p>SĐT: 1020120120120012</p>
            <p>Email: abc@gmail.com</p>
          </Col>
          <Col className="col-lg-3 flex-column">
            <h5>Danh sách các thành phố lớn</h5>
            <ul>
              {bigCities.map((item) => {
                return (
                  <li className="ml-lg-3">
                    <Link key={item.id} to={item.slug}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col className="col-lg-2">
            <h5>Truy cập nhanh</h5>
          </Col>
          <Col className="col-lg-4">
            <h5>Phản hồi tại:</h5>
            <form>
              <input id="inputEmail" type="email" placeholder="Nhập email..." />
              <button type="submit">Gửi</button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
