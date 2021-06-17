import React, { useEffect, useState } from 'react';
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
  const classes = useStyles();
  const { posts, loading, pagination, changePage, favoriteList } = props;
  console.log('posts ở postlist: ', posts);
  console.log('favoriteList tại POST LIST: ', favoriteList);
  const favoriteIDs = favoriteList.map((item) => item.id);

  // const clickedItems = posts.filter((item) => favoriteList.includes(item));
  // console.log('clicked list: ', clickedItems);

  //test
  // const [clickedList, setClickedList] = useState([]);
  // useEffect(() => {
  //   console.log('use effect post list');
  //   if (favoriteList) {
  //     console.log('favorite post list trong useEffect: ', favoriteList);
  //     const clickedArr = posts.filter((item) => favoriteList.includes(item));
  //     console.log('clicked arr: ', clickedArr);
  //     setClickedList([...clickedArr]);
  //   }
  // }, [favoriteList]);
  // if (!favoriteList) return;
  // const clickedList = posts.filter((item) => favoriteList.includes(item));
  // console.log('clicked: ', clickedList);

  // posts.map((post) => {
  //   if (clickedList.includes(post)) {
  //     console.log('true');
  //     return <PostItem key={post.id} post={post} clicked={true} />;
  //   }
  //   return <PostItem key={post.id} post={post} clicked={false} />;
  // });

  const handlePageChange = (e, page) => {
    if (!changePage) return;
    changePage(e, page);
  };
  // <PostItem key={post.id} post={post} clicked={true} />;
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
