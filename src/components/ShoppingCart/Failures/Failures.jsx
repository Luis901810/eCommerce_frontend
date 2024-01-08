
import { useEffect, useState } from 'react';
import { setShoppingCart, updatePurchaseTicket } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ID_REJECTED = "ce1f4d24-88ac-4fce-a210-31f64ab45117";

const Failures = () => {
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    //Cargar al carrito lo que tengo en localStorage
    //! Recuperar la cadena JSON del localStorage
    const jsonString = localStorage.getItem('PurchaseTicket');
    // Convertir la cadena JSON a un objeto JavaScript
    const PurchaseTicket = JSON.parse(jsonString);
    
    // Ahora puedes acceder a las propiedades del objeto
    console.log('Informacion Completa de la Orden:', PurchaseTicket);
    console.log('Valor en localStorage del ID ORDER:', PurchaseTicket.idOrder);
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO RECHAZADA
    updatePurchaseTicket(PurchaseTicket.idOrder, ID_REJECTED)//!(idOrder, idStatusTicket) //Traer el IDORDER Storage
    //! Y AL USUARIO  ************NOTIFICARLE EL FALLO***********
    const details = {
      totalAmount: PurchaseTicket.totalAmount,
      items: PurchaseTicket.lines.map(line => ({
        shoeId: line.shoeId,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
      })),
    };
    setPurchaseDetails(details);


    alert("ACTUALIZA LA ORDEN EN EL BACK A STATUS RECHAZADO");
      //! Cargar Carrito
  const jsonShopingCart = localStorage.getItem('shoppingCart');
  const shoppingCart = JSON.parse(jsonShopingCart);
  console.log('Carrito',shoppingCart)
  dispatch(setShoppingCart(shoppingCart));

  }, [ID_REJECTED]);


  const Shoes = useSelector(state => state.Shoes)
  const getNameShoeById = (shoeId) =>{
    const foundShoe = Shoes.find(shoe => shoe.id === shoeId);

    if (foundShoe) {
      const { name, image } = foundShoe;
      return { name, image };
    } else {
      // Si no se encuentra el zapato con el ID dado, puedes devolver un objeto con valores predeterminados o manejarlo según tus necesidades.
      return { name: 'Shoe Not Found', image: 'default-image-url' };
    }
  }
  return (
    <div>
      <h1>Failures</h1>
      <h1>Failures</h1>{/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}

      <h1>Compra Rechazada</h1>
      {purchaseDetails && (
        <div>
          <p>Total Amount: ${purchaseDetails.totalAmount}</p>
          <h2>No se lograron Comprar los siguientes artículos:</h2>
          <ul>
            {purchaseDetails.items.map((item, index) => (
              <li key={index}>
                {/* //!Buscar el nombre en el back*/}
                <img src={getNameShoeById(item.shoeId).image} alt={getNameShoeById(item.shoeId).name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <p>Shoe : {getNameShoeById(item.shoeId).name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: ${item.unitPrice}</p>
              </li>
            ))}
          </ul>
          <button onClick={()=>{navigate('/ShoppingCart')}}>Intentar de nuevo la compra</button>
        </div>
      )}
    </div>
  );
};

export default Failures;
