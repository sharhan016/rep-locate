import { ADD_EVENT } from './actionTypes';

let id=0

export const addEvent = (eventName) => {
    return {
        type: ADD_EVENT,
        id: id++,
        event: eventName
    }
}