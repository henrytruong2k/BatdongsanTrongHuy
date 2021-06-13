import React from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Setting from '../../containers/Auth/components/Setting';

function SettingPage(props) {
  const loggedInUser = useSelector((state) => state.user.current.user);
  console.log('setting page: ', loggedInUser);
  return (
    <Wrapper>
      <Setting user={loggedInUser}></Setting>
    </Wrapper>
  );
}

export default SettingPage;

const Wrapper = styled.div`
  padding-top: 100px;
`;
