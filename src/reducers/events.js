import { addEvent } from '../actions/index';
import { ADD_EVENT, ADD_LEAVE } from '../actions/actionTypes'

const events = (state = [], action) => {
    let id = 0
    if (state.length === null || 0) {
        id = 0
    } else {
        id = state.length
    }



    switch (action.type) {

        case ADD_EVENT:
            var newArr = [...state];
            if (newArr.length == 0) {
                return [
                    ...state,
                    {
                        id: id++,
                        date: action.payload.day,
                        event: action.payload.text,
                        month: action.payload.month,
                        year: action.payload.year,
                        //holiday: false
                    }
                ]
            }else{
                
            newArr.forEach( event => {
                if(event.date === action.payload.day){
                    console.log('Same Date Detected e and a ',event.date,action.payload.day)
                    event.event = action.payload.text
                    return [
                        newArr
                     ]
                }   
                console.log('NEWARR in else ForEach ',newArr)
                
            })
            
        }
            /*
            for (let i = 1; i < newArr.length; i++) {
                console.log('payload day ', action.payload.day)
                console.log('new Arrays date ',newArr[i].date)
                if (action.payload.day == newArr[i].date ) {
                    console.log('Same Date Detected',action.payload.text);
                    newArr[i].event = action.payload.text;
                    return [
                        ...newArr
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

            */

        // return[
        //     ...state,
        //     {
        //         id: id++,
        //         date: action.payload.day,
        //         event:action.payload.text,
        //         holiday: false
        //     }
        // ]

        case ADD_LEAVE:
            console.log('Reached ADD_LEAVE action.type= ',action.type )
            return [
                ...state, {
                    id: id++,
                    date: action.payload.day,
                    event: action.payload.text,
                    month: action.payload.month,
                    year: action.payload.year,
                    //holiday: true
                }
            ]

        default:
            return state
    }
}

export default events