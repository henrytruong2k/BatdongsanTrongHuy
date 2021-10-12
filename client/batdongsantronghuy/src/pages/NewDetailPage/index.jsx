import React from 'react';
import Loading from '../../components/Loading';
import Wrapper from '../../components/Wrapper';
import NewDetailContainer from '../../containers/NewDetailContainer';
import useGetNewDetail from './hooks/useGetNewDetail';
import ScrollIndicator from '../../components/ScrollIndicator';
import useNotifyCount from '../../seo/useNotifyCount';

const NewDetailPage = () => {
  const { newDetail, isLoading } = useGetNewDetail();
  useNotifyCount(newDetail?.title);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollIndicator />
          <NewDetailContainer newDetail={newDetail} />
        </>
      )}
    </Wrapper>
  );
};

export default NewDetailPage;
