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
import ProjectDetailPage from '../pages/ProjectDetailPage';
import NewDetailPage from '../pages/NewDetailPage';
import ChangePassword from '../containers/Auth/components/Setting/components/ChangePassword';
import CreateProject from '../pages/CreateProject';
import SettingRouter from '../router/Setting';

function Layout() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={router.ROOT} component={HomePage} />
        <Route exact path={router.TRANGCHU} component={HomePage} />
        <Route path={router.BAIDANG} component={ProjectRouter} />
        <Route exact path={router.DUAN} component={ProjectPage} />
        <Route path="/du-an/:slug" component={ProjectDetailPage} />
        <Route exact path={router.TINTUC} component={NewsPage} />
        <Route
          exact
          path={`${router.TINTUC}/:slug`}
          component={NewDetailPage}
        />

        <Route path="/thanh-toan/:id" component={PaymentPage} />
        <Route path={router.CAIDATTAIKHOAN} component={SettingRouter} />

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
