import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import HomePage from '../pages/Home';
import NewsPage from '../pages/News';
import { NotFoundPage } from '../pages/NotFound';
import ProjectRouter from '../router/Project';
import { router } from '../constants/router';
import PaymentPage from '../pages/PaymentPage';
import SettingPage from '../pages/SettingPage';
import FavoritePostsPage from '../pages/FavoritePostsPage';
import ProjectPage from '../pages/ProjectPage';

function Layout() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={router.ROOT} component={HomePage} />
        <Route exact path={router.TRANGCHU} component={HomePage} />
        <Route exact path={router.BAIDANG} component={ProjectRouter} />
        <Route exact path={router.DUAN} component={ProjectPage} />
        <Route exact path={router.TINTUC} component={NewsPage} />
        <Route exact path="/thanh-toan/:id" component={PaymentPage} />
        <Route exact path={router.CAIDATTAIKHOAN} component={SettingPage} />
        <Route
          exact
          path={router.BAIVIETYEUTHICH}
          component={FavoritePostsPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default Layout;
