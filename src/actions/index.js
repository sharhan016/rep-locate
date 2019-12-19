import { ADD_EVENT,TEST_EVENT } from './actionTypes';

let id=0

export const addEvent = (eventName) => {
    console.log('inside addEvent ',eventName)
    return {
        type: ADD_EVENT,
        id: id++,
        event: eventName
    }
}

export const testEvent = (text) => {
    return {
        type: TEST_EVENT,
        id: id++,
        text: text
    }
}