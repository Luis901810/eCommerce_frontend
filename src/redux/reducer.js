import { FILTER, GET_SHOE_BY_ID, FILTER_RANGE } from './actions-type'
import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        Shoes: action.payload,
      }
    case GET_SHOE_BY_ID:
      return {
        ...state,
        Shoe: action.payload,
      }
    case FILTER_RANGE:
      const { min, max } = action.payload
      const filteredShoes = state.filteredShoes.filter(shoe => {
        const price = parseInt(shoe.price.split('.'))
        if(price > min && price < max) {
          return shoe
        }
      })
      console.log('filtered shoes: ', filteredShoes);
      return{
        ...state,
        filteredShoes: filteredShoes.length === 0 ? state.Shoes : state.filteredShoes,
        Shoes: filteredShoes,
      }
    default:
      return { ...state }
  }
}

export default reducer
