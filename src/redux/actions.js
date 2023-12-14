import {FILTER} from './actions-type'
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



