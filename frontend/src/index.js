import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
// Provider used to provide the Redux store
import { Provider } from 'react-redux';
// BrowserRouter used for React to route
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, Modal } from "./context/Modal";
import App from './App';
// Configures Redux store
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as spotsActions from './store/spots';
import * as reviewsActions from './store/reviews';

// store variable used to access Redux store
const store = configureStore();

// Exposes store to window ONLY in development
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotsActions = spotsActions;
  window.reviewsActions = reviewsActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <h1>
            Sanity check
          </h1>
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
