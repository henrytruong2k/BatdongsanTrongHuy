import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProjectsPage from '../../pages/Projects';
import ProjectDetailPage from '../../pages/ProjectDetail';
import { NotFoundPage } from '../../pages/NotFound';
import { router } from '../../constants/router';
import CreateProject from '../../pages/CreateProject';
import ManageProject from '../../pages/ManageProject';

ProjectRouter.propTypes = {};

function ProjectRouter(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ProjectsPage} />
        <Route exact path={router.TAOBAIVIET} component={CreateProject} />
        <Route exact path={router.QUANLYBAIVIET} component={ManageProject} />
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
