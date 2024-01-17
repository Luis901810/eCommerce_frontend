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
import { showErrorAlert } from '../../alerts/alerts';

const ID_PENDING = "418af69a-eae8-4203-9398-daba9c90f8f6";

const ShoppingCart = () => {

  const dispatch = useDispatch()

  let shoppingCart = useSelector(state => state.shoppingCart)
  const {id} = useSelector(state => state.User);
  const {user} = useAuth();
  console.log("user",user);
  console.log("ID------USER",id);

  

  console.log('Carrito de LLEGADA', shoppingCart)
  
  if (shoppingCart.length === 0 ){
    console.log("Vacioooooooooooooooooooooooooooooooooooo")
    const jsonString = localStorage.getItem('shoppingCart');// ! Recuperar la cadena JSON del localStorage
    const LocalStorageShoppingCart = JSON.parse(jsonString);
    console.log("El Carrito del local Storage **************************" , LocalStorageShoppingCart)
    shoppingCart = LocalStorageShoppingCart //Quiero pushear lo que hay en este array
  } 
  
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
      const insufficientStockProduct = cart.find(product => product.quantity > product.stock);
      if (insufficientStockProduct) {
        showErrorAlert("Stock insuficiente, ajustar las unidades");
        return;
      }

      const lines = productsToLines(cart);
      console.log('lines----------------', lines);
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
        color='secondary'
        variant='contained'
        size='large'
        onClick={clearCart}
        disabled={cart.length === 0}
      >
        Vaciar Carrito
      </Button>
        <Button
          variant='contained'
          size='large'
          sx={{
            backgroundColor: '#42e268',
            '&:hover': {
              backgroundColor: '#00ff3d',
            },
          }}
          onClick={() =>  user=== null ?  showErrorAlert("Por favor Inicie Sesion") : buyProducts(cart)}
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
              src={product.image}
              alt={product.name}
              style={{ maxWidth: 300, height: 'auto', borderRadius: '5px' }}
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

  const clearCart = () => {
    setCart([]); // Vaciar el carrito
    localStorage.setItem('shoppingCart', JSON.stringify([]));//! Vaciar localStorage
  }
  
  return (
    <div>
      <h1>Shopping Cart</h1>

      <div className={styles['contenedor-productos']}>{renderProducts()}</div>
      <div className={styles['pago-container']}>{renderPaymentCard()}</div>
    </div>
  )
}

export default ShoppingCart
