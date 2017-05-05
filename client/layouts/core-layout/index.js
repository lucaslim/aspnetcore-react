import React from 'react';
import PropTypes from 'prop-types';

import style from './core-layout.css';

export const CoreLayout = ({ children }) =>
  <div className={style.container}>
    {children}
  </div>;

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CoreLayout;
