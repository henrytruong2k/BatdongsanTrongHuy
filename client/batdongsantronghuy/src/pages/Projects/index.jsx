import React, { useEffect } from 'react';

import ProjectContainer from '../../containers/Project';

const ProjectsPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <ProjectContainer />;
};

export default ProjectsPage;
