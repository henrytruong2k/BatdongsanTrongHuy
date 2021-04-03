import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProjectsPage from '../../pages/Projects';
import ProjectDetailPage from '../../pages/ProjectDetail';
import { NotFoundPage } from '../../pages/NotFound';

ProjectRouter.propTypes = {};

function ProjectRouter(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={match.path} component={ProjectsPage} />
        <Route exact path={`${match.path}/:ID`} component={ProjectDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default ProjectRouter;
