import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import './style.scss';
import moment from 'moment';
import 'moment/locale/vi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import osm from '../../../../constants/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

moment.locale('vi');

PostDetail.propTypes = {};

function PostDetail({ post }) {
  const [center, setCenter] = useState({
    lat: post.locationX,
    lng: post.locationY,
  });

  const markerIcon = new L.icon({
    iconUrl: '/location.svg',
    iconSize: [35, 45],
    popupAnchor: [3, -25],
  });
  console.log({ ...center, lng: center.lng - 50 });
  const ZOOM_LEVEL = 50;
  const mapRef = useRef();

  const publishDate = post.address.createAt;
  return (
    <Row>
      <Col className="col-lg-12">
        <h2 className="mb-lg-3">{post.title}</h2>
      </Col>
      <Col className="col-lg-8">
        <img src={post.image} alt={post.title} className="post-detail__image" />
      </Col>
      <Col className="col-lg-4">
        <p>Hình thức: {post.category.name}</p>
        <p>Ngày đăng bán: {moment(publishDate, 'YYYYMMDD').fromNow()}</p>
        <p>Địa chỉ: {post.address.street}</p>
        <p>
          Giá bán:&nbsp;
          {Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(post.price)}
        </p>
        <p>Số tầng: {post.numberofFloor}</p>
        <p>Phòng ngủ: {post.bedroom}</p>
        <p>Nội thất: {post.furniture}</p>
        <p>Giấy tờ: {post.juridical}</p>
        <p>Thông tin liên hệ: </p>
        <p>Tên người bán: {post.nameContact}</p>
        <p>Số điện thoại: {post.phoneContact}</p>
        <p>Email liên hệ: {post.emailContact}</p>
      </Col>
      <Col className="col-lg-12">
        <h4 className="mt-lg-3">Mô tả</h4>
        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
      </Col>
      <Col className="col-lg-12">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
          <Marker position={center} icon={markerIcon}>
            <Popup>
              <b>Bạn đang ở đây, {post.address.street}</b>
            </Popup>
          </Marker>
        </MapContainer>
      </Col>
    </Row>
  );
}

export default PostDetail;
