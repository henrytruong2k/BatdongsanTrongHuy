import React, { useState } from 'react';
import { projects } from '../../../../data/data';
import OtherProjectItem from './components/OtherProjectItem';
import ReviewProjects from './components/ReviewProjects';
import './style.scss';
import clsx from 'clsx';

function OtherProjects({ projectList, projectTypeList }) {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const typeIds = projectList.map((item) => item.projectType.id);

  return (
    <div className="d-flex">
      <div className="other-projects">
        <div className="tab-header">
          {projectTypeList.map((item) => {
            if (typeIds.includes(item.id)) {
              return (
                <h2
                  key={item.id}
                  className={clsx(
                    'tab__item',
                    toggleState === item.id && 'tab__item--active'
                  )}
                  onClick={() => {
                    toggleTab(item.id);
                  }}
                >
                  {item.name}
                </h2>
              );
            }
            return null;
          })}
        </div>
        <div>
          {projectTypeList.map((item) => {
            return (
              <div
                key={item.id}
                className={clsx(
                  'content',
                  toggleState === item.id && 'content--active'
                )}
              >
                {projectList.map((project) => {
                  if (project.projectType.id === item.id) {
                    return (
                      <OtherProjectItem key={project.id} project={project} />
                    );
                  }

                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>
      <ReviewProjects />
    </div>
  );
}

export default OtherProjects;
