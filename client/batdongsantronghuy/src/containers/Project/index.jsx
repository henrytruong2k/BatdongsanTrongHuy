import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import PostList from './components/PostList';
import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import useCityOptions from '../../components/hooks/useCityOptions';
import Wrapper from '../../components/Wrapper';
import { PAGENUMBER, PAGESIZE } from '../../constants/config';

function PostContainer({ filterURL }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState({
    CityId: filterURL?.cityId,
    PageNumber: PAGENUMBER,
    PageSize: PAGESIZE,
  });
  const [pagination, setPagination] = useState({
    limit: 8,
    total: 8,
    page: 1,
  });

  const favoriteList = useSelector((state) => state.favorite.favoriteItems);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
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
  const handleSubmit = (filter) => {
    if (!filter) return;
    setRequest({
      ...filter,
      CityId: filter?.city?.value,
      DistrictId: filter?.district?.value,
      MinPrice: filter?.price[0],
      MaxPrice: filter?.price[1],
      Keyword: filter?.keyword,
    });
  };
  return (
    <Container>
      <Wrapper>
        <SearchBar filterURL={filterURL} onSubmit={handleSubmit} />
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
