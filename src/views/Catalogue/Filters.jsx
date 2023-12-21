import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../../redux/actions'

export default function Filters() {
  const localStorageKey = 'filters'
  const [filters, setFilters] = useState(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem(localStorageKey)) || {}
      return storedData
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error)
      return {}
    }
  })

  const dispatch = useDispatch()

  const brands = useSelector(state => state.brands)
  const categories = useSelector(state => state.categories)
  const colors = useSelector(state => state.colors)
  const genders = useSelector(state => state.genders)
  const materials = useSelector(state => state.materials)
  const sizes = useSelector(state => state.sizes)

  const [open, setOpen] = useState({
    brands: false,
    categories: false,
    colors: false,
    genders: false,
    materials: false,
    sizes: false,
    range: false,
    reviews: false,
  })

  const [checkedFilters, setCheckedFilters] = useState(filters)

  const handleClick = name => {
    setOpen(prevData => ({ ...prevData, [name]: !prevData[name] }))
  }

  const handleAddFilter = (key, value) => {
    setCheckedFilters(prevFilters => ({
      ...prevFilters,
      [key]: [...(prevFilters[key] || []), value],
    }))
  }

  const handleCheckboxChange = (key, id) => {
    setCheckedFilters(prevFilters => {
      const currentFilters = prevFilters[key] || []
      return {
        ...prevFilters,
        [key]: currentFilters.includes(id)
          ? currentFilters.filter(value => value !== id)
          : [...currentFilters, id],
      }
    })
  }

  const handleRemoveFilter = (key, valueToRemove) => {
    setCheckedFilters(prevFilters => {
      const currentFilters = prevFilters[key] || []
      return {
        ...prevFilters,
        [key]: currentFilters.filter(value => value !== valueToRemove),
      }
    })
  }

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(checkedFilters))
      dispatch(filter(filters))
    } catch (error) {
      console.error('Error storing data in localStorage:', error)
    }
  }, [checkedFilters, localStorageKey])

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        backgroundColor: '#414141',
      }}
      component='nav'
      subheader={
        <ListSubheader sx={{ backgroundColor: '#303030', color: 'white' }}>
          Filtrar por:
        </ListSubheader>
      }
    >
      {/* Genders */}
      <ListItemButton onClick={() => handleClick('genders')}>
        <ListItemText primary='Géneros' />
        {open.genders ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.genders} timeout='auto' unmountOnExit>
        <FormGroup>
          {genders.map((gender, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={
                    checkedFilters['genders']?.includes(gender.id) || false
                  }
                  onChange={() => handleCheckboxChange('genders', gender.id)}
                />
              }
              label={gender.gender}
              id={gender.id}
            />
          ))}
        </FormGroup>
      </Collapse>

      {/* Brands */}
      <ListItemButton onClick={() => handleClick('brands')}>
        <ListItemText primary='Marcas' />
        {open.brands ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.brands} timeout='auto' unmountOnExit>
        <FormGroup>
          {brands.map((brand, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={
                    checkedFilters['brands']?.includes(brand.id) || false
                  }
                  onChange={() => handleCheckboxChange('brands', brand.id)}
                />
              }
              label={brand.brand}
              id={brand.id}
            />
          ))}
        </FormGroup>
      </Collapse>

      {/* Categories */}
      <ListItemButton onClick={() => handleClick('categories')}>
        <ListItemText primary='Categorías' />
        {open.categories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.categories} timeout='auto' unmountOnExit>
        <FormGroup>
          {categories.map((category, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={
                    checkedFilters['categories']?.includes(category.id) || false
                  }
                  onChange={() =>
                    handleCheckboxChange('categories', category.id)
                  }
                />
              }
              label={category.category}
              id={category.id}
            />
          ))}
        </FormGroup>
      </Collapse>

      {/* Sizes */}
      <ListItemButton onClick={() => handleClick('sizes')}>
        <ListItemText primary='Tallas' />
        {open.sizes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sizes} timeout='auto' unmountOnExit>
        <FormGroup>
          {sizes.map((size, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={checkedFilters['sizes']?.includes(size.id) || false}
                  onChange={() => handleCheckboxChange('sizes', size.id)}
                />
              }
              label={size.size}
              id={size.id}
            />
          ))}
        </FormGroup>
      </Collapse>
      {/* Colors */}
      <ListItemButton onClick={() => handleClick('colors')}>
        <ListItemText primary='Colores' />
        {open.colors ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.colors} timeout='auto' unmountOnExit>
        <FormGroup>
          {colors.map((color, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={
                    checkedFilters['colors']?.includes(color.id) || false
                  }
                  onChange={() => handleCheckboxChange('colors', color.id)}
                />
              }
              label={color.color}
              id={color.id}
            />
          ))}
        </FormGroup>
      </Collapse>
      {/* Materiales */}
      <ListItemButton onClick={() => handleClick('materials')}>
        <ListItemText primary='Materiales' />
        {open.materials ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.materials} timeout='auto' unmountOnExit>
        <FormGroup>
          {materials.map((material, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={
                    checkedFilters['materials']?.includes(material.id) || false
                  }
                  onChange={() =>
                    handleCheckboxChange('materials', material.id)
                  }
                />
              }
              label={material.material}
              id={material.id}
            />
          ))}
        </FormGroup>
      </Collapse>
      {/* Rango */}
      <ListItemButton onClick={() => handleClick('range')}>
        <ListItemText primary='Rango de precio' />
        {open.range ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.range} timeout='auto' unmountOnExit>
        <List component='div' disablePadding></List>
      </Collapse>
    </List>
  )
}
