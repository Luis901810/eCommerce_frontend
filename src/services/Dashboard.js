import axios from 'axios'
import { API_URL } from '../utils/constants'
import { object } from 'prop-types'

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/user`)
    const users = data
    const usersFiltered = users.filter(element => element.deletedAt === null)

    const response = await axios(API_URL + '/user-rol')
    const roles = response.data
    const usersWithRoles = usersFiltered.map(user => {
      const role = roles.find(element => element.id === user.roleId)
      return { ...user, role: role ? role.rol : 'Invitado' }
    })

    return usersWithRoles
  } catch (error) {
    console.error('Error fetching Userservices:', error.message)
  }
}

export const getUserByID = async id => {
  try {
    let { data: user } = await axios(`${API_URL}/user/${id}`)

    const { data: roles } = await axios(API_URL + '/user-rol')
    const role = roles.find(element => element.id === user.roleId)

    user['role'] = role
      ? role
      : {
          id: 'fc7dd551-c681-488d-9d17-955cad4c16a5',
          rol: 'Invitado',
          description:
            'Rol para usuarios no registrados o que no han iniciado sesión',
          createdAt: '2023-12-13T14:48:39.529Z',
          updatedAt: '2023-12-13T14:48:39.529Z',
        }

    const { data: genders } = await axios(API_URL + '/user-gender')
    const gender = genders.find(element => element.id === user.genderId)
    user['gender'] = gender
      ? gender
      : {
          id: '92bbee61-98a7-4510-8294-38aa08562b94',
          gender: 'Otro',
          description:
            'Género para usuarios que no se identifican como masculino o femenino.',
          createdAt: '2023-12-13T14:48:37.502Z',
          updatedAt: '2023-12-13T14:48:37.502Z',
        }

    const { data: statuses } = await axios(API_URL + '/user-status')
    const status = statuses.find(element => element.id === user.statusId)
    user['status'] = status
      ? status
      : {
          id: 'd85bdc23-1bc4-427c-9753-9c3214e7b559',
          status: 'Activo',
          description: 'Estado activo del usuario',
          createdAt: '2023-12-13T14:48:37.917Z',
          updatedAt: '2023-12-13T14:48:37.917Z',
        }

    return user
  } catch (error) {
    console.error('Error fetching user:', error.message)
  }
}

export const getShoes = async (filters = {}) => {
  try {
    let endpoint = API_URL + '/shoe?'
    for (let filter in filters) {
      if (filters[filter].length) {
        endpoint = endpoint + filter + '=' + filters[filter] + '&'
      }
    }
    endpoint = endpoint.slice(0, -1)
    const { data: shoes } = await axios.get(endpoint)

    const shoesFiltered = shoes.filter(element => element.deleteAt === null)
    // const uniqueNames = new Set(shoes.map(element => element.name))
    return shoesFiltered
  } catch (error) {
    console.error('Error fetching shoes:', error)
  }
}

export const getShoeById = async id => {
  try {
    let { data: shoe } = await axios(`${API_URL}/shoe/${id}`)

    return shoe
  } catch (error) {
    console.error('Error fetching shoes:', error)
  }
}

export const getOrders = async () => {
  try {
    let { data: orders } = await axios(`${API_URL}/order`)
    return orders
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

export const getOrderById = async id => {
  try {
    let { data: order } = await axios(`${API_URL}/order/${id}`)

    return order
  } catch (error) {
    console.error('Error fetching order:', error)
  }
}
