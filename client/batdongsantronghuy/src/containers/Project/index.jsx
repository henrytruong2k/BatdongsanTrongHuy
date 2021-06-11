import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import PostList from './components/PostList';

const ProjectWrapper = styled.div`
  padding-top: 100px;
`;

function PostContainer(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState({
    PageNumber: 1,
    PageSize: 9,
  });
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 9,
    page: 1,
  });
  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await postAPI.getAll(request);
      console.log('run');
      setPagination({
        ...pagination,
        limit: postList.pageSize,
        total: postList.totalRecords,
        page: postList.pageNumber,
      });
      setPosts(postList.data);
      setLoading(false);
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
      <ProjectWrapper>
        <PostList
          posts={posts}
          loading={loading}
          pagination={pagination}
          changePage={handlePageChange}
        />
      </ProjectWrapper>
    </Container>
  );
}

export default PostContainer;
