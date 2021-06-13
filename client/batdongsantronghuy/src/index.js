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
import { Button } from '@material-ui/core';

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
          action={(key) => <Button onClick={onClickDismiss(key)}>x</Button>}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
