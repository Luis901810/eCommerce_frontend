import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setShoppingCart } from "../../redux/actions";//!Crear el setShopping cart, 
//!Preguntar como se van a llevar los productos al ShoppingCart
//import axios from "axios";
//import { Link } from "react-router-dom";
import styles from "./ShoppingCart.module.css"; 

const ShoppingCart = () => {
//   const shoppingCart = useSelector((state) => state.shoppingCart);
const shoppingCart = [
    {
      id: 1,
      name: 'Shoe 1',
      price: 50,
      quantity: 1,
      stock: 10,
      image: 'https://falabella.scene7.com/is/image/FalabellaCO/882888180_0?wid=1500&hei=1500&qlt=70',
    },
    {
      id: 2,
      name: 'Shoe 2',
      price: 60,
      quantity: 1,
      stock: 15,
      image: 'https://falabella.scene7.com/is/image/FalabellaCO/882888180_0?wid=1500&hei=1500&qlt=70',
    },
    {
      id: 3,
      name: 'Shoe 3',
      price: 70,
      quantity: 1,
      stock: 20,
      image: 'https://falabella.scene7.com/is/image/FalabellaCO/882888180_0?wid=1500&hei=1500&qlt=70',
    },
    {
      id: 4,
      name: 'Shoe 4',
      price: 80,
      quantity: 1,
      stock: 12,
      image: 'https://falabella.scene7.com/is/image/FalabellaCO/882888180_0?wid=1500&hei=1500&qlt=70',
    },
    {
      id: 5,
      name: 'Shoe 5',
      price: 90,
      quantity: 1,
      stock: 18,
      image: 'https://falabella.scene7.com/is/image/FalabellaCO/882888180_0?wid=1500&hei=1500&qlt=70',
    },
  ];
  
  const dispatch = useDispatch();

  const [cart, setCart] = useState([...shoppingCart]);
//   const setShoppingCart = (products) =>{
//     console.log(products);
//   }

  const buyGames = async (products) => {
    console.log('Simular Que compra los productos');
    alert('Simular Que compra los productos, dado que no se ha hecho la conexion con el BACK')
    //!Cuando haga el backend
    // try {
    //   console.log(products);
    //   const response = await axios.post(
    //     "http://localhost:3001/MercadoPago",
    //     products
    //   );

    //   // Realiza la redirección al enlace de pago
    //   window.location.href = response.data;
    // } catch (error) {
    //   console.error("Error al procesar el pago:", error.message);
    //   // Puedes manejar el error según tus necesidades
    // }
  };

  const renderProducts = () => {
    return cart.map((product) => (
      <div key={product.id} className={styles["tarjeta-producto"]}>
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }}
        />
        <h3>{product.name}</h3>
        <p>Stock: {product.stock}</p>
        <p>{product.quantity}</p>
        <button onClick={() => reduceQuantity(product.id)}>[-]</button>
        <button onClick={() => addQuantity(product)}>[+]</button>
        <p>Precio: ${product.price}</p>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
      </div>
    ));
  };

  const renderPaymentCard = () => {
    const totalPurchase = cart.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
    return (
      <div className={styles["tarjeta-pago"]}>
        <h1>Resumen de Compra:</h1>
        <h3>Total:</h3>
        <p>${totalPurchase.toFixed(2)}</p>
        <button
          onClick={() => buyGames(cart)}
          disabled={cart.length === 0}
        >
          Comprar
        </button>
      </div>
    );
  };

  const addQuantity = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        const newCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(newCart);
      } else {
        alert("No hay suficiente stock disponible");
      }
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      setCart([...cart, productWithQuantity]);
    }
  };

  const reduceQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    const updatedCart = newCart.filter(
      (item) => item.quantity > 0
    );
    setCart(updatedCart);
  };

  const deleteProduct = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  useEffect(() => {
    //dispatch(setShoppingCart(cart));
    console.log("Carrito actualizado:", cart);
  }, [dispatch, cart]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className={styles["pago-container"]}>{renderPaymentCard()}</div>
      <div className={styles["contenedor-productos"]}>
        {renderProducts()}
      </div>
    </div>
  );
};

export default ShoppingCart;
