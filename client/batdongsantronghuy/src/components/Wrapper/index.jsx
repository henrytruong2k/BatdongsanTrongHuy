import React from 'react';
import styled from 'styled-components';

const WrapperContainer = styled.div`
  padding-top: 100px;
`;

function Wrapper(props) {
  return <WrapperContainer>{props.children}</WrapperContainer>;
}

export default Wrapper;
