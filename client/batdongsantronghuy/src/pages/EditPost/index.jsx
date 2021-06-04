import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useGetDetailPost from './hooks/useGetDetailPost';
import { useForm } from 'react-hook-form';
import InputField from '../../components/form-controls/InputField';
import EditPostFeature from '../../containers/EditPostFeature';

const Wrapper = styled.div`
  padding-top: 60px;
`;
function EditPost(props) {
  const { id } = useParams();
  const { post, loading } = useGetDetailPost(id);

  return (
    <Wrapper>
      <Container>
        <h1>Đây là edit post số {id}</h1>

        <EditPostFeature post={post} />
      </Container>
    </Wrapper>
  );
}

export default EditPost;
