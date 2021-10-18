import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { router } from '../../constants/router';
import CreateProject from '../../pages/CreateProject';
import EditPost from '../../pages/EditPost';
import ManagePost from '../../pages/ManagePost';
import { NotFoundPage } from '../../pages/NotFound';
import PostDetailPage from '../../pages/PostDetail';
import PostsPage from '../../pages/Posts';

function ProjectRouter() {
  const match = useRouteMatch();
  const loggedInUser = useSelector((state) => state.user.current.user);
  const isLoggedIn = loggedInUser?.id;
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={PostsPage} />
        <Route
          exact
          path={router.TAOBAIVIET}
          component={() => <CreateProject authorized={!!isLoggedIn} />}
        />
        {/* <Route exact path={router.QUANLYBAIVIET} component={ManagePost} /> */}
        <Route
          exact
          path={`${match.path}/sua-bai-viet/:id`}
          component={EditPost}
        />

        <Route exact path={`${match.path}/:slug`} component={PostDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default ProjectRouter;
