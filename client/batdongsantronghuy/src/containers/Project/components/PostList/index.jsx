import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import Loading from '../../../../components/Loading';
import PostSkeletonList from '../PostSkeletonList';
import { Pagination } from '@material-ui/lab';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import './style.scss';

PostList.propTypes = {
  posts: PropTypes.arrayOf(PostItem),
  loading: PropTypes.bool.isRequired,
  pagination: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
  },
}));

function PostList(props) {
  const { posts, loading, pagination, changePage } = props;
  const classes = useStyles();

  console.log('post list pagination: ', pagination);
  const handlePageChange = (e, page) => {
    if (!changePage) return;
    changePage(e, page);
  };

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

      <div className={clsx('col-12', pagination.total < 9 && 'd-none')}>
        <Box className={classes.pagination}>
          <Pagination
            className="paginate"
            count={Math.ceil(pagination.total / pagination.limit)}
            color="primary"
            page={pagination.page}
            onChange={handlePageChange}
          />
        </Box>
      </div>
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
