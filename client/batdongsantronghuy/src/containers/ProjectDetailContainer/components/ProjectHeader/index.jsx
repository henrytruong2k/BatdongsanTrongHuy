import React from 'react';
import BoxSearch from '../../../ProjectContainer/components/BoxSearch';
import './style.scss';

const ProjectHeader = ({ projectName }) => {
  return (
    <>
      <div className="project-header">
        <h1>{projectName}</h1>
        <span>({projectName})</span>
      </div>
    </>
  );
};

export default ProjectHeader;
