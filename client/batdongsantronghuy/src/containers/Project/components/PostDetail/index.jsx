import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import osm from '../../../../constants/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TabsPanel from './components/TabsPanel';
import Slider from 'react-slick';

moment.locale('vi');

PostDetail.propTypes = {};

function PostDetail({ post }) {
  const center = {
    lat: post.locationX,
    lng: post.locationY,
  };

  const markerIcon = new L.icon({
    iconUrl: '/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });

  const ZOOM_LEVEL = 50;
  const mapRef = useRef();

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
      <Container fluid={true} className="pl-0 pr-0 mb-5">
        <div className="hero-image">
          <img src="/assets/hero-bg.jpg" alt={post.title} />
          <div className="hero-image__text">
            <p>
              <i className="fa fa-map-marker"></i>
              &nbsp; {post.address.street}
            </p>

            <h2>{post.title}</h2>
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
                <p>
                  5201 m<sup>2</sup>
                </p>
              </li>
              <li>
                <i className="fa fa-bed"></i>
                <p>8 phòng ngủ</p>
              </li>
              <li>
                <i className="fa fa-bath"></i>
                <p>7 phòng tắm</p>
              </li>
              <li>
                <i className="fa fa-car"></i>
                <p>1 Gara</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container>
        <Row>
          <Col className="col-lg-8">
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
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />
                <Marker position={center} icon={markerIcon}>
                  <Popup>
                    <img
                      src={post.images[0].url}
                      alt={post.title}
                      className="post-detail__image-leaflet"
                    />
                    <b>Bạn đang ở đây, {post.address.street}</b>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PostDetail;
