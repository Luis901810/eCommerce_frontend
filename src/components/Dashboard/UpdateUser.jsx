import { useParams } from 'react-router-dom'
import { Box, TextField, MenuItem, Button, IconButton } from '@mui/material'
import { TextFieldForm } from '../../styles/ComponentStyles'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { useEffect, useState } from 'react'
import { getUserByID } from '../../services/Dashboard'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'

import PhotoUpload from '../PhotoUpload/PhotoUpload'
import { isEmptyObjectObj } from '../../utils/tools'
import { successDashboardAlert } from '../../alerts/alerts'

const UpdateUser = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [userUpdate, setUserUpdate] = useState({})
  const [genders, setGenders] = useState([])
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState([])
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    setUserUpdate({ ...userUpdate, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByID(id)
        const { data: genders } = await axios(API_URL + '/user-gender')
        const { data: roles } = await axios(API_URL + '/user-rol')
        const { data: status } = await axios(API_URL + '/user-status')

        setUser(user)
        user.profilePicture ? setPhoto(user.profilePicture) : null
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

  useEffect(() => {
    console.log(photo)
    if (photo === '') {
    } else if (photo !== user.profilePicture) {
      setUserUpdate({
        ...userUpdate,
        profilePicture: photo,
      })
    }
  }, [photo])

  // Updata info
  const handleUpdate = async () => {
    try {
      const userUpdated = await axios.put(`${API_URL}/user/${id}`, userUpdate)
      successDashboardAlert('Usuario Actualizado')
      setUserUpdate({})
      navigate('/Admin')
    } catch (error) {
      console.log(error)
    }
  }

  return user.gender ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        
      }}
    >
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          position: 'relative',
          justifyItems: 'center',
          alignItems: 'center',
          backgroundColor:'#E2E8F0',
          padding: 5,
          borderRadius: 2,
        }}
        noValidate
        autoComplete='off'
      >
        <IconButton
          color='secondary'
          onClick={() => {
            navigate('/Admin')
          }}
          sx={{
            position: 'absolute',
            top:2,
            right: 2
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          position: 'relative',
          justifyItems: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <TextFieldForm
          required
          id='outlined-required'
          sx={{
            flexGrow: 1
            
          }}
          name='name'
          label='Nombre'
          value={userUpdate.name ? userUpdate.name : (user.name?user.name:'')}
          onChange={handleChange}
        />

        

        <TextFieldForm
          disabled
          id='outlined-required'
          name='email'
          label='Email'
          width='100%'
          value={user.email}
        />
        <Box>
        <TextFieldForm
          id='outlined-select-currency'
          select
          name='genderId'
          label='Género'
          value={userUpdate.genderId ? userUpdate.genderId : user.genderId}
          onChange={handleChange}
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
          name='roleId'
          label='Rol'
          value={userUpdate.roleId ? userUpdate.roleId : user.roleId}
          onChange={handleChange}
        >
          {roles.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.rol}
            </MenuItem>
          ))}
        </TextFieldForm>
        </Box>
        {!isEmptyObjectObj(userUpdate) ? (
          <Box>
            <Button
              variant='outlined'
              size='medium'
              onClick={() => {
                setUserUpdate({})
                user.profilePicture
                  ? setPhoto(user.profilePicture)
                  : null
              }}
            >
              Descartar Cambios
            </Button>
            <Button variant='outlined' size='medium' onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </Box>
        ) : null}
        </Box>
        <PhotoUpload photo={photo} setPhoto={setPhoto} />
      </Box>
    </Box>
  ) : null
}

export default UpdateUser
