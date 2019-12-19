import { addEvent } from '../actions/index';
import { ADD_EVENT } from '../actions/actionTypes'

const events = (state= [], action) => {
   let id=0
   if(state.length === null | 0 ){
       id=0
   } else {
    id = state.length
   }
    switch(action.type){
        
        case ADD_EVENT:
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