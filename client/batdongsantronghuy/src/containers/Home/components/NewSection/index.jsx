import React from 'react';
import { Link } from 'react-router-dom';
import { router } from '../../../../constants/router';
import { StyledNewSection } from './StyledNewSection';

const NewSection = () => {
  return (
    <StyledNewSection>
      <div className="d-flex justify-content-between">
        <h2>Tin tiêu điểm</h2>
        <Link to={router.TINTUC}>
          <p>
            Xem thêm&nbsp;
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </p>
        </Link>
      </div>
    </StyledNewSection>
  );
};

export default NewSection;
