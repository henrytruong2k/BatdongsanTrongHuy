import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import CreatePost from '../../containers/CreatePost';

const CreatePostContainer = styled.div`
  padding: 100px;
`;

function CreateProject(props) {
  return (
    <CreatePostContainer>
      <Container>
        <CreatePost />
      </Container>
    </CreatePostContainer>
  );
}

export default CreateProject;
