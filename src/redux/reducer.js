import { FILTER, GET_ATRIBUTES } from "./actions-type";
import { API_URL } from "../utils/constants";
import axios from "axios";
const initialState = {
  Shoes: [],
  error: false,
  brands: [],
  categories: [],
  colors: [],
  genders: [],
  materials: [],
  sizes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        Shoes: action.payload,
      };
    case GET_ATRIBUTES:
      return {
        ...state,
        brands: action.payload.brands,
        categories: action.payload.categories,
        colors: action.payload.colors,
        genders: action.payload.genders,
        materials: action.payload.materials,
        sizes: action.payload.sizes,
      };
    default:
      return { ...state };
  }
};

export default reducer;
