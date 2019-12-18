import { createStore } from 'redux'

import rootReducer from '../reducers/index';
//import events from '../reducers/events';

export default store = createStore(rootReducer);
//export default store = createStore(events);