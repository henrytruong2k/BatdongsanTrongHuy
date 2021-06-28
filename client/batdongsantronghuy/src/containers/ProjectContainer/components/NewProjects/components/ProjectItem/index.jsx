import React from 'react';
import { Link } from 'react-router-dom';
import { nFormatter } from '../../../../../../ults/nFormatter';
import './style.scss';

function ProjectItem({ project }) {
  return (
    <div className="box-card">
      <Link to={`/du-an/${project.id}`}>
        <img src={project.image} alt={project.name} />
      </Link>
      <div className="box-card__content">
        <Link to={`/du-an/${project.id}`}>
          <h3>{project.name}</h3>
        </Link>
        <p className="box-card__content--address">{project.address}</p>
        <p>
          Giá từ:&nbsp;
          <b>
            {nFormatter(project.price, 2)}/m<sup>2</sup>
          </b>
        </p>
      </div>
    </div>
  );
}

export default ProjectItem;
