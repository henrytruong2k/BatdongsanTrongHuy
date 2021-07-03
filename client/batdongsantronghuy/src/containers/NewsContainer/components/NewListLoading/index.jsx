import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { StyledNewListLoading } from './StyledNewListLoading';

const NewListLoading = ({ length = 3 }) => {
  return (
    <StyledNewListLoading>
      {Array.from(new Array(length)).map((x, index) => {
        return (
          <div className="box-loading-container" key={index}>
            <Skeleton variant="rect" width="150px" height="100%" />
            <div className="new__content">
              <Skeleton variant="text" />
              <Skeleton variant="text" height="42px" />
              <Skeleton variant="text" />
            </div>
          </div>
        );
      })}
    </StyledNewListLoading>
  );
};

export default NewListLoading;
