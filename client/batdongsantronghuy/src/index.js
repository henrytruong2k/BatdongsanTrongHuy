import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { SnackbarProvider } from 'notistack';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import styled from 'styled-components';

//style for button
const CloseBtn = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  text-align: center;
  border: 1px solid #fff;
`;

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          ref={notistackRef}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          action={(key) => <CloseBtn onClick={onClickDismiss(key)}>x</CloseBtn>}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
