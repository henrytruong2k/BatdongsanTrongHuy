import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PostItem from '../PostItem';
import PostSkeletonList from '../PostSkeletonList';
import './style.scss';
import { PAGESIZE } from '../../../../constants/config';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
  },
}));

function PostList(props) {
  const classes = useStyles();
  const { posts, loading, pagination, changePage, favoriteList } = props;
  const favoriteIDs = favoriteList.map((item) => item.id);

  const handlePageChange = (e, page) => {
    if (!changePage) return;
    changePage(e, page);
  };

  return (
    <Row>
      {loading ? (
        <PostSkeletonList />
      ) : posts?.length > 0 ? (
        posts.map((item) => {
          if (favoriteIDs.includes(item.id)) {
            return <PostItem key={item.id} post={item} clicked={true} />;
          }
          return <PostItem key={item.id} post={item} clicked={false} />;
        })
      ) : (
        <NoResultsFound />
      )}

      <div className={clsx('col-12', pagination.total <= PAGESIZE && 'd-none')}>
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
