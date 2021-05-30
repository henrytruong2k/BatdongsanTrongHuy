import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import postAPI from '../../api/postAPI';
import styled from 'styled-components';
import PostDetail from '../../containers/Project/components/PostDetail';
import { CircularProgress, makeStyles } from '@material-ui/core';

const ProjectDetailWrapper = styled.div`
  padding-top: 60px;
`;

const ProjectDetailPage = () => {
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

  const useStyles = makeStyles((theme) => ({
    circular: {
      display: 'flex',
      margin: '20% auto',
    },
  }));
  const classes = useStyles();
  return (
    <ProjectDetailWrapper>
      {isLoading ? (
        <CircularProgress size="5rem" className={classes.circular} />
      ) : (
        <PostDetail post={post} />
      )}
    </ProjectDetailWrapper>
  );
};

export default ProjectDetailPage;
