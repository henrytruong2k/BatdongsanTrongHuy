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

function Layout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={router.ROOT} component={HomePage} />
        <Route path={router.TRANGCHU} component={HomePage} />
        <Route path={router.TINTUC} component={NewsPage} />
        <Route path={router.BAIDANG} component={ProjectRouter} />
        <Route path="/thanh-toan/:id" component={PaymentPage} />
        <Route path={router.CAIDATTAIKHOAN} component={SettingPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default Layout;
