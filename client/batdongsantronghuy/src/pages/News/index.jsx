import React from 'react';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import NewsContainer from '../../containers/NewsContainer';
import useNotifyCount from '../../seo/useNotifyCount';

const NewsPage = () => {
  useNotifyCount(title.NEWS)
  return (
    <Wrapper>
      <NewsContainer />
    </Wrapper>
  );
};

export default NewsPage;
