import React from 'react';
import { nFormatter } from '../../../../ults/nFormatter';
import ReviewProjects from '../../../ProjectContainer/components/OtherProjects/components/ReviewProjects';
import './style.scss';

const ProjectInfo = ({ project }) => {
  return (
    <>
      <div className="project-tab">
        <ul>
          <li className="tab tab--active">
            <span>Tổng quan</span>
          </li>
          <li className="tab">
            <span>Vị trí hạ tầng</span>
          </li>
        </ul>
      </div>
      <div className="project-info">
        <div className="project-info--left">
          <img src={project.image} alt={project.name} />
        </div>
        <div className="project-info__content">
          <h2>Thông tin chung</h2>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">Tên dự án</div>
            <div className="project-info__content--right">{project.name}</div>
          </div>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">Địa chỉ</div>
            <div className="project-info__content--right">
              {project.address}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">Tổng diện tích</div>
            <div className="project-info__content--right">{project.name}</div>
          </div>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">Chủ sở hữu</div>
            <div className="project-info__content--right">
              {project.enterprise.name}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">
              Loại hình phát triển
            </div>
            <div className="project-info__content--right">
              {project.projectType.name}
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="project-info__content--left">Giá bán</div>
            <div className="project-info__content--right">
              {nFormatter(project.price)}/m<sup>2</sup>
            </div>
          </div>
        </div>
      </div>
      <div className="project-introduce d-flex justify-content-between">
        <h2>Giới thiệu dự án</h2>
        <div className="btn-restart">Cập nhật thông tin dự án</div>
      </div>
      <div className="project-footer">
        <div
          className="project-footer--left"
          dangerouslySetInnerHTML={{ __html: project.inform }}
        ></div>
        <ReviewProjects />
      </div>
    </>
  );
};

export default ProjectInfo;
