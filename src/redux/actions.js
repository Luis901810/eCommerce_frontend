import { API_URL, FILTER, GET_SHOE_BY_ID, FILTER_RANGE, FILTER_LOCAL, ORDER, ADD_TO_SHOPPING_CART, SET_SHOPPING_CART } from './actions-type'
import axios from 'axios'

export const filter = filters => {
  // console.log(filters)
  let endpoint = API_URL + '/shoe'
  // for (const filter in filters) {
  //   if (filters[filter].length) {
  //     endpoint = endpoint + filter + '=' + filters[filter] + '&'
  //   }
  // }
  // endpoint = endpoint.slice(0, -1)
  // console.log(endpoint)
  return dispatch => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        return dispatch({
          type: FILTER,
          payload: data,
        })
      })
      .catch(error => {
        console.log(error)
        return dispatch({
          type: FILTER,
          payload: [],
        })
      })
  }
}

export const filterLocal = (filters) => {
  return {
    type: FILTER_LOCAL,
    payload: filters,
  }
}

export const createUser = user => {
  console.log('El usuario a crear: ', user)
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/user`, user)
      console.log('Respuesta del servidor:', response.data)
      alert('Registro exitoso')
      window.location.href = 'http://localhost:3000' //! al Landing
      return response.data
    } catch (error) {
      console.log(error.response.data.error)
      alert(error.message)
    }
  }
}

export const getShoeById = idShoe => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/shoe/${idShoe}`)
      const { data } = response
      dispatch({
        type: GET_SHOE_BY_ID,
        payload: data,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const updateUser = async (idUser, updatedUserData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/${idUser}`,
      updatedUserData
    )
    console.log('Respuesta del servidor:', response.data)
    // alert('Carga del usuario:');
    return response.data
  } catch (error) {
    console.log(error.response.data.error)
    alert(error.message)
    throw error
  }
}

export const filterRange = (min, max) => {
  return {
    type: FILTER_RANGE,
    payload: {min, max},
  }
}

export const order = (orderType, direction) => {
  return {
    type: ORDER,
    payload: {orderType, direction}
  }
}
export const addToShoppingCart = (product) => {
  return {
    type: ADD_TO_SHOPPING_CART,
    payload: {product}
  }
}
export const setShoppingCart = (cart) => ({
  type: SET_SHOPPING_CART,
  payload: cart,
});