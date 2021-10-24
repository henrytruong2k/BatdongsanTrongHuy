import React, { useState } from 'react';
import ShowMoreButton from '../../../../components/ShowMoreButton';
import NewItem from '../NewItem';
import { CircularProgress } from '@material-ui/core';
import { MODE } from '../../../../constants/mode';
import NewListLoading from '../NewListLoading';

const AllNews = ({ list, loading, type }) => {
  const [visible, setVisible] = useState(3);
  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const handleClickShowMore = () => {
    setLoadingShowMore(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 3);
      setLoadingShowMore(false);
    }, 600);
  };
  return (
    <div className="mt-4">
      <h3>{type === MODE.SEARCH ? 'Kết quả tìm kiếm' : 'Bảng tin'}</h3>
      {loading ? (
        <NewListLoading />
      ) : (
        <div className="min-vh-70">
          {list.length > 0 ? (
            [...list]
              .reverse()
              .slice(0, visible)
              .map((item) => {
                return <NewItem key={item.id} newItem={item} />;
              })
          ) : (
            <p>Không có bài viết</p>
          )}
        </div>
      )}

      {loadingShowMore && (
        <div className="loading-show-more">
          <CircularProgress />
        </div>
      )}
      {visible < list.length && (
        <ShowMoreButton handleClickShowMore={handleClickShowMore} />
      )}
    </div>
  );
};

export default AllNews;
