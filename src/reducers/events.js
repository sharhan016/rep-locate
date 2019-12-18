const INITIAL_STATE = {
    id: 0,
    date: '02',
    event: 'tly',
    holiday: false,
    
  };

import { addEvent } from '../actions/index';

const events = (state= INITIAL_STATE, action) => {
   
    switch(action.type){
        
        case addEvent:
            return[
                {...state},
                {
                    id: action.id,
                    date: action.day,
                    event:action.text,
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