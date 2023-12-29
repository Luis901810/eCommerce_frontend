import {
  FILTER,
  GET_SHOE_BY_ID,
  FILTER_RANGE,
  FILTER_LOCAL,
} from './actions-type'

import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        Shoes: action.payload,
        filteredShoes: state.filteredShoes.length === 0 ? action.payload : state.filteredShoes,
      }


    case GET_SHOE_BY_ID:
      return {
        ...state,
        Shoe: action.payload,
      }

    case FILTER_RANGE:
      const { min, max } = action.payload
      const filteredRangeShoes = state.Shoes.filter(shoe => {
        const price = parseInt(shoe.price.split('.'))
        return price > min && price < max
      })

      return {
        ...state,
        filteredShoes: filteredRangeShoes,
      }

    case FILTER_LOCAL:
      const filters = action.payload
      const filteredShoes = state.Shoes.filter(shoe => {
        return Object.keys(filters).every(filterType => {
          const filterValues = filters[filterType]

          if (filterValues.length === 0) {
            return true
          }

          const shoeValue = shoe[`${filterType}Id`]
          const match = filterValues.some(value => shoeValue === value)

          return match
        })
      })

      return {
        ...state,
        filteredShoes: filteredShoes,
      }

    default:
      return state
  }
}

export default reducer
