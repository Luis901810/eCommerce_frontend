import { useParams } from 'react-router-dom'
import {
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import { TextFieldForm } from '../../styles/ComponentStyles'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { getShoeById } from '../../services/Dashboard'
import PhotoUpload from '../PhotoUpload/PhotoUpload'
import { updateUserSchema } from './Schemas'
import { isEmptyObject, isEmptyObjectObj } from '../../utils/tools'
import { dashboardAlert, errorDashboardAlert, successDashboardAlert } from '../../alerts/alerts'

export default function UpdateShoe() {
  const { id } = useParams()
  const [shoe, setShoe] = useState({})
  const [shoeUpdate, setShoeUpdate] = useState({})
  const [photo, setPhoto] = useState('')

  const genders = useSelector(state => state.genders)
  const colors = useSelector(state => state.colors)
  const sizes = useSelector(state => state.sizes)
  const brands = useSelector(state => state.brands)
  const materials = useSelector(state => state.materials)
  const categories = useSelector(state => state.categories)

  const navigate = useNavigate()

  //*Validacion de datos
  const [errors, setErrors] = useState({})
  useEffect(() => {
    console.log(errors)
  }, [errors])

  const handleBlur = async e => {
    const { name, value } = e.target
    try {
      await updateUserSchema.validateAt(name, { [name]: value })
      setErrors({
        ...errors,
        [name]: '',
      })
    } catch (error) {
      setErrors({
        ...errors,
        [name]: error.message,
      })
    }
  }

  //*Cambio de datos
  const handleChange = event => {
    if (event.target.name === 'stock' && !isNaN(Number(event.target.value))) {
      setShoeUpdate({
        ...shoeUpdate,
        [event.target.name]: Number(event.target.value),
      })
    } else {
      setShoeUpdate({ ...shoeUpdate, [event.target.name]: event.target.value })
    }
  }

  const handleCheckboxChange = id => {
    setShoeUpdate(prevFilters => {
      const currentFilters =
        prevFilters['categoryIds'] ||
        shoe['ShoeCategories'].map(element => element.id)
      return {
        ...prevFilters,
        ['categoryIds']: currentFilters.includes(id)
          ? currentFilters.filter(value => value !== id)
          : [...currentFilters, id],
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShoeById(id)
        console.log(data)
        setShoe(data)
        data.image ? setPhoto(data.image) : null
      } catch (error) {
        console.error('Error fetching shoe:', error)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const validateCategories = async () => {
      const name = 'categoryIds'
        const value = shoeUpdate.categoryIds
      try {
        
        await updateUserSchema.validateAt(name, { [name]: value })
        setErrors({
          ...errors,
          [name]: '',
        })
      } catch (error) {
        setErrors({
          ...errors,
          [name]: error.message,
        })
      }
    }
    shoeUpdate.categoryIds ? validateCategories() : null
    console.log(shoeUpdate)
  }, [shoeUpdate])

  useEffect(() => {
    console.log(photo)
    if (photo === '') {
    } else if (photo !== shoe.image) {
      setShoeUpdate({
        ...shoeUpdate,
        image: photo,
      })
    }
  }, [photo])

  // Updata info
  const handleUpdate = async () => {
    try {
      console.log(errors)
      if (isEmptyObjectObj(errors)) {
        const shoeUpdated = await axios.put(`${API_URL}/shoe/${id}`, shoeUpdate)
        await successDashboardAlert('Producto actualizado')
        setShoeUpdate({})
        navigate('/Admin')
      } else {
        errorDashboardAlert('Error en el llenado del formulario')
      }
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
        marginTop:10
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
        onBlur={handleBlur}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <PhotoUpload photo={photo} setPhoto={setPhoto} />
      <TextFieldForm
        required
        id='outlined-required'
        sx={{
          '& .MuiInputBase-input': {
            color: '#A0AAB4',
          },
        }}
        name='price'
        label='Precio'
        value={shoeUpdate.price ? shoeUpdate.price : shoe.price}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.price)}
        helperText={errors.price}
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
        onBlur={handleBlur}
        error={Boolean(errors.stock)}
        helperText={errors.stock}
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

      <FormControl error={Boolean(errors.categoryIds)}>
        <FormLabel>Categorias</FormLabel>
        <FormGroup label='Categorias'>
          {categories.map((category, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={
                    shoeUpdate['categoryIds']
                      ? shoeUpdate['categoryIds'].includes(category.id)
                      : shoe['ShoeCategories']
                          .map(element => element.id)
                          .includes(category.id)
                  }
                  onChange={() => handleCheckboxChange(category.id)}
                />
              }
              label={category.category}
              id={category.id}
              style={{ color: 'white' }}
              sx={{
                backgroundColor: '#303030',
                width: '275px',
                alignSelf: 'center',
                marginLeft: 2,
              }}
            />
          ))}
        </FormGroup>
        <FormHelperText>{errors.categoryIds}</FormHelperText>
      </FormControl>

      {isEmptyObjectObj(shoeUpdate) ? null : (
        <Box>
          <Button
            variant='outlined'
            size='medium'
            onClick={() => {
              setShoeUpdate({})
            }}
          >
            Descartar Cambios
          </Button>
          <Button variant='outlined' size='medium' onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Box>
      )}
    </Box>
  ) : null
}
