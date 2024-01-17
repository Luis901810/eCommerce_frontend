import CardShoe from '../../components/Card/Card'
import { Box, Grid } from '@mui/material'
import Order from './Order'
import { useSelector } from 'react-redux'


function ShoeList ({ products }) {

    const shoppingCart = useSelector(({shoppingCart}) => shoppingCart)
    console.log('Carrito: ', shoppingCart);

  return (
        <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
            <Box sx={{ width: '90%' }}>
                <Order/>
                <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 4}} >
                    {products.map((product, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4} lg={2} xl={2} ml={1} mt={1} >
                            <CardShoe product={product}/>
                        </Grid>
                    )

                    )}
                </Box>
            </Box>

        </Box>
  )
}

export default ShoeList
