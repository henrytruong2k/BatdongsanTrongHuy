import React from 'react';
import { Link } from 'react-router-dom';
import { nFormatter } from '../../../../../../ults/nFormatter';
import './style.scss';

function OtherProjectItem({ project }) {
  return (
    <div>
      <div className="box-card box-card--other">
        <Link to={`/du-an/${project.id}`}>
          <img src={project.image} alt={project.name} />
        </Link>
        <div className="box-card__content box-card__content--other">
          <Link to={`/du-an/${project.id}`}>
            <h3>{project.name}</h3>
          </Link>
          <p>Địa chỉ: {project.address}</p>
          <p>
            Giá từ:&nbsp;
            <b>
              {nFormatter(project.price, 2)}/m<sup>2</sup>
            </b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtherProjectItem;
