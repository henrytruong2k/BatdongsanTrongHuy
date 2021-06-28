import React from 'react';
import { Container } from 'react-bootstrap';
import ProjectHeader from './components/ProjectHeader';
import ProjectInfo from './components/ProjectInfo';

const ProjectDetailContainer = ({ project }) => {
  return (
    <Container>
      <ProjectHeader projectName={project.name} />
      <ProjectInfo project={project} />
    </Container>
  );
};

export default ProjectDetailContainer;
