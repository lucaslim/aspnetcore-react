import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

class AppContainer extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }

  renderHelmet() {
    return (
      <Helmet>
        <title>{'.Net Core React Starter Kit'}</title>
        <meta name="description" content={'Starter Kit for .Net Core React'} />
        <meta name="keywords" content={'react, netcore, webpack'} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Helmet>
    );
  }

  render() {
    const { store, children } = this.props;

    return (
      <div>
        {this.renderHelmet()}
        <Provider store={store}>
          {children}
        </Provider>
      </div>
    );
  }
}

export default AppContainer;
