import axios from 'axios'
import { API_URL } from './actions-type'

const initialState = {
  PurchaseTicket:[],
  shoppingCart:[],
  Shoe: {},
  Shoes: [],
  filteredShoes: [],
  orderBackup: [],
  error: false,
  brands: await axios(API_URL + '/shoe/brand')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  categories: await axios(API_URL + '/shoe/category')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  colors: await axios(API_URL + '/shoe/color')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  genders: await axios(API_URL + '/shoe/gender')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  materials: await axios(API_URL + '/shoe/material')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  sizes: await axios(API_URL + '/shoe/size')
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error)
      return []
    }),
  page:1,
  currentUser:{
    roleId: 'fc7dd551-c681-488d-9d17-955cad4c16a5'
  }
}

export default initialState
