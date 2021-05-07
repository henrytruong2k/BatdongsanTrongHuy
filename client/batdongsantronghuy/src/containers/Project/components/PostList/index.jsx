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
  console.log('Component pass value postlist: ' + posts);
  return (
    <Row>
      {loading ? (
        <Loading />
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
