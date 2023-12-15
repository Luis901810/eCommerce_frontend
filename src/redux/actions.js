import {FILTER , GET_SHOE_BY_ID} from './actions-type'
import axios from 'axios'
import { API_URL } from '../utils/constants'
 
export const filter = (filters) => {
    console.log(filters)
    let endpoint = API_URL + "/shoe?"
    for(let filter in filters) {
        endpoint = endpoint + filter +"="+ filters[filter] + "&" 
    }
    endpoint = endpoint.slice(0,-1)
    console.log(endpoint)
    return (dispatch) => {
        axios.get(endpoint).then(({data}) => {
            return dispatch({
                type: FILTER,
                payload: data
            })
        }).catch((error) => {
            return dispatch({
                type: FILTER,
                payload: []
            })
        })
    } 
}

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
    }
}



