// const INITIAL_STATE = {
//     id: 0,
//     date: '02',
//     event: 'tly',
//     holiday: false,
    
//   };

import { addEvent } from '../actions/index';
import { ADD_EVENT } from '../actions/actionTypes'

const events = (state= [], action) => {
   console.log('I am here state length = ', state.length)
   let id=0
   if(state.length === null | 0 ){
       id=0
   } else {
    id = state.length
   }
    switch(action.type){
        
        case ADD_EVENT:
            console.log('inside switch id = ', id )
            //const length = state.events.length
            return[
                ...state,
                {
                    id: id++,
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