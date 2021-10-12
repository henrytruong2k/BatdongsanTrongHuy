import React from 'react';
import { Container } from 'react-bootstrap';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import CreatePost from '../../containers/CreatePost';
import useNotifyCount from '../../seo/useNotifyCount';

function CreateProject(props) {
  useNotifyCount(title.CREATEPOST);
  return (
    <Wrapper>
      <Container>
        <CreatePost />
      </Container>
    </Wrapper>
  );
}

export default CreateProject;
