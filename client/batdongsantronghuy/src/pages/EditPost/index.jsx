import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useGetDetailPost from './hooks/useGetDetailPost';
import { useForm } from 'react-hook-form';
import InputField from '../../components/form-controls/InputField';
import EditPostFeature from '../../containers/EditPostFeature';
import Wrapper from '../../components/Wrapper';

function EditPost(props) {
  const { id } = useParams();
  const { post, loading } = useGetDetailPost(id);

  return (
    <Wrapper>
      <Container>
        <EditPostFeature post={post} loading={loading} />
      </Container>
    </Wrapper>
  );
}

export default EditPost;
