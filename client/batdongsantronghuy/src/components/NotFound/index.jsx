import React from 'react';
import { Container } from 'react-bootstrap';
import './style.scss';

export const NotFound = () => {
  return (
    <div className="not-found d-flex align-items-center">
      <Container>
        <h1 className="text-center">NOT FOUND</h1>
      </Container>
    </div>
  );
};
