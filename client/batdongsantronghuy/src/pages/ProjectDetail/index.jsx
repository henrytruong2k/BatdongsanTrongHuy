import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import postAPI from '../../api/postAPI';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import PostDetail from '../../containers/Project/components/PostDetail';

const ProjectDetailWrapper = styled.div`
  padding-top: 60px;
`;

const ProjectDetailPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPostDetail = async () => {
      const postDetail = await postAPI.getDetailById(slug);

      setPost(postDetail.data);
      setIsLoading(false);
    };
    fetchPostDetail();
  }, [slug]);
  return (
    <ProjectDetailWrapper>
      {isLoading ? <Loading /> : <PostDetail post={post} />}
    </ProjectDetailWrapper>
  );
};

ProjectDetailPage.propTypes = {};

export default ProjectDetailPage;
