import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import CreatePost from '../../containers/CreatePost';

function CreateProject(props) {
  return (
    <Wrapper>
      <Container>
        <CreatePost />
      </Container>
    </Wrapper>
  );
}

export default CreateProject;
