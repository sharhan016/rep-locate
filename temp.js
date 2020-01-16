import { addEvent } from '../actions/index';
import { ADD_EVENT, ADD_LEAVE } from '../actions/actionTypes'
import moment from 'moment';


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
            if (newArr.length != 0) {
                console.log('Executed SECOND')

                newArr.forEach(event => {
                    
                    let eventDate = event.date.format('DD');
                    let date = action.payload.day.format('DD');
                    if (eventDate === date) {
                        console.log('Same Date Detected e and a ', event.date, action.payload.day)
                        event.event = action.payload.text
                        // event.month = action.payload.month
                        // event.DATE = action.payload.date
                        return [
                            newArr
                        ]
                    }
                    //  else {
                    //     console.log('REACHED INSIDE  FOREACH ELSE', action.payload)
                    //     let elseArr = [...newArr,
                    //     {
                    //             id: id++,
                    //             date: action.payload.day,
                    //             event: action.payload.text,
                    //             month: action.payload.month,
                    //             DATE: action.payload.date
                    //     }
                    //     ]
                    //     console.log('ELSE ARRAY',elseArr)
                    //     return [
                    //        elseArr
                    //     ]
                    // }
                })
            }

            else {
                console.log('REACHED ELSE FIRST ENTRY')
                let date = action.payload.day.format('DD');
                return [
                    newArr,
                    {
                        id: id++,
                        date: action.payload.day,
                        event: action.payload.text,
                        //month: action.payload.month,
                        //DATE: action.payload.date,
                        //holiday: false
                    }
                ]
            }


        // return [
        //     ...state,
        //     {
        //         id: id++,
        //         date: action.payload.day,
        //         event: action.payload.text,
        //         month: action.payload.month,
        //         DATE:  action.payload.date,
        //         //holiday: false
        //     }
        // ]
        // }else{

        // // newArr.forEach( event => {
        // //     if(event.date === action.payload.day){
        // //         console.log('Same Date Detected e and a ',event.date,action.payload.day)
        // //         event.event = action.payload.text
        // //         event.month = action.payload.month
        // //         event.DATE = action.payload.date
        // //         return [
        // //             newArr
        // //          ]
        //     }
        //     else{
        //         console.log('REACHED INSIDE IF FOREACH')
        //         return [
        //             ...newArr,
        //             {
        //                 id: id++,
        //                 date: action.payload.day,
        //                 event: action.payload.text,
        //                 month: action.payload.month,
        //                 DATE:  action.payload.date,
        //                 //holiday: false
        //             }
        //         ]
        // //     }   
        //     console.log('NEWARR',newArr)

        // })

        //}


        case ADD_LEAVE:
            return [
                ...state, {
                    id: id++,
                    date: action.payload.day,
                    event: action.payload.text,
                    //holiday: true
                }
            ]

        default:
            return state
    }
}

export default events