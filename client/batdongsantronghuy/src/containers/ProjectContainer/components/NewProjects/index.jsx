import React from 'react';
import { projects } from '../../../../data/data';
import ProjectItem from './components/ProjectItem';
import './style.scss';

function NewProjects(props) {
  return (
    <div className="mt-5">
      <div className="box-header">
        <div className="box-header__line"></div>
        <div className="box-header__content">
          <h4>DỰ ÁN MỚI CẬP NHẬT</h4>
        </div>
        <div className="box-header__line"></div>
      </div>
      <div className="project__container">
        {projects.slice(0, 8).map((item) => {
          return <ProjectItem key={item.id} project={item} />;
        })}
      </div>
    </div>
  );
}

export default NewProjects;
