import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CoreLayout from 'layouts/core-layout';
import NotFound from 'containers/not-found';
import Home from 'containers/home';

export default (
  <CoreLayout>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route component={NotFound} />
    </Switch>
  </CoreLayout>
);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept();
}
