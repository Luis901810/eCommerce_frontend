import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
  InputAdornment
} from '@mui/material'
import { TextFieldForm } from '../../../styles/ComponentStyles'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { API_URL } from '../../../utils/constants'
import PhotoUpload from '../../PhotoUpload/PhotoUpload'
import { Box } from '@mui/system'
import { createShoeSchema } from '../../Dashboard/Schemas'
import { isEmptyObjectObj } from '../../../utils/tools'
import { errorDashboardAlert, successDashboardAlert } from '../../../alerts/alerts'

function FormShoe() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '10',
    image: '',
    stock: 1,
    discountPercentage: 0,
    size: '',
    color: '',
    brand: '',
    material: '',
    gender: '',
    categoryIds: [],
  })
  const [photo, setPhoto] = useState('')

  const brands = useSelector(state => state.brands)
  const categories = useSelector(state => state.categories)
  const colors = useSelector(state => state.colors)
  const genders = useSelector(state => state.genders)
  const materials = useSelector(state => state.materials)
  const sizes = useSelector(state => state.sizes)

  //*Validacion de datos
  const [errors, setErrors] = useState({})

  const handleBlur = async e => {
    const { name, value } = e.target
    try {
      await createShoeSchema.validateAt(name, { [name]: value })
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
  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    const validatePhoto = async()=>{
      const name = 'image'
      const value = photo
      try {
        await createShoeSchema.validateAt(name, { [name]: value })
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
    validatePhoto()
    setFormData({
      ...formData,
      image: photo,
    })
  }, [photo])

  const handleInputChange = async e => {
    let { name, value } = e.target

    // Si es el campo 'price', convierte el valor a un número decimal con dos decimales
    const formattedValue =
      name === 'price' ? parseFloat(value).toFixed(2) : value

    // Si es un campo de categoría, maneja la lógica de selección múltiple
    const updatedCategories =
      name === 'categoryIds'
        ? Array.isArray(value)
          ? value
          : [value]
        : undefined

    // Actualiza el estado con el nuevo valor
    setFormData({
      ...formData,
      [name]:
        updatedCategories !== undefined ? updatedCategories : formattedValue,
    })

    try {
      if (name === 'categoryIds') {
        value = Array.isArray(value) ? value : [value]
      }
      await createShoeSchema.validateAt(name, { [name]: value })
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
  

  const handleSubmit = async e => {
    e.preventDefault()
    
    
    try {
      if (isEmptyObjectObj(errors)) {
        const response = await axios.post(`${API_URL}/shoe/`, formData)

        successDashboardAlert(`Producto: ${formData.name} fue creado exitosamente`)
        // Restablecer el formulario
        setFormData({
          name: '',
          description: '',
          price: '10',
          image: '',
          stock: 1,
          discountPercentage: 0,
          size: '',
          color: '',
          brand: '',
          material: '',
          gender: '',
          categoryIds: [],
        
        })
      } else {
        errorDashboardAlert('Error en el llenado del formulario')
      }
    } catch (error) {
      console.error('Error creating shoe:', error)
    }
  }

  const formStyle = {
    marginTop: '100px',
    backgroundColor: '#414141',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '90vw',
    alignItems: 'center',
    marginLeft: '50px',
  }

  const textStyle = {
    color: '#fff',
    width: '300px',
  }

  const labelStyle = {
    color: '#fff',
  }

  const selectStyle = {
    width: '200px',
    backgroundColor: '#303030',
    border: '1px solid #42e268',
  }

  const boxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    width: '80vw',
  }
  const boxStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
  }

  const itemStyle = {
    backgroundColor: '#42e268',
    border: '1px solid #303030 ',
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Box style={boxStyle}>
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
          value={formData.name}
          onChange={handleInputChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <TextFieldForm
          required
          id='outlined-required'
          sx={{
            '& .MuiInputBase-input': {
              color: '#A0AAB4',
            },
          }}
          name='description'
          label='Descripción'
          value={formData.description}
          onChange={handleInputChange}
          error={Boolean(errors.description)}
          helperText={errors.description}
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
          label='Precio'
          type='number'
          value={formData.price}
          onChange={handleInputChange}
          error={Boolean(errors.price)}
          helperText={errors.price}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <IconButton
          color='secondary'
          onClick={() => {
            navigate('/Admin')
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box style={boxStyle}>
        <FormControl error={Boolean(errors.image)} fullWidth margin='normal'>
          <PhotoUpload photo={photo} setPhoto={setPhoto} />
          <FormHelperText>{errors.image}</FormHelperText>
        </FormControl>

        <Box style={boxStyle2}>
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
            type='number'
            value={formData.stock}
            onChange={handleInputChange}
            error={Boolean(errors.stock)}
            helperText={errors.stock}
          />

          <TextFieldForm
            required
            id='outlined-required'
            sx={{
              '& .MuiInputBase-input': {
                color: '#A0AAB4',
              },
            }}
            name='discountPercentage'
            label='Porcentaje de Descuento'
            type='number'
            value={formData.discountPercentage}
            onChange={handleInputChange}
            error={Boolean(errors.discountPercentage)}
            helperText={errors.discountPercentage}
          />
        </Box>
      </Box>
      <Box style={boxStyle}>
        <TextFieldForm
          id='outlined-select-currency'
          select
          required
          name='size'
          label='Talla'
          value={formData.size}
          onChange={handleInputChange}
          error={Boolean(errors.size)}
          helperText={errors.size}
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
          name='color'
          label='Color'
          required
          value={formData.color}
          onChange={handleInputChange}
          error={Boolean(errors.color)}
          helperText={errors.color}
        >
          {colors.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.color}
            </MenuItem>
          ))}
        </TextFieldForm>

        <TextFieldForm
          id='outlined-select-currency'
          select
          name='brand'
          label='Marca'
          required
          value={formData.brand}
          onChange={handleInputChange}
          error={Boolean(errors.brand)}
          helperText={errors.brand}
        >
          {brands.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.brand}
            </MenuItem>
          ))}
        </TextFieldForm>
      </Box>
      <Box style={boxStyle}>
        <TextFieldForm
          id='outlined-select-currency'
          select
          name='material'
          label='Material'
          required
          value={formData.material}
          onChange={handleInputChange}
          error={Boolean(errors.material)}
          helperText={errors.material}
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
          name='gender'
          label='Género'
          required
          value={formData.gender}
          onChange={handleInputChange}
          error={Boolean(errors.gender)}
          helperText={errors.gender}
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
          name='categoryIds'
          required
          multiple
          label='Categoria'
          value={formData.categoryIds}
          onChange={handleInputChange}
          error={Boolean(errors.categoryIds)}
          helperText={errors.categoryIds}
        >
          {categories.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.category}
            </MenuItem>
          ))}
        </TextFieldForm>

        {/* <FormControl fullWidth margin='normal'>
          <InputLabel htmlFor='categoryIds' style={labelStyle}>
            Category:
          </InputLabel>
          <Select
            id='categoryIds'
            name='categoryIds'
            multiple
            value={formData.categoryIds}
            style={selectStyle}
            onChange={handleInputChange}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id} style={itemStyle}>
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </Box>
      <Button
        sx={{ backgroundColor: '#42e268', marginTop: 5, marginRight: 15 }}
        variant='contained'
        color='primary'
        type='submit'
      >
        Crear
      </Button>
    </form>
  )
}

export default FormShoe
