import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { VIEW_REQUIRED } from '../../constants/config';
import BoxSearch from './components/BoxSearch';
import useGetNews from './hooks/useGetNews';
import useGetNewTypes from './hooks/useGetNewTypes';
import NewsViewHighest from './components/NewsViewHighest';
import SideBar from './components/SideBar';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import 'moment/locale/vi';
import AllNews from './components/AllNews';
import { MODE } from '../../constants/mode';

moment.locale('vi');

const NewsContainer = () => {
  const { newList, setNewList, type, setType, loading, setLoading } =
    useGetNews();

  const { newTypeList } = useGetNewTypes();

  const haveViewList = newList
    .filter((item) => item.access > VIEW_REQUIRED)
    .slice(0, 5);
  const listHighestViews = orderBy(
    haveViewList,
    [
      function (obj) {
        return obj.access;
      },
    ],
    ['desc']
  );

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="w-100 mr-4">
            <BoxSearch
              newTypeList={newTypeList}
              setType={setType}
              setNewList={setNewList}
              setLoading={setLoading}
            />
            {type !== MODE.SEARCH && (
              <NewsViewHighest list={listHighestViews} loading={loading} />
            )}
            <AllNews list={newList} loading={loading} type={type} />
          </div>
          <div>
            <SideBar list={listHighestViews} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewsContainer;
