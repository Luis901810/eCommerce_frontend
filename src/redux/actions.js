import {
  API_URL,
  FILTER,
  GET_SHOE_BY_ID,
  FILTER_RANGE,
  FILTER_LOCAL,
  CHANGE_PAGE,
  POST_SHOE,
  ORDER, 
  ADD_TO_SHOPPING_CART, 
  SET_SHOPPING_CART,
  CREATE_PURCHASE_TICKET,
} from './actions-type'
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

export const filterLocal = filters => {
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
    payload: { min, max },
  }
}

export const changePage = page => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  }
}
export const order = (orderType, direction) => {
  return {
    type: ORDER,
    payload: { orderType, direction },
  }
}

export const postShoe = shoeData => {
  return async dispatch => {
    try {
      // Log de la data que se enviará al backend
      console.log('Data a enviar al backend:', shoeData)

      const response = await axios.post(`${API_URL}/shoe/`, shoeData)

      // Log de la respuesta del backend
      console.log('Respuesta del backend:', response.data)

      dispatch({
        type: POST_SHOE,
        payload: response.data,
      })
      console.log('Shoe created successfully:', response.data)
    } catch (error) {
      console.error('Error creating shoe:', error)

      dispatch({
        type: POST_SHOE,
        payload: null,
        error: 'Error creating shoe',
      })
    }
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
//!http://localhost:3001/order
export const createPurchaseTicket = (purchaseTicket) => {
  //Nececesito postear purchaseTicket, a la siguiente ruta  `${API_URL}/order`
  console.log("Ticket a crear",purchaseTicket)
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/order`, purchaseTicket)
      console.log('Respuesta del servidor:', response.data)
      alert('Orden Creada Exitosamente en estado Pending en el BACK')
      purchaseTicket= { 
        ...purchaseTicket,
        idOrder : response.data.id//! el ID del Back
      }
        dispatch({
        type: CREATE_PURCHASE_TICKET,
        payload: purchaseTicket,
        })
//       console.log('Shoe created successfully:', response.data)
      return response.data
    } catch (error) {
      console.log(error.response.data.error)
      alert(error.message)
            dispatch({
              type: CREATE_PURCHASE_TICKET,
              payload: null,
              error: 'Error creating TICKET',
            })
      
    }
  }
};
