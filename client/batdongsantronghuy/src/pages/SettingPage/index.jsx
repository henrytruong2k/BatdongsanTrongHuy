import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { title } from '../../constants/title';
import Setting from '../../containers/Auth/components/Setting';
import useNotifyCount from '../../seo/useNotifyCount';

function SettingPage() {
  const loggedInUser = useSelector((state) => state.user.current.user);
  useNotifyCount(title.SETTINGS);

  return (
    <Wrapper>
      <Setting user={loggedInUser}></Setting>
    </Wrapper>
  );
}

export default SettingPage;
