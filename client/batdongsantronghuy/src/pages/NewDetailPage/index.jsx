import React from 'react';
import Loading from '../../components/Loading';
import Wrapper from '../../components/Wrapper';
import NewDetailContainer from '../../containers/NewDetailContainer';
import useGetNewDetail from './hooks/useGetNewDetail';

const NewDetailPage = () => {
  const { newDetail, isLoading } = useGetNewDetail();
  return (
    <Wrapper>
      {isLoading ? <Loading /> : <NewDetailContainer newDetail={newDetail} />}
    </Wrapper>
  );
};

export default NewDetailPage;
