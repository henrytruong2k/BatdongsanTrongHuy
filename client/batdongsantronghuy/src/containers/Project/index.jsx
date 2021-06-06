import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import { Container } from 'react-bootstrap';
import {
  Dialog,
  DialogContent,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import FormCreate from './components/FormCreate';

ProjectContainer.propTypes = {};
const ProjectWrapper = styled.div`
  padding-top: 100px;
`;
const CreateButton = styled.button`
  font-size: 16px;
  color: #fff;
  padding: 12px 20px;
  border: 1px solid #2cbdb8;
  background-color: #2cbdb8;
  margin-bottom: 20px;
  font-weight: 600;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: #2cbdb8;
  }
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

  //create
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: theme.palette.grey[500],
      zIndex: 1,
      outline: 'none',
    },
  }));
  const classes = useStyles();

  return (
    <Container>
      <ProjectWrapper>
        <Dialog
          disableBackdropClick
          // disableEscapeKeyDown
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <IconButton
            className={`btn-close ${classes.closeButton}`}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <DialogContent>
            <FormCreate />
          </DialogContent>
        </Dialog>

        <PostList posts={posts} loading={loading} />
      </ProjectWrapper>
    </Container>
  );
}

export default ProjectContainer;
