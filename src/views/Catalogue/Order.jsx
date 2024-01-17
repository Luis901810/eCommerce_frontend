import { Box } from '@mui/system'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
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
    icon: <VerticalAlignBottomIcon sx={{ color: 'white' }} />,
    type: 'dec',
  })

  const dispatch = useDispatch()

  const handleChange = e => {
    setOrderType(e.target.value)
  }

  const handleButtonClick = () => {
    switch (direction.type) {
      case 'dec':
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
      default:
        setDirection({
          icon: <VerticalAlignCenterIcon sx={{ color: 'white' }} />,
          type: 'dec',
        })
        break
    }
  }

  useEffect(() => {
    dispatch(order(orderType, direction.type))
  }, [orderType, direction])

  return (
    <Box
      sx={{
        height: '40px',
        justifyContent: 'center',
      }}
    >
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        {orderType !== 'none' ? (
          <Button
            variant='filled'
            sx={{
              color: 'white',
              backgroundColor: '#303030',
              border: '1px solid #42e628',
            }}
            onClick={handleButtonClick}
          >
            <SortIcon sx={{ color: 'white' }} />
            {direction.icon}
          </Button>
        ) : null}
        <Select
          id='order'
          value={orderType}
          label='Orden'
          sx={{
            color: 'white',
            backgroundColor: '#303030',
            border: '1px solid #42e628',
            width: 1 / 3,
            marginLeft: 3,
          }}
          onChange={handleChange}
        >
          <MenuItem value='none'>Ningun orden</MenuItem>
          <MenuItem value='price'>Precio</MenuItem>
          <MenuItem value='size'>Talla </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
