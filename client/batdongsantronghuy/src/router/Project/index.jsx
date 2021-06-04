import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProjectsPage from '../../pages/Projects';
import ProjectDetailPage from '../../pages/ProjectDetail';
import { NotFoundPage } from '../../pages/NotFound';
import { router } from '../../constants/router';
import CreateProject from '../../pages/CreateProject';
import ManagePost from '../../pages/ManagePost';
import EditPost from '../../pages/EditPost';

ProjectRouter.propTypes = {};

function ProjectRouter(props) {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ProjectsPage} />
        <Route exact path={router.TAOBAIVIET} component={CreateProject} />
        <Route exact path={router.QUANLYBAIVIET} component={ManagePost} />
        <Route
          exact
          path={`${match.path}/sua-bai-viet/:id`}
          component={EditPost}
        />

        <Route
          exact
          path={`${match.path}/:slug`}
          component={ProjectDetailPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default ProjectRouter;
