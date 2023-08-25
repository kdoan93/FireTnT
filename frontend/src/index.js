import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
// Provider used to provide the Redux store
import { Provider } from 'react-redux';
// BrowserRouter used for React to route
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// Configures Redux store
import configureStore from './store';

// store variable used to access Redux store
const store = configureStore();

// Exposes store to window ONLY in development
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
};

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
