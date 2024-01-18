import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, MenuItem } from '@mui/material/'
import { useNavigate } from 'react-router-dom'
import { getShoeById } from '../../redux/actions'

export default function Results({ shoeName, setShoeName }) {
  const shoes = useSelector(state => state.Shoes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [results, setResults] = useState([])

  useEffect(() => {
    if (shoeName.length > 0) {
      const search = shoeName.toLowerCase(0)
      const found = shoes.filter(shoe => {
        let lowerCasedName = shoe.name.toLowerCase()
        if (lowerCasedName.includes(search)) {
          return shoe
        }
      })
      setResults(found)
    } else setResults([])
  }, [shoeName])

  const handleClick = id => {
    dispatch(getShoeById(id))
    navigate(`/Detail/${id}`)
    setShoeName('')
  }

  if (shoeName.length === 0 && results.length === 0) return <Box></Box>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        width: '350px',
        maxHeight: '200px',
        backgroundColor: '#303030',
      }}
    >
      {shoeName.length > 0 && results.length === 0 ? (
        <Typography variant='h6'>No hay resultados</Typography>
      ) : null}
      {results.length > 0
        ? results.map((shoe, i) => (
            <Box
              onClick={() => handleClick(shoe.id)}
              sx={{
                border: '1px solid #42e268',
                borderRadius: 1,
                maxWidth: '350px',
                cursor: 'zoom-in',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 2,
              }}
              key={i}
            >
              <img
                src={shoe.image}
                style={{ width: 50, height: 50, borderRadius: 100, marginLeft: 5 }}
              ></img>
              <Box sx={{display: 'flex', flexDirection: 'column', mr: 2, width: '100%'}} >
              <Typography color='#42e268'  variant='h6'>{shoe.name && shoe.name}</Typography>
              <Typography variant='h6'>${shoe.price && shoe.price}</Typography>
              </Box>
            </Box>
          ))
        : null}
    </Box>
  )
}
