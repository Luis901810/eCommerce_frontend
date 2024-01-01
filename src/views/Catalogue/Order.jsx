import { Box } from '@mui/system'
import Select from '@mui/material/Select'
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

export default function Order() {
  const [orderType, setOrderType] = useState('none')

  const handleChange = e => {
    setOrderType(e.target.value)
  }

  return (
    <Box
      sx={{
        height: '40px',
        width: '200px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <FormControl fullWidth>
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
      </FormControl>
    </Box>
  )
}
