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
  const publishDesc = post.description.replace(/<\/?[^>]+(>|$)/g, '');
  return (
    <Col className="col-lg-4">
      <Card>
        <Card.Img
          src={post.image}
          // onError={`/project-page/286x180.svg`}
          alt={post.title}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{publishDesc}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/du-an/${post.id}`}>
            <Button variant="primary">Xem thêm</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default PostItem;
