import {combineReducers} from 'redux';
import events from './events';
import visibility from './visibility';
import user from './user';

const rootReducer = combineReducers({
    events,
    visibility,
    user
});

export default rootReducer;