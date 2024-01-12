import { useEffect, useState } from 'react'
import { updatePurchaseTicket } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Reviews from '../../Review/Review'
import { API_URL } from '../../../redux/actions-type'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from '../../../alerts/alerts'

const ID_APPROVED = '4567ffd5-8879-4455-9b06-b1cd23d3d0be' //! Descontar STOCK

const Successes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [purchaseDetails, setPurchaseDetails] = useState(null)
  const [purchaseTicket, setPurchaseTicket] = useState(null)

  const updateStockArray = async ({ shoeId, updatedStock }) => {
    try {
      const response = await axios.put(
        `${API_URL}/shoe/${shoeId}`,
        { stock: updatedStock }
        );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el stock del zapato ${shoeId}:`, error);
      throw error;
    }
  }

  const updateStock = async (purchaseTicket) => {
    try {
      const response = await axios.get(`${API_URL}/shoe`);
      const shoesArray = response.data;//Traer Shoes
      //! Filtra shoesArray para buscar su id y el stock
      const updatedStockArray = purchaseTicket.lines.map((line) => {
          const { shoeId, quantity } = line;

          const shoe = shoesArray.find((shoe) => shoe.id === shoeId);//! Busca los zapatos con los "shoeId"
          if (shoe) {
            const stock = shoe.stock - quantity;
            return { shoeId: shoe.id, updatedStock: stock};//! Objetico con los datos para el la Actualización
          }
          return null;//! Si no se encuentra ningún Zapato
      });
      const results = await Promise.all(updatedStockArray.map(updateStockArray));

      console.log('Resultados de la actualización de stock:', results);


  const filteredUpdatedStockArray = updatedStockArray.filter(Boolean);
  console.log(filteredUpdatedStockArray)
  return filteredUpdatedStockArray;
} catch (error) {
  console.error('Error al actualizar el stock:', error);
  throw error;
}
  };

  const handleUnload = () => {
    localStorage.setItem('PurchaseTicket', JSON.stringify(null));
    console.log('Limpieza de PurchaseTicket del LocalStorage');
  };

  useEffect(() => {
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA Y NOTIFICAR

    //! Recuperar la cadena JSON del localStorage
    const jsonString = localStorage.getItem('PurchaseTicket')
    const PurchaseTicket = JSON.parse(jsonString)
    if(PurchaseTicket===null) return navigate('/')
    
    setPurchaseTicket(PurchaseTicket)
    // Ahora puedes acceder a las propiedades del objeto
    console.log('Orden Completa del LocalHost:', PurchaseTicket)

    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA
    updatePurchaseTicket(PurchaseTicket.idOrder, ID_APPROVED) //!(idOrder, idStatusTicket) //Traer el IDORDER Storage

    //! Y AL USUARIO  ************NOTIFICARLE SU COMPRA***********

    const details = {
      totalAmount: PurchaseTicket.totalAmount,
      items: PurchaseTicket.lines.map(line => ({
        shoeId: line.shoeId,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
      })),
    }
    setPurchaseDetails(details)

    if(PurchaseTicket) updateStock(PurchaseTicket)
    showSuccessAlert("ORDEN APROBADA :D")


    window.addEventListener('beforeunload', handleUnload);
    return () => {
      //! Borrar el Ticket del Local Storage
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [ID_APPROVED])


  const Shoes = useSelector(state => state.Shoes)
  const getNameShoeById = shoeId => {
    const foundShoe = Shoes.find(shoe => shoe.id === shoeId)

    if (foundShoe) {
      const { name, image } = foundShoe
      return { name, image }
    } else {
      // Si no se encuentra el zapato con el ID dado, puedes devolver un objeto con valores predeterminados o manejarlo según tus necesidades.
      return { name: 'Shoe Not Found', image: 'default-image-url' }
    }
  }
  return (
    <div>
      <h1>Successes</h1>
      <h1>Successes</h1>
      {/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}

      <h1>Compra Aprobada</h1>
      {purchaseDetails && (
        <div>
          <p>Total Amount: ${purchaseDetails.totalAmount}</p>
          <h2>Detalles de los Artículos Comprados:</h2>
          <ul>
            {purchaseDetails.items.map((item, index) => {
              const shoe = getNameShoeById(item.shoeId)
              return (
                <li key={index}>
                  {/* //!Buscar el nombre en el back*/}
                  <img
                    src={getNameShoeById(item.shoeId).image}
                    alt={getNameShoeById(item.shoeId).name}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                  />
                  <p>Shoe : {getNameShoeById(item.shoeId).name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Unit Price: ${item.unitPrice}</p>
                  <Reviews product={shoe} idOrder={purchaseTicket && purchaseTicket.idOrder} userId={purchaseTicket && purchaseTicket.userId} />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Successes
