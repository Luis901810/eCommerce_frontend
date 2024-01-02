import { Box } from '@mui/system'
import Select from '@mui/material/Select'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import SortIcon from '@mui/icons-material/Sort'
import Button from '@mui/material/Button'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter'
import { order } from '../../redux/actions'
import { useDispatch } from 'react-redux'

export default function Order() {
  const [orderType, setOrderType] = useState('none')

  const [direction, setDirection] = useState({
    icon: <VerticalAlignCenterIcon sx={{ color: 'white' }} />,
    type: 'default',
  })

  const dispatch = useDispatch()

  const handleChange = e => {
    setOrderType(e.target.value)
  }

  const handleButtonClick = () => {
    switch (direction.type) {
      case 'default':
        setDirection({
          icon: <VerticalAlignTopIcon sx={{ color: 'white' }} />,
          type: 'asc',
        })
        break
      case 'asc':
        setDirection({
          icon: <VerticalAlignBottomIcon sx={{ color: 'white' }} />,
          type: 'dec',
        })
        break
      case 'dec':
        setDirection({
          icon: <VerticalAlignCenterIcon sx={{ color: 'white' }} />,
          type: 'default',
        })
        break
      default:
        setDirection({
          icon: <VerticalAlignCenterIcon sx={{ color: 'white' }} />,
          type: 'default',
        })
        break
    }
  }

  const handleOrder = () => {
    dispatch(order(orderType, direction.type))
  }

  return (
    <Box
      sx={{
        height: '40px',
        justifyContent: 'center'
      }}
    >
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 3/4
        }}
      >
        <InputLabel id='labelInput' sx={{ color: 'white' }}>
          Orden
        </InputLabel>
        <Select
          labelId='labelInput'
          id='order'
          value={orderType}
          label='Orden'
          sx={{ color: 'white', border: '1px solid white' }}
          onChange={handleChange}
        >
          <MenuItem value='none'>Ninguno</MenuItem>
          <MenuItem value='price'>Precio</MenuItem>
          <MenuItem value='size'>Talla</MenuItem>
        </Select>
        {orderType !== 'none' ? (
          <Button variant='outlined' onClick={handleButtonClick}>
            <SortIcon sx={{ color: 'white' }} />
            {direction.icon}
          </Button>
        ) : null}
        <Button variant="outlined" onClick={() => handleOrder()} >
          Aplicar
        </Button>
      </FormControl>
    </Box>
  )
}
