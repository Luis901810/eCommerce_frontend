import { showPendingOrderAlert, showSuccessAlert } from '../alerts/alerts'
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
  UPDATE_PURCHASE_TICKET,
  SET_CURRENT_USER,
  GET_USER_BY_EMAIL,
  CLEAN_USER_DATA,
} from './actions-type'
import axios from 'axios'

export const filter = filters => {
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
        console.log(data)
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
      window.location.href = 'https://storecalzado.vercel.app' 
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
    return response.data
  } catch (error) {
    console.log(error.response.data.error)
    alert(error.message)
    throw error
  }
}

export const getUserByEmail = (email) => {
  console.log(GET_USER_BY_EMAIL,"************************")
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/user/${email}`, 
      {params: {findType: "email"}}
      );
      console.log('Respuesta del servidor:', response.data)
      dispatch({
        type: GET_USER_BY_EMAIL,
        payload: response.data, 
      });
    } catch (error) { 

      console.log(error.response.data)      
    } 
  }
};

export const cleanUserData = () => {
  return { type: CLEAN_USER_DATA }
};

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
export const setShoppingCart = (cart) => {
  return async dispatch => {
    dispatch ({
    type: SET_SHOPPING_CART,
    payload: cart}
    )

  }
};

export const createPurchaseTicket = (purchaseTicket, cart) => {
  //Nececesito postear purchaseTicket, a la siguiente ruta  `${API_URL}/order`
  console.log("Ticket a crear",purchaseTicket)
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/order`, purchaseTicket)//!http://localhost:3001/order
      console.log('Respuesta del servidor:', response.data)

      purchaseTicket = { //! Actualizar purchaseTicket con el ID del Back
        ...purchaseTicket,
        idOrder : response.data.id//! el ID del Back
      }
      localStorage.setItem( 'shoppingCart', JSON.stringify(cart))//! Guardar en localStorage
      localStorage.setItem( 'PurchaseTicket', JSON.stringify(purchaseTicket));//! Guardar en localStorage
      //! Despachar la acción
      dispatch({
        type: CREATE_PURCHASE_TICKET,
        payload: purchaseTicket,
      })
      showPendingOrderAlert()//! Me confirma que llegó 

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
export const updatePurchaseTicket = async (idOrder, idStatusTicket) => {
  
  try {
    const response = await axios.put(//! idorder prueba f92b109d-fa83-4a79-bebd-516385893966
      `${API_URL}/order/${idOrder}`,
      { statusId: idStatusTicket }
    )
    console.log('Respuesta del servidor:', response.data)
    console.log('Ticket Actualizado');
    // dispatch({ type: UPDATE_PURCHASE_TICKET, payload: response.data });
    return response.data;
  } catch (error) {
    console.log(error.response.data.error)
    alert(error.message)
    throw error
  }

}

export const saveStateToLocalStorage = () => {
  return (getState) => {
    try {
      const state = getState();
      const serializedState = JSON.stringify(state);
      localStorage.setItem("appState", serializedState);
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  };
};
//! Crear get Orders

export const setCurrentUser = (data) => {
  
  return {
          type: SET_CURRENT_USER,
          payload: data,
        }
}

// export const saveStateToLocalStorage = () => {
//   return (getState) => {
//     try {
//       const state = getState();
//       const serializedState = JSON.stringify(state);
//       localStorage.setItem("appState", serializedState);
//     } catch (error) {
//       console.error("Error saving state to localStorage:", error);
//     }
//   };
// };

export const Notifiactions = (id,status) => {
 const data = { statusId: status,
  userId: id}
  console.log('Información a Crear', data)
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/order`, data)
      console.log('Respuesta del servidor:', response.data)
      alert('Notificación exitosa')
      return response.data
    } catch (error) {
      console.log(error.response.data.error)
      alert(error.message)
    }
  }
}