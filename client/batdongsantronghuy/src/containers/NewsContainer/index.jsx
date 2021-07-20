import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

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
  const {
    newList,
    newTopList,
    setNewList,
    type,
    setType,
    loading,
    setLoading,
  } = useGetNews();

  const { newTypeList } = useGetNewTypes();

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
              <NewsViewHighest list={newTopList} loading={loading} />
            )}
            <AllNews list={newList} loading={loading} type={type} />
          </div>
          <div>
            <SideBar list={newTopList} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewsContainer;
