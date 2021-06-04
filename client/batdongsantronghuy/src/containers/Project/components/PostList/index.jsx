import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
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
        <NoResultsFound />
      )}
    </Row>
  );
}

export default PostList;
const NoResultsFound = () => {
  return (
    <Col className="col-12">
      <h3>Không có dữ liệu </h3>
    </Col>
  );
};
