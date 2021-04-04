import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import './style.scss';

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
  const publishDesc = post.description
    .replace(/<\/?[^>]+(>|$)/g, '')
    .substr(0, 200)
    .concat('...');

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
          <Button variant="primary">Xem thêm</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default PostItem;
