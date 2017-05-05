import React from 'react';
import { createServerRenderer } from 'aspnet-prerendering';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { createMemoryHistory } from 'history';
import { Helmet } from 'react-helmet';

import configureStore from 'store/configureStore';
import Routes from 'store/routes';
import AppContainer from 'containers/app';

export default createServerRenderer(params =>
  new Promise((resolve, reject) => {
    const history = createMemoryHistory();
    const store = configureStore(history);

    // Dispatch the current location so that the router knows where to go
    store.dispatch(replace(params.location));

    const context = {};

    const app = (
      <AppContainer store={store}>
        <StaticRouter location={params.location.path} context={context} children={Routes} />
      </AppContainer>
    );

    // Initial rendering
    renderToString(app);

    // If there's a redirection, just send this information back to the host application
    if (context.url) {
      resolve({ redirectUrl: context.url });
      return;
    }

    const resolveResult = () => {
      const html = renderToString(app);
      const helmet = Helmet.renderStatic();

      resolve({
        html,
        globals: {
          initialState: store.getState(),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          link: helmet.link.toString()
        },
      });
    };

    params.domainTasks.then(() => {
      resolveResult();
    }, reject);
  }),
);
