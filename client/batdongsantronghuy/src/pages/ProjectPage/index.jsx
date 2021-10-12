import React from 'react';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import ProjectContainer from '../../containers/ProjectContainer';
import useNotifyCount from '../../seo/useNotifyCount';

function ProjectPage(props) {
  useNotifyCount(title.PROJECTS);
  return (
    <Wrapper>
      <ProjectContainer />
    </Wrapper>
  );
}

export default ProjectPage;
