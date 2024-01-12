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
        user.profilePicture
          ? setPhoto(user.profilePicture)
          : setPhoto(
              'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg'
            )
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
      window.alert('Usuario Actualizado')
      setUserUpdate({})
      const user = await getUserByID(id)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  return user.gender ? (
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
      <IconButton
        color='secondary'
        onClick={() => {
          navigate('/Admin')
        }}
      >
        <CloseIcon />
      </IconButton>
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
        value={userUpdate.name ? userUpdate.name : user.name}
        onChange={handleChange}
      />

      <PhotoUpload photo={photo} setPhoto={setPhoto} />

      <TextFieldForm
        disabled
        id='outlined-required'
        name='email'
        label='Email'
        value={user.email}
      />
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
        name='statusId'
        label='Status'
        value={userUpdate.statusId ? userUpdate.statusId : user.statusId}
        onChange={handleChange}
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
      {Object.keys(userUpdate).length ? (
        <Box>
          <Button
            variant='outlined'
            size='medium'
            onClick={() => {
              setUserUpdate({})
              user.profilePicture
                ? setPhoto(user.profilePicture)
                : setPhoto(
                    'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg'
                  )
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
  ) : null
}

export default UpdateUser
