import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import { Container } from 'react-bootstrap';

ProjectContainer.propTypes = {};
const ProjectWrapper = styled.div`
  padding-top: 100px;
`;

function ProjectContainer(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await postAPI.getAll();
      setPosts(postList.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      <ProjectWrapper>
        <PostList posts={posts} loading={loading} />
      </ProjectWrapper>
    </Container>
  );
}

export default ProjectContainer;
