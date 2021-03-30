import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const HomeContainer = () => {
  return (
    <HomeWrapper>
      <Container>
        <h1 className="text-center">This is home page</h1>
      </Container>
    </HomeWrapper>
  );
};
