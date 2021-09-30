import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import { Container } from 'react-bootstrap';
import './style.scss';

function Loading(props) {
  const useStyles = makeStyles((theme) => ({
    circular: {
      display: 'flex',
      margin: '20% auto',
    },
  }));
  const classes = useStyles();
  return (
    <Container>
      <CircularProgress size="5rem" className={classes.circular} />
    </Container>
  );
}

export default Loading;
