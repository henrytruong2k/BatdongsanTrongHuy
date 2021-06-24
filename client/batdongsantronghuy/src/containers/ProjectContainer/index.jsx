import React from 'react';
import { Container } from 'react-bootstrap';
import BoxSearch from './components/BoxSearch';
import NewProjects from './components/NewProjects';
import OtherProjects from './components/OtherProjects';

function ProjectContainer(props) {
  return (
    <Container>
      <BoxSearch />
      <NewProjects />
      <OtherProjects />
    </Container>
  );
}

export default ProjectContainer;
