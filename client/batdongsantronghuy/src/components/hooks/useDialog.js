import { useState } from 'react';
import { MODE } from '../../constants/mode';

const useDialog = () => {
  const [mode, setMode] = useState(MODE.LOGIN);

  function navigate(mode) {
    setMode(mode);
  }

  return { mode, navigate };
};

export default useDialog;
