import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import './style.scss';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
function Loading(props) {
  return (
    <Container>
      <LoadingWrapper>
        <div className="loading">
          <div className="loading__letter">L</div>
          <div className="loading__letter">o</div>
          <div className="loading__letter">a</div>
          <div className="loading__letter">d</div>
          <div className="loading__letter">i</div>
          <div className="loading__letter">n</div>
          <div className="loading__letter">g</div>
          <div className="loading__letter">.</div>
          <div className="loading__letter">.</div>
          <div className="loading__letter">.</div>
        </div>
      </LoadingWrapper>
    </Container>
  );
}

export default Loading;
