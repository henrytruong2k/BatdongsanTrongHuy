import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import Loading from '../../../../components/Loading';
import PostSkeletonList from '../PostSkeletonList';

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostItem),
  loading: PropTypes.bool.isRequired,
};

function PostList(props) {
  const { posts, loading } = props;
  return (
    <Row>
      {loading ? (
        <PostSkeletonList />
      ) : posts?.length > 0 ? (
        posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })
      ) : (
        <h3>Không có dữ liệu </h3>
      )}
    </Row>
  );
}

export default PostList;
