import { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { ThemeProvider, Box, Typography } from '@mui/material'
import Loading from '../../components/Loading/loading'
import ShoeList from './ShoeList'
import theme from '../../theme'
import { filter } from '../../redux/actions'
import Filters from './Filters'
import Pager from './Pager'
import { NUM_SHOES_PER_PAGE } from '../../utils/constants'


function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const page = useSelector(state => state.page)

  const dispatch = useDispatch()
  const shoes = useSelector(state => state.filteredShoes)
  const shoePage = shoes.slice((page-1)*NUM_SHOES_PER_PAGE,page*NUM_SHOES_PER_PAGE)

  useEffect(() => {
      setProducts(shoePage)
      setLoading(false)
      console.log(page)
  }, [shoes,page])

  useEffect(() => {
    const fetchData = async () => {
      if (!shoes.length) {
        setLoading(true)
        await dispatch(filter({})) // Asegúrate de que `dispatch` devuelva una promesa
        setLoading(false)
      }
    }

    fetchData()
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
          <Box>
            <Pager numShoes={shoes.length}/>
          </Box>
        </>
      )}
    </ThemeProvider>
  )
}

export default Catalogue
