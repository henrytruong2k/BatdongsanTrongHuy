import React, { useEffect } from 'react';

import { HomeContainer } from '../../containers/Home';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <HomeContainer />;
};

export default HomePage;
