import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import InputBase from '@mui/material/InputBase'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../../redux/actions'

export default function Search () {
  const dispatch = useDispatch()
  const [shoeName, setShoeName] = useState("")

  const handleChange = (event) => {
    setShoeName(event.target.value)
  }

  const onSearch = () => {
    try {
      dispatch(filter({name:shoeName}))
      localStorage.setItem("filters", JSON.stringify({}))
    } catch (error) {
      console.error('Error searching the shoe', error)
    }
  }
  return (
    <Box
      sx={{
        height: '35px',
        border: '2px solid #42e268',
        borderRadius: 2,
        paddingLeft: 2,
        paddingRight: 2
      }}
    >
      <InputBase placeholder="Buscar producto" onChange={handleChange} sx={{ color: 'white' }} >
      </InputBase>
      <SearchOutlinedIcon onClick={onSearch}/>
    </Box>
  )
}
