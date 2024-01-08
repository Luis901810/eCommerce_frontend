import { useParams } from 'react-router-dom'
import { Box, TextField, MenuItem, Button, IconButton } from '@mui/material'
import { TextFieldForm } from '../../styles/ComponentStyles'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { getShoeById } from '../../services/Dashboard'

export default function UpdateShoe() {
  const { id } = useParams()
  const [shoe, setShoe] = useState({})
  const [shoeUpdate, setShoeUpdate] = useState({})

  const genders = useSelector(state => state.genders)
  const colors = useSelector(state => state.colors)
  const sizes = useSelector(state => state.sizes)
  const brands = useSelector(state => state.brands)
  const materials = useSelector(state => state.materials)

  const navigate = useNavigate()

  //*Cambio de datos
  const handleChange = event => {
    if (event.target.name === 'stock') {
        setShoeUpdate({ ...shoeUpdate, [event.target.name]: Number(event.target.value) })
    } else {
      setShoeUpdate({ ...shoeUpdate, [event.target.name]: event.target.value })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShoeById(id)
        console.log(data)
        setShoe(data)
      } catch (error) {
        console.error('Error fetching shoe:', error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    console.log(shoeUpdate)
  }, [shoeUpdate])

  // Updata info
  const handleUpdate = async () => {
    try {
      const shoeUpdated = await axios.put(`${API_URL}/shoe/${id}`, shoeUpdate)
      window.alert('Producto Actualizado')
      setShoeUpdate({})
      const data = await getShoeById(id)
      setShoe(data)
    } catch (error) {
      console.log(error)
    }
  }

  return shoe.name ? (
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
        label='Producto'
        value={shoeUpdate.name ? shoeUpdate.name : shoe.name}
        onChange={handleChange}
      />
      <TextFieldForm
        required
        id='outlined-required'
        sx={{
          '& .MuiInputBase-input': {
            color: '#A0AAB4',
          },
        }}
        name='price'
        label='Producto'
        value={shoeUpdate.price ? shoeUpdate.price : shoe.price}
        onChange={handleChange}
      />
      <TextFieldForm
        required
        id='outlined-required'
        sx={{
          '& .MuiInputBase-input': {
            color: '#A0AAB4',
          },
        }}
        name='stock'
        label='Stock'
        value={shoeUpdate.stock ? shoeUpdate.stock : shoe.stock}
        onChange={handleChange}
      />

      <TextFieldForm
        id='outlined-select-currency'
        select
        name='brandId'
        label='Marca'
        value={shoeUpdate.brandId ? shoeUpdate.brandId : shoe.brandId}
        onChange={handleChange}
      >
        {brands.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.brand}
          </MenuItem>
        ))}
      </TextFieldForm>

      <TextFieldForm
        id='outlined-select-currency'
        select
        name='genderId'
        label='Género'
        value={shoeUpdate.genderId ? shoeUpdate.genderId : shoe.genderId}
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
        name='materialId'
        label='Material'
        value={shoeUpdate.materialId ? shoeUpdate.materialId : shoe.materialId}
        onChange={handleChange}
      >
        {materials.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.material}
          </MenuItem>
        ))}
      </TextFieldForm>

      <TextFieldForm
        id='outlined-select-currency'
        select
        name='sizeId'
        label='Talla'
        value={shoeUpdate.sizeId ? shoeUpdate.sizeId : shoe.sizeId}
        onChange={handleChange}
      >
        {sizes.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.size}
          </MenuItem>
        ))}
      </TextFieldForm>

      <TextFieldForm
        id='outlined-select-currency'
        select
        name='colorId'
        label='Color'
        value={shoeUpdate.colorId ? shoeUpdate.colorId : shoe.colorId}
        onChange={handleChange}
      >
        {colors.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.color}
          </MenuItem>
        ))}
      </TextFieldForm>

      {Object.keys(shoeUpdate).length ? (
        <Box>
          <Button
            variant='outlined'
            size='medium'
            onClick={() => {
              setUserUpdate({})
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
