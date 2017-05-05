import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import style from './home.css';

class Home extends Component {
  static propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: 'Default Heading'
  }

  componentDidMount() {
    const { setTitle } = this.props;
    setTitle('This is the Home page title set with redux ☺️!!');
  }

  render() {
    const { title } = this.props;

    return (
      <div className={style.container}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default Home;
