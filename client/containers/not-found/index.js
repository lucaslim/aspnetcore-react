import React from 'react';
import Status from 'components/status';

import style from './not-found.css';

const NotFound = () =>
  <Status code={404}>
    <div className={style.container}>
      <h2>Oops! 404 Error Detected!</h2>
    </div>
  </Status>;

export default NotFound;
