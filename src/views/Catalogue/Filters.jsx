import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import { filter, filterLocal, filterRange } from '../../redux/actions'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import Slider, { SliderThumb } from '@mui/material/Slider'

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#42e268',
  height: 3,
  width: '275px',
  marginTop: 10,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: 'white',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#303030' : '#303030',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}))

function AirbnbThumbComponent(props) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className='airbnb-bar' />
      <span className='airbnb-bar' />
      <span className='airbnb-bar' />
    </SliderThumb>
  )
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
}

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

  const shoes = useSelector(state => state.Shoes)

  const brands = useSelector(state => state.brands)
  const categories = useSelector(state => state.categories)
  const colors = useSelector(state => state.colors)
  const genders = useSelector(state => state.genders)
  const materials = useSelector(state => state.materials)
  const sizes = useSelector(state => state.sizes)

  const [maxValue, setMaxValue] = useState(1000)

  const [range, setRange] = useState({
    min: 0,
    max: 1000,
  })

  const [changed, setChanged] = useState(false)

  useEffect(() => {
    let max = 0;
    shoes.forEach(shoe => {
      const price = parseFloat(shoe.price.replace(",", ""));
      if (!isNaN(price) && price > max) {
        max = price;
      }
    });
    setMaxValue(max);
    console.log(shoes);
    console.log('max is ', max);
  }, [shoes]);  

  const handleRangeChange = (event, newValue) => {
    setRange({
      min: newValue[0],
      max: newValue[1],
    })
  }

  const handleTextFieldChange = event => {
    const { id, value } = event.target
    setRange(prevRange => ({
      ...prevRange,
      [id]: Number(value),
    }))
  }

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
      const storedData = JSON.parse(localStorage.getItem(localStorageKey)) || {}
      dispatch(filterLocal(storedData))
    } catch (error) {
      console.error('Error storing data in localStorage:', error)
    }
  }, [checkedFilters, localStorageKey])

  useEffect(() => {
    setChanged(true)
  }, [range])

  useEffect(() => {
    setTimeout(() => {
      if (changed) {
        dispatch(filterRange(range.min, range.max))
        setChanged(false)
        return
      }
      console.log('back to false')
      return
    }, 100)
  }, [changed])

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        backgroundColor: '#414141',
        marginTop: '15px'
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
        <ListItemText
          primary='Géneros'
          sx={{ color: open.genders ? 'white' : '#42e268' }}
        />
        {open.genders ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.genders} timeout='auto' unmountOnExit>
        <FormGroup>
          {genders.map((gender, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={
                    checkedFilters['gender']?.includes(gender.id) || false
                  }
                  onChange={() => handleCheckboxChange('gender', gender.id)}
                />
              }
              label={gender.gender}
              id={gender.id}
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
      </Collapse>

      {/* Brands */}
      <ListItemButton onClick={() => handleClick('brands')}>
        <ListItemText
          primary='Marcas'
          sx={{ color: open.brands ? 'white' : '#42e268' }}
        />
        {open.brands ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.brands} timeout='auto' unmountOnExit>
        <FormGroup>
          {brands.map((brand, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={checkedFilters['brand']?.includes(brand.id) || false}
                  onChange={() => handleCheckboxChange('brand', brand.id)}
                />
              }
              label={brand.brand}
              id={brand.id}
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
      </Collapse>

      {/* Sizes */}
      <ListItemButton onClick={() => handleClick('sizes')}>
        <ListItemText
          primary='Tallas'
          sx={{ color: open.sizes ? 'white' : '#42e268' }}
        />
        {open.sizes ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.sizes} timeout='auto' unmountOnExit>
        <FormGroup>
          {sizes.map((size, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={checkedFilters['size']?.includes(size.id) || false}
                  onChange={() => handleCheckboxChange('size', size.id)}
                />
              }
              label={size.size}
              id={size.id}
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
      </Collapse>
      {/* Colors */}
      <ListItemButton onClick={() => handleClick('colors')}>
        <ListItemText
          primary='Colores'
          sx={{ color: open.colors ? 'white' : '#42e268' }}
        />
        {open.colors ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.colors} timeout='auto' unmountOnExit>
        <FormGroup>
          {colors.map((color, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={checkedFilters['color']?.includes(color.id) || false}
                  onChange={() => handleCheckboxChange('color', color.id)}
                />
              }
              label={color.color}
              id={color.id}
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
      </Collapse>
      {/* Materiales */}
      <ListItemButton onClick={() => handleClick('materials')}>
        <ListItemText
          primary='Materiales'
          sx={{ color: open.materials ? 'white' : '#42e268' }}
        />
        {open.materials ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.materials} timeout='auto' unmountOnExit>
        <FormGroup>
          {materials.map((material, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  sx={{ marginLeft: 2, color: '#42e268' }}
                  checked={
                    checkedFilters['material']?.includes(material.id) || false
                  }
                  onChange={() => handleCheckboxChange('material', material.id)}
                />
              }
              label={material.material}
              id={material.id}
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
      </Collapse>
      {/* Rango */}
      <ListItemButton onClick={() => handleClick('range')}>
        <ListItemText
          primary='Rango de precio'
          sx={{ color: open.range ? 'white' : '#42e268' }}
        />
        {open.range ? (
          <ExpandLess sx={{ color: 'white' }} />
        ) : (
          <ExpandMore sx={{ color: '#42e268' }} />
        )}
      </ListItemButton>
      <Collapse in={open.range} timeout='auto' unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <TextField
            id='min'
            label='Min'
            value={range.min}
            onChange={handleTextFieldChange}
            type='number'
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ width: 100, border: '1px solid #42e268', borderRadius: 1 }}
          />
          <TextField
            id='max'
            label='Max'
            value={range.max}
            onChange={handleTextFieldChange}
            type='number'
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{ width: 100, border: '1px solid #42e268', borderRadius: 1 }}
          />
        </Box>
        <AirbnbSlider
          slots={{ thumb: AirbnbThumbComponent }}
          getAriaLabel={index => (index === 0 ? 0 : 100000)}
          value={[range.min, range.max]}
          onChange={handleRangeChange}
          max={maxValue}
        />
      </Collapse>
    </List>
  )
}
