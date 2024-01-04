import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import styles from './ShoppingCart.module.css'
import {  createPurchaseTicket, setShoppingCart } from '../../redux/actions';


const ShoppingCart = () => {

  const shoppingCart = useSelector((state) => state.shoppingCart);
  console.log('Carrito de LLEGADA',shoppingCart)
  const initialCartState = shoppingCart.map(product => ({
    ...product,
    quantity: product.quantity || 1,
  }));
const consolidatedCart = initialCartState.reduce((accumulator, product) => {

  const existingProduct = accumulator.find(item => item.id === product.id);//accumulator Corre los productos del carrito y compara con el ID de cada producto

  if (existingProduct) {//existingProduct devuelve el primer objeto que cumplio la condicion
    existingProduct.quantity += product.quantity; // Suma 'quantity' si el ID ya existe
  } else {
    // No borrar lo que tenía el objeto
    accumulator.push({ ...product });
  }

  return accumulator;
}, []);

// Establecer el estado del carrito consolidado
const [cart, setCart] = useState(//!consolidatedCart
[
  {
    id: "1",
    description: "Descripción del producto 1",
    name: "Zapto 1",
    quantity: 1,
    price: 10
  },
  {
    id: "2",
    description: "Descripción del producto 2",
    name: "Zapto 2",
    quantity: 1,
    price: 12
  }
]
  );
  
  const dispatch = useDispatch()

  const buyProducts = async (products) => {
    try {
      //! Apenas se hace la solicitud de compra cambiar el status de PurchaseTicket a Pending
      //! Crear PursacheTicket
      dispatch(createPurchaseTicket('Acá iria la creacion del TICKET'))
      //{
      //   "idOrder": "123456",//La crea el Backend
      //   "products": [],//Los paso del carrito
      //   "totalAmount": 0,// lo paso de ABAJO totalPurchase
      //   "idUser": "789",//Lo traigo de Redux
      //   "email": "cliente@email.com",//Lo traigo de Redux
      //   "status": pending//Lo pongo en pending
      // }
      
      console.log(products);
      const response = await axios.post(
        "http://localhost:3001/MercadoPago",//!usar : API_URL
        products
      );

      // Realiza la redirección al enlace de pago
      window.location.href = response.data;
    } catch (error) {
      console.error("Error al procesar el pago:", error.message);
      // Puedes manejar el error según tus necesidades
    }
  }

  const renderProducts = () => {
    return cart.map((product) => (
      <div key={product.id} className={styles['tarjeta-producto']}>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
        />
        <h3>{product.name}</h3>
        <p>Stock: {product.stock}</p>
        <p>{product.quantity}</p>
        <button onClick={() => reduceQuantity(product.id)}>[-]</button>
        <button onClick={() => addQuantity(product)}>[+]</button>
        <p>Precio: ${product.price}</p>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
      </div>
    ))
  }

  const renderPaymentCard = () => {
    const totalPurchase = cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    )
    return (
      <div className={styles['tarjeta-pago']}>
        <h1>Resumen de Compra:</h1>
        <h3>Total:</h3>
        <p>${totalPurchase.toFixed(2)}</p>
        <button
          onClick={() => buyProducts(cart)}
          disabled={cart.length === 0}
        >
          Comprar
        </button>
      </div>
    )
  }

  const addQuantity = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id)
    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        const newCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
        setCart(newCart)
      } else {
        alert('No hay suficiente stock disponible')
      }
    } else {
      const productWithQuantity = { ...product, quantity: 1 }
      setCart([...cart, productWithQuantity])
    }
  }

  const reduceQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )

    const updatedCart = newCart.filter(
      (item) => item.quantity > 0
    )
    setCart(updatedCart)
  }

  const deleteProduct = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
  }

  useEffect(() => {
    
    dispatch(setShoppingCart(cart));
    console.log('Carrito actualizado:', cart)
  }, [dispatch, cart])

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className={styles['pago-container']}>{renderPaymentCard()}</div>
      <div className={styles['contenedor-productos']}>{renderProducts()}</div>
    </div>
  )
}

export default ShoppingCart
