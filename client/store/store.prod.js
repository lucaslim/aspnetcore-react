import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'reducers';


const getMiddlewares = (history) => {
  const middlewares = [
    routerMiddleware(history)
  ];

  return middlewares;
};

export default (history, preloadedState = {}) => {
  const middlewares = getMiddlewares(history);
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  return store;
};
