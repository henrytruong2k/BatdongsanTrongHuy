import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import postAPI from '../../api/postAPI';
import { CircularProgress, makeStyles } from '@material-ui/core';
import PaymentDetail from '../../containers/PaymentDetail';
import usePostDetail from './hooks/usePostDetail';
import { NotFound } from '../../components/NotFound';
import Wrapper from '../../components/Wrapper';

function PaymentPage(props) {
  const { id } = useParams();
  const { post, loading } = usePostDetail(id);
  console.log('post của payment page: ', post);
  const useStyles = makeStyles((theme) => ({
    circular: {
      display: 'flex',
      margin: '20% auto',
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Wrapper>
        {loading ? (
          <CircularProgress size="5rem" className={classes.circular} />
        ) : (
          <>{post !== null ? <PaymentDetail post={post} /> : <NotFound />}</>
        )}
      </Wrapper>
    </div>
  );
}

export default PaymentPage;
