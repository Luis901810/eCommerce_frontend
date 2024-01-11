import {
  FILTER,
  GET_SHOE_BY_ID,
  FILTER_RANGE,
  FILTER_LOCAL,
  CHANGE_PAGE,
  ORDER,
  POST_SHOE,
  ADD_TO_SHOPPING_CART,
  SET_SHOPPING_CART,
  CREATE_PURCHASE_TICKET,
  UPDATE_PURCHASE_TICKET,
  SET_CURRENT_USER,
} from './actions-type'

import initialState from './initialState'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      console.log(action.payload)
      const shoes = action.payload.map(shoe => {
        const sizeId = shoe.sizeId
        const sizeFound = state.sizes.find(s => s.id === sizeId)
        const size = sizeFound.size
        return {
          ...shoe,
          size: size ? size : null,
        }
      })
      return {
        ...state,
        Shoes: shoes,
        filteredShoes:
          state.filteredShoes.length === 0 ? shoes : state.filteredShoes,
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

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    case ORDER:
      const { orderType, direction } = action.payload

      if (orderType === 'none') {
        return {
          ...state,
          filteredShoes:
            state.orderBackup.length !== 0 ? state.Shoes : state.orderBackup,
        }
      }

      let orderedShoes = []

      if (orderType === 'price') {
        if (direction === 'dec') {
          orderedShoes = [...state.filteredShoes].sort((a, b) => {
            return a.price.localeCompare(b.price)
          })
        } else if (direction === 'asc') {
          orderedShoes = [...state.filteredShoes].sort((a, b) => {
            return b.price.localeCompare(a.price)
          })
        }
        return {
          ...state,
          orderBackup: state.filteredShoes,
          filteredShoes: orderedShoes,
        }
      } else if (orderType === 'size') {
        if (direction === 'dec') {
          orderedShoes = [...state.filteredShoes].sort((a, b) => {
            return a.size.localeCompare(b.size)
          })
        } else if (direction === 'asc') {
          orderedShoes = [...state.filteredShoes].sort((a, b) => {
            return b.size.localeCompare(a.size)
          })
        }
        return {
          ...state,
          orderBackup: state.filteredShoes,
          filteredShoes: orderedShoes,
        }
      }
    case POST_SHOE:
      return {
        ...state,
        Shoes: [...state.Shoes, action.payload],
      }


      case ADD_TO_SHOPPING_CART:
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, action.payload.product]
          
        }
      case SET_SHOPPING_CART:
        return {
            ...state,
            shoppingCart: action.payload,
        };

      case CREATE_PURCHASE_TICKET:
        return {
            ...state,
            PurchaseTicket:action.payload
        };
      case UPDATE_PURCHASE_TICKET:
        return {
          ...state,
          PurchaseTicket: action.payload,
        };
        case SET_CURRENT_USER:
          return {
           ...state,
           currentUser: action.payload
          }
    default:
      return state
  }
}

export default reducer
