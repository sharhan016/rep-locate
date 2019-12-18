import {combineReducers} from 'redux';
import events from './events';
import visibility from './visibility';

const rootReducer = combineReducers({
    events,
    visibility
});

export default rootReducer;