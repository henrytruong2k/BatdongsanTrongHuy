import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { router } from '../constants/router';
import FavoritePostsPage from '../pages/FavoritePostsPage';
import HomePage from '../pages/Home';
import NewDetailPage from '../pages/NewDetailPage';
import NewsPage from '../pages/News';
import { NotFoundPage } from '../pages/NotFound';
import PaymentPage from '../pages/PaymentPage';
import ProjectDetailPage from '../pages/ProjectDetailPage';
import ProjectPage from '../pages/ProjectPage';
import ProjectRouter from '../router/Project';
import SettingRouter from '../router/Setting';

function Layout() {
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;
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
        <Route
          exact
          path={router.BAIVIETQUANTAM}
          component={FavoritePostsPage}
        />
        <Route
          path="/thanh-toan/:id"
          component={() => <PaymentPage authorized={!!isLoggedIn} />}
        />
        <Route path={router.CAIDATTAIKHOAN} component={SettingRouter} />

        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default Layout;
