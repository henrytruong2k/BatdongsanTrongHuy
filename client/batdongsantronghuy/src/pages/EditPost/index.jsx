import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import EditPostFeature from '../../containers/EditPostFeature';
import useNotifyCount from '../../seo/useNotifyCount';
import useGetDetailPost from './hooks/useGetDetailPost';

function EditPost(props) {
  const { id } = useParams();
  const { post, loading } = useGetDetailPost(id);
  useNotifyCount(title.EDITPOST);
  return (
    <Wrapper>
      <Container>
        <EditPostFeature post={post} loading={loading} />
      </Container>
    </Wrapper>
  );
}

export default EditPost;
