import {FILTER} from './actions-type'
const initialState = {
    Shoes: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FILTER:
            return{
                ...state, Shoes: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer;