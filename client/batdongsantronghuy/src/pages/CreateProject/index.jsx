import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import CreatePost from '../../containers/CreatePost';
import useNotifyCount from '../../seo/useNotifyCount';

function CreateProject({ authorized }) {
  useNotifyCount(title.CREATEPOST);
  if (!authorized) {
    return (
      <Redirect
        to={{
          pathname: '/',
          search: '?login-required=true',
        }}
      />
    );
  }

  return (
    <Wrapper>
      <Container>
        <CreatePost />
      </Container>
    </Wrapper>
  );
}

export default CreateProject;
