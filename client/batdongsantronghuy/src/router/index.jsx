import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import HomePage from '../pages/Home';
import NewsPage from '../pages/News';
import { NotFoundPage } from '../pages/NotFound';

export const Router = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trang-chu" component={HomePage} />
        <Route path="/tin-tuc" component={NewsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
};
