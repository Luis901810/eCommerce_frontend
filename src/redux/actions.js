import { FILTER, GET_ATRIBUTES } from "./actions-type";
import axios from "axios";
import { API_URL } from "../utils/constants";

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
