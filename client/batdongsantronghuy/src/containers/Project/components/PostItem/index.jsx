import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

function PostItem(props) {
  const { post } = props;

  return (
    <Col className="post col-lg-4">
      <Link to={`/bai-dang/${post.id}`}>
        <Card>
          <div className="d-flex justify-content-space-between">
            <div className="post__tag post__tag--category">
              {post.category.name}
            </div>
            <div className="post__tag post__tag--city">
              {post?.address?.city.cityName}
            </div>
          </div>
          <Card.Img
            src={post?.images[0]?.url}
            // onError={`/project-page/286x180.svg`}
            alt={post.title}
          />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
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
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(post.price)}
              </h5>
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
      </Link>
    </Col>
  );
}

export default PostItem;
