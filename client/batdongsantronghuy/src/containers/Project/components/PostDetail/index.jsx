import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';

import 'leaflet/dist/leaflet.css';

import TabsPanel from './components/TabsPanel';
import Slider from 'react-slick';
import Map from './components/Map';

moment.locale('vi');

PostDetail.propTypes = {};

function PostDetail({ post }) {
  const publishDate = post.address.createAt;
  const tabProps = {
    price: post.price,
    category: post.category.name,
    authorName: post.nameContact,
    phoneNumber: post.phoneContact,
    email: post.emailContact,
    publicDate: moment(publishDate),
    numberOfFloor: post.numberofFloor,
    bedroom: post.bedroom,
    address: post.address.street,
    furniture: post.furniture,
    juridical: post.juridical,
    direction: post.direction,
    frontiSpiece: post.frontiSpiece,
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`/assets/${i}.jpg`} alt="i" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Container fluid className="pl-0 pr-0 mb-5">
        <div className="hero-image">
          <img src="/assets/hero-bg.jpg" alt={post.title} />
          <div className="hero-image__text">
            <p>
              <i className="fa fa-map-marker"></i>
              &nbsp; {post.address.street}
            </p>

            <h3>{post.title}</h3>
            <div className="room__price">
              <span>Giá bán: </span>
              <p>
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(post.price)}
              </p>
            </div>
            <ul className="room__features">
              <li>
                <i className="fa fa-arrows"></i>
                <p>{post.direction}</p>
              </li>
              <li>
                <i className="fa fa-bed"></i>
                <p>{post.bedroom} phòng ngủ</p>
              </li>
              <li>
                <i className="fa fa-home"></i>
                <p>{post.numberofFloor} tầng</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container>
        <Row>
          <Col className="col-lg-9">
            <img
              src={post?.images[0]?.url}
              alt={post.title}
              className="post-detail__image"
            />

            <h4 className="mt-lg-3">Mô tả</h4>
            <p
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="mb-lg-3"
            ></p>
            <TabsPanel tabProps={tabProps} />
            <div className="mt-lg-5">
              <Map post={post} />
            </div>
          </Col>
          <Col className="col-lg-3 bg-dark">
            <p className="text-white">Thông tin bên lề</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostDetail;
