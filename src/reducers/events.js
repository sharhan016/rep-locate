// const INITIAL_STATE = {
//     id: 0,
//     date: '02',
//     event: 'tly',
//     holiday: false,
    
//   };


const events = (state=[], action) => {
    switch(action.type){
        case 'ADD_EVENT':
            return[
                ...state,{
                    id: 0,
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