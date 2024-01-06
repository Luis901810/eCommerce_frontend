import { useParams } from 'react-router-dom'
import { Box, TextField, MenuItem, Button } from '@mui/material'
import { TextFieldForm } from '../../styles/ComponentStyles'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { useEffect, useState } from 'react'
import { getUserByID } from '../../services/Dashboard'

const UpdateUser = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [userUpdate, setUserUpdate] = useState({})
  const [genders, setGenders] = useState([])
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState([])

  const handleChange = (event)=>{
    setUserUpdate({...userUpdate, [event.target.name]: event.target.value})
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByID(id)
        const { data: genders } = await axios(API_URL + '/user-gender')
        const { data: roles } = await axios(API_URL + '/user-rol')
        const { data: status } = await axios(API_URL + '/user-status')
        setUser(user)
        setUserUpdate(user)
        setGenders(genders)
        setRoles(roles)
        setStatus(status)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    console.log(userUpdate)
  }, [userUpdate])

  //   console.log(user)

  return userUpdate.gender ? (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <TextFieldForm
        required
        id='outlined-required'
        sx={{
            '& .MuiInputBase-input': {
                color: '#A0AAB4',
              },
        }}
        name='name'
        label='Nombre'
        value={userUpdate.name}
        onChange={handleChange}
      />

      <TextFieldForm
        disabled
        id='outlined-required'
        name='email'
        label='Email'
        value={userUpdate.email}
      />
      <TextFieldForm
        id='outlined-select-currency'
        select
        label='Género'
        value={userUpdate.gender.gender}
      >
        {genders.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.gender}
          </MenuItem>
        ))}
      </TextFieldForm>
      <TextFieldForm
        id='outlined-select-currency'
        select
        label='Status'
        defaultValue='EUR'
        helperText='Please select your currency'
      >
        {status.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.status}
          </MenuItem>
        ))}
      </TextFieldForm>
      <TextFieldForm
        id='outlined-select-currency'
        select
        label='Rol'
        defaultValue=''
        helperText='Please select your currency'
      >
        {roles.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.rol}
          </MenuItem>
        ))}
      </TextFieldForm>
      <Box>
        <Button variant='outlined' size='medium'>
          Descartar Cambios
        </Button>
        <Button variant='outlined' size='medium'>
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  ) : null
}

export default UpdateUser
