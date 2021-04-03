import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';

export const NotFound = () => {
  return (
    <div className="not-found d-flex align-items-center">
      <Container className="text-center">
        <h1 className="mb-lg-5">NOT FOUND</h1>
        <Link to="/">Quay về trang chủ</Link>
      </Container>
    </div>
  );
};
