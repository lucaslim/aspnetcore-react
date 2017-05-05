import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './home';

export const rootReducer = combineReducers({
  home,
  router: routerReducer
});

export default rootReducer;
