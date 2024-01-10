import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import styles from './ShoppingCart.module.css'
import { createPurchaseTicket, getUserByEmail, setShoppingCart } from '../../redux/actions'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
} from '@mui/material'
import { API_URL } from '../../redux/actions-type';
import { useAuth } from '../../contexts/AuthContext';

const ID_PENDING = "39224070-2789-46cc-ad1e-afae9d183981";

const ShoppingCart = () => {

  const dispatch = useDispatch()

  const shoppingCart = useSelector(state => state.shoppingCart)
  const {id} = useSelector(state => state.User);
  const {user} = useAuth();
  console.log("user",user);
  console.log("ID------USER",id);

  

  console.log('Carrito de LLEGADA', shoppingCart)

  const initialCartState = shoppingCart.map(product => ({//!Asigna quantity a los productos
    ...product,
    quantity: product.quantity || 1,
  }))

  const consolidatedCart = initialCartState.reduce((accumulator, product) => {//! Agrupa productos del mismo Id
    const existingProduct = accumulator.find(item => item.id === product.id) //accumulator Corre los productos del carrito y compara con el ID de cada producto

    if (existingProduct) {
      //existingProduct devuelve el primer objeto que cumplio la condicion
      existingProduct.quantity += product.quantity // Suma 'quantity' si el ID ya existe
    } else {
      // No borrar lo que tenía el objeto
      accumulator.push({ ...product })
    }
    return accumulator
  }, [])

  const [cart, setCart] = useState(consolidatedCart); //! Establecer el estado del carrito consolidado
  
  const productsToLines = (productos) =>  {//! Productos configurados para la petición de Orden al Back
    return productos.map(producto => ({
      quantity: producto.quantity,
      unitPrice: producto.price,
      discount: 0,
      shoeId: producto.id
    }));
  }

  const totalPurchase = (cart) => {//! Calcula el total Para el Front y el back
    return cart.reduce(
      (total, product) => total + product.quantity * product.price, 
      0
    );
  };

  console.log('Productos para LINES',productsToLines(cart))

  const buyProducts = async (products) => {
    try {
      //! Artículos Configurados para el Back =>

      const lines = productsToLines(cart);
      //!Datos del Cliente y Compra para el Back=>
      const PurchaseTicket = {
        totalAmount: totalPurchase(cart),
        statusId: ID_PENDING,
        userId: id,//!Traerlo de DEL redux *****************userId*****************
        lines: lines
      };
      console.log('Ticket de Compra',PurchaseTicket)

      //! Crear PurchaseTicket en Back y Cargarlo a Redux =>

      await dispatch(createPurchaseTicket(PurchaseTicket,cart))//!!! HAY OCACIONES EN LAS QUE NO ACTUALIZA EL PURCHASE

      // //! Realizar peticion a mercado pago
      console.log(products);

      const response = await axios.post(
        `${API_URL}/MercadoPago`,//!usar : 
        products
      );
        // Realiza la redirección al enlace de pago
        window.location.href = response.data;
    } catch (error) {
      console.error("Error al procesar el pago:", error.message);
    }
  }

  const setQuantity = (id, newQuantity) => {
    console.log(`id: ${id} nueva cantidad: ${newQuantity}`)
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    console.log('carrito nuevo: ', updatedCart)
    setCart(updatedCart)
  }

  const textStyle = {
    color: 'white',
    marginTop: 3,
  }

  const renderPaymentCard = () => {
  const TotalPurchase = totalPurchase(cart)
    return (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}} >
        <Typography style={textStyle} variant='h3'>
          Total: ${TotalPurchase.toFixed(2)}
        </Typography>
        <Button
          variant='contained'
          size='large'
          sx={{
            backgroundColor: '#42e268',
            '&:hover': {
              backgroundColor: '#00ff3d',
            },
          }}
          onClick={() =>  user=== null ? alert("Por favor Inicie Sesion") : buyProducts(cart)}
          disabled={cart.length === 0 }
        >
          Comprar
        </Button>
      </Box>
    )
  }

  const renderProducts = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: cart.length === 1 ? 'center' : 'space-evenly',
        }}
      >
        {cart.map(product => (
          <Box
            key={product.id}  // <-- Aquí agregamos la clave
            sx={{
              display: 'flex',
              backgroundColor: '#414141',
              border: '2px solid #42e268',
              padding: 5,
              borderRadius: 3,
              alignItems: 'center',
            }}
          >
            <Box
              key={product.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: '500px',
                alignItems: 'center',
                marginTop: 3,
              }}
            >
              <Typography style={textStyle} variant='h5'>
                {product.name}
              </Typography>
              <Typography style={textStyle} variant='h6'>
                Stock: {product.stock}
              </Typography>
              <FormControl
                sx={{ width: '100px', marginTop: 3, marginBottom: 3 }}
              >
                <InputLabel htmlFor='quantity' sx={{ color: '#fff' }}>
                  Unidades:
                </InputLabel>
                <Input
                  id='quantity'
                  name='quantity'
                  type='number'
                  sx={{ color: '#fff' }}
                  value={product.quantity}
                  onChange={e => {
                    let newQuantity = parseInt(e.target.value, 10)
                    if (newQuantity < 1) newQuantity = 1
                    if (newQuantity > product.stock) newQuantity = product.stock
                    setQuantity(product.id, newQuantity)
                  }}
                />
              </FormControl>
              <Typography style={textStyle} variant='h5'>
                Precio: ${product.price}
              </Typography>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#ff4646',
                  marginTop: 3,
                  '&:hover': {
                    backgroundColor: '#ff0000',
                  },
                }}
                onClick={() => deleteProduct(product.id)}
              >
                Borrar
              </Button>
            </Box>
            <img
              src={
                'data:image/png;base64,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'
              }
              alt={product.name}
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
            />
          </Box>
        ))}
      </Box>
    )
  }

  const deleteProduct = id => {
    const newCart = cart.filter(item => item.id !== id)
    setCart(newCart)
  }

  useEffect(() => {
    if(user && user.email) dispatch(getUserByEmail(user.email));
    
    dispatch(setShoppingCart(cart));
    console.log('Carrito actualizado:', cart)
  }, [cart])


  return (
    <div>
      <h1>Shopping Cart</h1>

      <div className={styles['contenedor-productos']}>{renderProducts()}</div>
      <div className={styles['pago-container']}>{renderPaymentCard()}</div>
    </div>
  )
}

export default ShoppingCart
