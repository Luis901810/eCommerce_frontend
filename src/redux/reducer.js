import { FILTER, GET_SHOE_BY_ID } from './actions-type'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state, Shoes: action.payload
      }
    case GET_SHOE_BY_ID:
      return {
        ...state,
        Shoe: action.payload
      }
    default:
      return { ...state }
  }
}

export default reducer
