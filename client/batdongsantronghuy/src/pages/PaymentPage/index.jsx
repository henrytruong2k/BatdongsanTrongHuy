import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/NotFound';
import Wrapper from '../../components/Wrapper';
import PaymentDetail from '../../containers/PaymentDetail';
import { Redirect } from 'react-router-dom';
import usePostDetail from './hooks/usePostDetail';

const useStyles = makeStyles((theme) => ({
  circular: {
    display: 'flex',
    margin: '20% auto',
  },
}));
function PaymentPage({ authorized }) {
  const { id } = useParams();
  const { post, loading } = usePostDetail(id);

  const classes = useStyles();
  if (!authorized) {
    return (
      <Redirect
        to={{
          pathname: '/',
          search: '?login-required=true',
        }}
      />
    );
  }
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
