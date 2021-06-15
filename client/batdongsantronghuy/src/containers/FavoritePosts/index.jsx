import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function FavoritePosts(props) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.favorite.favoriteItems);
  console.log('list: ', list);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Favorite</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FavoritePosts;
