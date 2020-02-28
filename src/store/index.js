import { createStore } from 'redux'

import rootReducer from '../reducers/index';
//import events from '../reducers/events';

const store = createStore(rootReducer);
export default store;
