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
        <div class="loading">
          <div class="loading__letter">L</div>
          <div class="loading__letter">o</div>
          <div class="loading__letter">a</div>
          <div class="loading__letter">d</div>
          <div class="loading__letter">i</div>
          <div class="loading__letter">n</div>
          <div class="loading__letter">g</div>
          <div class="loading__letter">.</div>
          <div class="loading__letter">.</div>
          <div class="loading__letter">.</div>
        </div>
      </LoadingWrapper>
    </Container>
  );
}

export default Loading;
