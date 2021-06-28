import React from 'react';
import { Skeleton } from '@material-ui/lab';
import './style.scss';

const ProjectListLoading = ({ length = 9 }) => {
  return (
    <div className="d-flex">
      {Array.from(new Array(length)).map((x, index) => {
        return (
          <div className="project__item" key={index}>
            <Skeleton variant="rect" width="100%" height={150} />
            <div className="project__content">
              <div className="project__content--title">
                <Skeleton variant="text" />
              </div>
              <div className="project__content--title">
                <Skeleton variant="text" />
              </div>
              <Skeleton variant="text" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectListLoading;
