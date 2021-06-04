import { useState } from 'react';
import { MODE } from '../../constants/mode';

const useDialog = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  function toggle() {
    setIsShowing(!isShowing);
  }
  function navigate(mode) {
    setMode(mode);
  }

  return { isShowing, mode, toggle, navigate };
};

export default useDialog;
