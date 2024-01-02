import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, Box, Typography } from '@mui/material'
import Loading from '../../components/Loading/loading'
import ShoeList from './ShoeList'
import theme from '../../theme'
import { filter } from '../../redux/actions'
import Filters from './Filters'

function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const shoes = useSelector(state => state.filteredShoes)

  useEffect(() => {
      setProducts(shoes)
      setLoading(false)
  }, [shoes])

  useEffect(() => {
    if (!shoes.length) {
      setLoading(true)
      dispatch(filter({}))
    }
    console.log(shoes)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              padding: 2,
            }}
          >
            <Box>
              <Filters />
            </Box>
            <ShoeList products={products} />
            {shoes.length === 0 && !loading ? <Typography variant="h1" color="white">Productos no encontrados</Typography> : null}
          </Box>
        </>
      )}
    </ThemeProvider>
  )
}

export default Catalogue
