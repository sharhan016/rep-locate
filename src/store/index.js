import { createStore } from 'redux'

import rootReducer from '../reducers/index';
//import events from '../reducers/events';

const store = createStore(rootReducer);
console.log('store ',store.getState())
export default store;
//export default store = createStore(events);