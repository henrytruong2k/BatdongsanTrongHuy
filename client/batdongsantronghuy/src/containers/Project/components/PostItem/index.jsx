import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { nFormatter } from '../../../../ults/nFormatter';

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

function PostItem({ post, clicked }) {
  return (
    <Col className="post col-lg-4">
      <Card>
        <div className="d-flex justify-content-space-between">
          <div className="post__tag post__tag--category">
            {post.category.name}
          </div>
          <div className="post__tag post__tag--city">
            {post?.address?.city.cityName}
          </div>
        </div>
        <Link to={`/bai-dang/${post.id}`}>
          <Card.Img
            src={post?.images[0]?.url}
            // onError={`/project-page/286x180.svg`}
            alt={post.title}
          />
        </Link>
        <Card.Body>
          <Link to={`/bai-dang/${post.id}`}>
            <Card.Title>{post.title}</Card.Title>
          </Link>
          <p className="post__address">
            <i className="fa fa-map-marker mr-2 color-blue"></i>
            {post.address.street},&nbsp;
            {post.address.district.districtName}
            ,&nbsp;{post.address.city.cityName}
          </p>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></Card.Text>
          <div className="post__price">
            <h5>
              Giá:&nbsp;
              {/* {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(post.price)} */}
              {nFormatter(post?.price)}
            </h5>
            <div></div>
          </div>
        </Card.Body>
        <div className="post__footer">
          <ul>
            <li>
              <i className="fa fa-arrows mr-2 color-blue"></i>
              {post.direction}
            </li>
            <li>
              <i className="fa fa-bed mr-2 color-blue"></i>
              {post.bedroom}
            </li>
            <li>
              <i className="fa fa-home mr-2 color-blue"></i>
              {post.numberofFloor} tầng
            </li>
            <li></li>
          </ul>
        </div>
      </Card>
    </Col>
  );
}

export default PostItem;
