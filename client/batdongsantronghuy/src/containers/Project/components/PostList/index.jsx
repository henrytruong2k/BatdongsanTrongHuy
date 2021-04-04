import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import Loading from '../../../../components/Loading';

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostItem),
  loading: PropTypes.bool.isRequired,
};

function PostList(props) {
  const { posts, loading } = props;
  return (
    <Container>
      <Row>
        {loading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts.map((post) => {
            return <PostItem key={post.id} post={post} />;
          })
        ) : (
          <h3>Server đang gặp vấn đề :( </h3>
        )}
      </Row>
    </Container>
  );
}

export default PostList;
