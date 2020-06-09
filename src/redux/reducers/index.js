import { combineReducers } from 'redux';

import rss from './rss';

const rootReducer = combineReducers({
  rss,
});

export default rootReducer;
