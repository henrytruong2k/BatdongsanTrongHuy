import React from 'react';
import { HomeContainer } from '../../containers/Home';
import useNotifyCount from '../../seo/useNotifyCount';

const HomePage = () => {
  useNotifyCount();
  return <HomeContainer />;
};

export default HomePage;
