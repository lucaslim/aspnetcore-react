import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'reducers';

const getMiddlewares = (history) => {
  const middlewares = [
    thunk,
    routerMiddleware(history)
  ];

  if (!__SERVER__) {
    middlewares.push(createLogger);
  }

  return middlewares;
};

const getEnhancers = () => {
  const enhancers = [];

  const devToolsExtension = !__SERVER__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : undefined;

  if (devToolsExtension !== undefined) {
    enhancers.push(devToolsExtension());
  }

  return enhancers;
};

export default (history, preloadedState = {}) => {
  const enhancers = getEnhancers();
  const middlewares = getMiddlewares(history);
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
