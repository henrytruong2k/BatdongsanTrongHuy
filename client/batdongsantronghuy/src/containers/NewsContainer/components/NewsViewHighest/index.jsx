import React from 'react';
import NewItem from '../NewItem';
import NewListLoading from '../NewListLoading';

const NewsViewHighest = ({ list, loading }) => {
  return (
    <div className="mt-4">
      <h1>Tin nhiều người đọc</h1>
      {loading ? (
        <NewListLoading />
      ) : (
        <>
          {list.slice(0, 5).map((item) => {
            return <NewItem key={item.id} newItem={item} />;
          })}
        </>
      )}
    </div>
  );
};

export default NewsViewHighest;
