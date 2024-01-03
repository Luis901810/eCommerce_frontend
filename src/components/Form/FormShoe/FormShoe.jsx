import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { postShoe } from '../../../redux/actions'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import PhotoUpload from '../../PhotoUpload/PhotoUpload'

function FormShoe() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '0',
    image: '',
    stock: 0,
    discountPercentage: 0,
    size: '',
    color: '',
    brand: '',
    material: '',
    gender: '',
    categoryIds: [],
  })

  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/brand')
      .then(response => {
        setBrands(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/category')
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [colors, setColors] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/color')
      .then(response => {
        setColors(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [genders, setGenders] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/gender')
      .then(response => {
        setGenders(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [materials, setMaterials] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/material')
      .then(response => {
        setMaterials(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const [sizes, setSizes] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/shoe/size')
      .then(response => {
        setSizes(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleSetPhoto = photo => {
    // Actualiza el estado con la nueva imagen
    setFormData({
      ...formData,
      image: photo,
    })
  }

  const handleInputChange = e => {
    const { name, value } = e.target

    // Si es el campo 'price', convierte el valor a un número decimal con dos decimales
    const formattedValue =
      name === 'price' ? parseFloat(value).toFixed(2) : value

    // Si es un campo de categoría, maneja la lógica de selección múltiple
    const updatedCategories =
      name === 'category' ? (Array.isArray(value) ? value : [value]) : undefined

    // Actualiza el estado con el nuevo valor
    setFormData({
      ...formData,
      [name]:
        updatedCategories !== undefined ? updatedCategories : formattedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postShoe(formData))

    // Restablecer el formulario
    setFormData({
      name: '',
      description: '',
      price: 0,
      image: '',
      stock: 0,
      discountPercentage: 0,
      size: '',
      color: '',
      brand: '',
      material: '',
      gender: '',
      categoryIds: [],
    })
  }

  const formStyle = {
    marginTop: '64px',
  }

  const textStyle = {
    color: '#fff',
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='name' style={textStyle}>
          Nombre:
        </InputLabel>
        <Input
          id='name'
          name='name'
          value={formData.name}
          style={textStyle}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='description' style={textStyle}>
          Descripción:
        </InputLabel>
        <Input
          id='description'
          name='description'
          value={formData.description}
          style={textStyle}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='price' style={textStyle}>
          Precio:
        </InputLabel>
        <Input
          id='price'
          name='price'
          type='number'
          value={formData.price}
          style={textStyle}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='image' style={textStyle}>
          Imagen:
        </InputLabel>
        <PhotoUpload photo={formData.image} setPhoto={handleSetPhoto} />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='stock' style={textStyle}>
          Stock:
        </InputLabel>
        <Input
          id='stock'
          name='stock'
          type='number'
          value={formData.stock}
          style={textStyle}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='discountPercentage' style={textStyle}>
          Porcentaje de Descuento:
        </InputLabel>
        <Input
          id='discountPercentage'
          name='discountPercentage'
          type='number'
          value={formData.discountPercentage}
          style={textStyle}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='size' style={textStyle}>
          Tamaño:
        </InputLabel>
        <Select
          id='size'
          name='size'
          value={formData.size}
          style={textStyle}
          onChange={handleInputChange}
        >
          {sizes.map(size => (
            <MenuItem key={size.id} value={size.id}>
              {size.size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='color' style={textStyle}>
          Color:
        </InputLabel>
        <Select
          id='color'
          name='color'
          value={formData.color}
          style={textStyle}
          onChange={handleInputChange}
        >
          {colors.map(color => (
            <MenuItem key={color.id} value={color.id}>
              {color.color}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='brand' style={textStyle}>
          Marca:
        </InputLabel>
        <Select
          id='brand'
          name='brand'
          value={formData.brand}
          style={textStyle}
          onChange={handleInputChange}
        >
          {brands.map(brand => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='material' style={textStyle}>
          Material:
        </InputLabel>
        <Select
          id='material'
          name='material'
          value={formData.material}
          style={textStyle}
          onChange={handleInputChange}
        >
          {materials.map(material => (
            <MenuItem key={material.id} value={material.id}>
              {material.material}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='gender' style={textStyle}>
          Genero:
        </InputLabel>
        <Select
          id='gender'
          name='gender'
          value={formData.gender}
          style={textStyle}
          onChange={handleInputChange}
        >
          {genders.map(gender => (
            <MenuItem key={gender.id} value={gender.id}>
              {gender.gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel htmlFor='categoryIds' style={textStyle}>
          Category:
        </InputLabel>
        <Select
          id='categoryIds'
          name='categoryIds'
          multiple
          value={formData.categoryIds}
          style={textStyle}
          onChange={handleInputChange}
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant='contained' color='primary' type='submit'>
        Crear
      </Button>
    </form>
  )
}

export default FormShoe
