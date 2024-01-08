import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from "./session";
import spotsReducer from './spots';
import reviewReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  // key into first
  spot: spotsReducer,
  review: reviewReducer,
});

let enhancer;

// MAY BE ISSUE
// LOOKING FOR REDUX LOGGER when in production

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// if (process.env.NODE_ENV === 'production') enhancer = applyMiddleware(thunk)

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
