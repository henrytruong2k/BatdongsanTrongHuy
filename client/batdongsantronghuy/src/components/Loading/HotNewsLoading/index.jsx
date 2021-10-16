import React from 'react';
import { Skeleton } from '@material-ui/lab';

const HotNewsLoading = ({ length = 10 }) => {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => {
        return (
          <div className="mt-1 mb-1">
            <Skeleton variant="text" height={18} />
          </div>
        );
      })}
    </>
  );
};

export default HotNewsLoading;
