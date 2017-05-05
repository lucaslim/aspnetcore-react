import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import configureStore from 'store/configureStore';
import Routes from 'store/routes';

import AppContainer from 'containers/app';

const initialState = window.INITIAL_STATE || {};
const history = createBrowserHistory();
const store = configureStore(history, initialState);

const ROOT_NODE = document.getElementById('root');

if (!__TEST__) {
  let renderDOM = () =>
    render(
      <AppContainer store={store}>
        <ConnectedRouter history={history} children={Routes} />
      </AppContainer>,
      ROOT_NODE);

  // This code is excluded from production bundle
  if (__DEV__) {
    // Hot Module Replacement
    if (module.hot) {
      // Development render functions
      const renderApp = renderDOM;
      const renderError = (error) => {
        const RedBox = require('redbox-react').default;

        render(<RedBox error={error} />, ROOT_NODE);
      };

      // Wrap render in try/catch
      renderDOM = () => {
        try {
          renderApp();
        } catch (error) {
          renderError(error);
        }
      };

      module.hot.accept('./store/routes', () =>
        setImmediate(() => {
          unmountComponentAtNode(ROOT_NODE);
          renderDOM();
        })
      );
    }
  }

  renderDOM();
}
