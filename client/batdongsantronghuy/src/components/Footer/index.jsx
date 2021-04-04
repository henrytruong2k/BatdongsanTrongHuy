import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cityAPI from '../../api/cityAPI';
import './style.scss';

export const Footer = () => {
  const [cities, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCities = async () => {
      const postList = await cityAPI.getAll();
      setPosts(postList);
      setLoading(false);
    };
    fetchCities();
  }, []);

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
              {loading
                ? 'Loading...'
                : cities.map((item) => {
                    return (
                      <li key={item.id} className="ml-lg-3">
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
