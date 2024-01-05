import axios from "axios"
import { API_URL } from "../utils/constants"

export const getUsers = async()=>{
    try {
        const { data } = await axios.get(`${API_URL}/user`)
        const users = data

        const response = await axios(API_URL+'/user-rol')
        const roles = response.data
        const usersWithRoles = users.map(user=>{
            const role = roles.find(element => element.id === user.roleId)
            return {...user, role: role? role.rol:"Invitado"}
        })

        return usersWithRoles
    } catch (error) {
      console.error('Error fetching Userservices:', error.message)
    }
}