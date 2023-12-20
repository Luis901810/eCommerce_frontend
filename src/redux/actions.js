import { FILTER, GET_ATRIBUTES, GET_SHOE_BY_ID } from "./actions-type";
import axios from "axios";
import { API_URL } from "../utils/constants";

export const createUser = (user) => {
  console.log("El usuario a crear: ", user);
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/user`, user);
      console.log("Respuesta del servidor:", response.data);
      alert("Registro exitoso");
      window.location.href = "http://localhost:3000"; //! al Landing
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.message);
    }
  };
};

export const getShoeById = (idShoe) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${API_URL}/shoe/${idShoe}`);
      const { data } = response;
      dispatch({
        type: GET_SHOE_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const updateUser = async (idUser, updatedUserData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/${idUser}`,
      updatedUserData
    );
    console.log("Respuesta del servidor:", response.data);
    //alert('Carga del usuario:');
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    alert(error.message);
    throw error;
  }
};

export const filter = (filters) => {
  console.log(filters);
  let endpoint = API_URL + "/shoe?";
  for (let filter in filters) {
    endpoint = endpoint + filter + "=" + filters[filter] + "&";
  }
  endpoint = endpoint.slice(0, -1);
  console.log(endpoint);
  return (dispatch) => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        return dispatch({
          type: FILTER,
          payload: data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: FILTER,
          payload: [],
        });
      });
  };
};

export const getAtributes = () => {
  return async (dispatch) => {
    try {
      const brands = await axios
        .get(API_URL + "/shoe/brand")
        .then(({ data }) => data);
      const categories = await axios
        .get(API_URL + "/shoe/category")
        .then(({ data }) => data);
      const colors = await axios
        .get(API_URL + "/shoe/color")
        .then(({ data }) => data);
      const genders = await axios
        .get(API_URL + "/shoe/gender")
        .then(({ data }) => data);
      const materials = await axios
        .get(API_URL + "/shoe/material")
        .then(({ data }) => data);
      const sizes = await axios
        .get(API_URL + "/shoe/size")
        .then(({ data }) => data);

      dispatch({
        type: GET_ATRIBUTES,
        payload: { brands, categories, colors, genders, materials, sizes },
      });
    } catch (error) {
      console.error("Error fetching attributes:", error);
      dispatch({
        type: GET_ATRIBUTES,
        payload: {
          brands: [],
          categories: [],
          colors: [],
          genders: [],
          materials: [],
          sizes: [],
        },
      });
    }
  };
};
