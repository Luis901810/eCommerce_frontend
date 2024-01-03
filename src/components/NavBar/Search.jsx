import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InputBase from '@mui/material/InputBase'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import Results from './Results'
import { useDispatch } from 'react-redux'
import { filter } from '../../redux/actions'

export default function Search() {
  const [shoeName, setShoeName] = useState('')

  const handleChange = event => {
    setShoeName(event.target.value)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter())
  }, [])

  return (
    <Box
      sx={{
        height: '35px',
        width: '300px',
        border: '2px solid #42e268',
        borderRadius: 2,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: '#303030',
      }}
    >
      <InputBase
        placeholder='Buscar producto'
        onChange={handleChange}
        sx={{ color: 'white' }}
      ></InputBase>
      <Box sx={{position: 'absolute', top: '18px'}} >
      <SearchOutlinedIcon/>
      </Box>
      <Results shoeName={shoeName} setShoeName={setShoeName} />
    </Box>
  )
}
