import { addEvent } from '../actions/index';
import { ADD_EVENT } from '../actions/actionTypes'

const events = (state = [], action) => {
    let id = 0
    if (state.length === null | 0) {
        id = 0
    } else {
        id = state.length
    }
    switch (action.type) {

        case ADD_EVENT:
            var newArr = [...state];
            console.log('length of new array ', newArr.length)
            if (newArr.length == 0) {
                return [
                    ...state,
                    {
                        id: id++,
                        date: action.payload.day,
                        event: action.payload.text,
                        holiday: false
                    }
                ]
            }
            for (let i = 0; i < newArr.length; i++) {
                var data = newArr[i];
                console.log('day key in data ', data)
                if (data.date === action.payload.day) {
                    console.log('Same Date Detected');
                    data.event = action.payload.event;
                    return [
                        ...state
                    ]

                } else {
                    console.log('else statement')
                    return [
                        ...state,
                        {
                            id: id++,
                            date: action.payload.day,
                            event: action.payload.text,
                            holiday: false
                        }
                    ]
                }

            }

        // return[
        //     ...state,
        //     {
        //         id: id++,
        //         date: action.payload.day,
        //         event:action.payload.text,
        //         holiday: false
        //     }
        // ]

        case 'ADD_LEAVE':
            return [
                ...state, {
                    id: id++,
                    date: action.payload.day,
                    event: action.payload.text,
                    holiday: true
                }
            ]

        default:
            return state
    }
}

export default events