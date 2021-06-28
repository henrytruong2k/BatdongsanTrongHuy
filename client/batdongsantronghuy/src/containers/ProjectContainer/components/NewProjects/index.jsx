import React from 'react';
// import { projects } from '../../../../data/data';
import ProjectItem from './components/ProjectItem';
import ProjectListLoading from './components/ProjectListLoading';
import './style.scss';

function NewProjects({ projectList, loading, type }) {
  return (
    <div className="mt-5">
      <div className="box-header">
        <div className="box-header__line"></div>
        <div className="box-header__content">
          <h4>
            {type === 'search' ? 'Kết quả tìm kiếm' : 'Dự án mới cập nhật'}
          </h4>
        </div>
        <div className="box-header__line"></div>
      </div>
      <div className="wrap-height">
        {loading ? (
          <div className="loading">
            <ProjectListLoading length={4} />
          </div>
        ) : (
          <div className="project__container">
            {projectList.length > 0 ? (
              projectList.slice(0, 8).map((item) => {
                return <ProjectItem key={item.id} project={item} />;
              })
            ) : (
              <p className="w-100 text-center">Không tìm thấy kết quả.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewProjects;
