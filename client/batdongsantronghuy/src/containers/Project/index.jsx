import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import PostList from './components/PostList';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import useCityOptions from '../../components/hooks/useCityOptions';
import Wrapper from '../../components/Wrapper';

function PostContainer({ filterURL }) {
  // console.log('filterURL: ', filterURL);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState({
    CityId: filterURL?.cityId,
    PageNumber: 1,
    PageSize: 9,
  });
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 9,
    page: 1,
  });

  const favoriteList = useSelector((state) => state.favorite.favoriteItems);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postList = await postAPI.getAll(request);
        if (!postList) return;

        setPagination({
          ...pagination,
          limit: postList.pageSize,
          total: postList.totalRecords,
          page: postList.pageNumber,
        });
        setPosts(postList?.data);
        setLoading(false);
      } catch (error) {
        console.log('Fail to fetch posts: ', error);
      }
    };
    fetchPosts();
  }, [request]);

  const handlePageChange = (e, page) => {
    setRequest({
      ...request,
      PageNumber: page,
    });
    setPagination({
      ...pagination,
      page,
    });
  };

  return (
    <Container>
      <Wrapper>
        <SearchBar filterURL={filterURL} />
        <PostList
          posts={posts}
          loading={loading}
          pagination={pagination}
          changePage={handlePageChange}
          favoriteList={favoriteList}
        />
      </Wrapper>
    </Container>
  );
}

export default PostContainer;
