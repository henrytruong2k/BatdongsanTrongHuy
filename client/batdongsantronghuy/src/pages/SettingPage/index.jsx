import React from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../../components/Wrapper';
import Setting from '../../containers/Auth/components/Setting';

function SettingPage(props) {
  const loggedInUser = useSelector((state) => state.user.current.user);

  return (
    <Wrapper>
      <Setting user={loggedInUser}></Setting>
    </Wrapper>
  );
}

export default SettingPage;
