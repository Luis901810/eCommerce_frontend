import {FILTER} from './actions-type'
import { API_URL } from './actions-type'
import axios from 'axios'
const initialState = {
    Shoes: [],
    error: false,
    brands: await axios(API_URL + "/shoe/brand").then(({data}) =>data).catch((error)=>[]),
    categories: await axios(API_URL + "/shoe/category").then(({data}) =>data).catch((error)=>[]),
    colors: await axios(API_URL + "/shoe/color").then(({data}) =>data).catch((error)=>[]),
    genders: await axios(API_URL + "/shoe/gender").then(({data}) =>data).catch((error)=>[]),
    materials: await axios(API_URL + "/shoe/material").then(({data}) =>data).catch((error)=>[]),
    sizes: await axios(API_URL + "/shoe/size").then(({data}) =>data).catch((error)=>[]),
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FILTER:
            return{
                ...state, Shoes: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer;