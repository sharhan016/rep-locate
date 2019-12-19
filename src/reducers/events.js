// const INITIAL_STATE = {
//     id: 0,
//     date: '02',
//     event: 'tly',
//     holiday: false,
    
//   };

import { addEvent } from '../actions/index';
import { ADD_EVENT } from '../actions/actionTypes'

const events = (state= [], action) => {
   console.log('I am here ', action.type)
   let id = 0
    switch(action.type){
        
        case ADD_EVENT:
            console.log('inside switch ', action.payload)
            return[
                ...state,
                {
                    id: action.payload.day,
                    date: action.payload.day,
                    event:action.payload.text,
                    holiday: false
                }
            ]
    
        case 'ADD_LEAVE':
            return[
                ...state,{
                    id:action.id,
                    date: action.day,
                    holiday: true
                }
            ]

        default:
            return state
    }
}

export default events