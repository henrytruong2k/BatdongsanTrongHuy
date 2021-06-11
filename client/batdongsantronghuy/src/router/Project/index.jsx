import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import PostsPage from '../../pages/Posts';
import PostDetailPage from '../../pages/PostDetail';
import { NotFoundPage } from '../../pages/NotFound';
import { router } from '../../constants/router';
import CreateProject from '../../pages/CreateProject';
import ManagePost from '../../pages/ManagePost';
import EditPost from '../../pages/EditPost';

function ProjectRouter() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={PostsPage} />
        <Route exact path={router.TAOBAIVIET} component={CreateProject} />
        <Route exact path={router.QUANLYBAIVIET} component={ManagePost} />
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
