import { useEffect, useState } from 'react';
import { updatePurchaseTicket } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const ID_APPROVED ="4567ffd5-8879-4455-9b06-b1cd23d3d0be"

const Successes = () => {
  const dispatch = useDispatch()
  // const PurchaseTicket = useSelector(state => state.PurchaseTicket)
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  useEffect(() => {
    //! Apenas se aprueba la compra cambiar el status de PurchaseTicket a **Approved** ID ="4567ffd5-8879-4455-9b06-b1cd23d3d0be"
    //! Para crear el Status en http://localhost:3001/order-status
    // {
    //   "status": "Approved",
    //   "description": "La compra ha sido aprobada con éxito. ¡Gracias por su transacción!"
    // }
    //! VACIAR CARRITO
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA Y NOTIFICAR
            //! Recuperar la cadena JSON del localStorage
            const jsonString = localStorage.getItem('PurchaseTicket');

            // Convertir la cadena JSON a un objeto JavaScript
            const PurchaseTicket = JSON.parse(jsonString);
    
            // Ahora puedes acceder a las propiedades del objeto
            console.log('Orden Completa:', PurchaseTicket);
            console.log('Valor en localStorage del ID ORDER:', PurchaseTicket.idOrder);
            //!Traigo purchaseTicket del REDUX
            // console.log('Purchase del REDUX:', PurchaseTicket);
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA 
    updatePurchaseTicket(PurchaseTicket.idOrder, ID_APPROVED)//!(idOrder, idStatusTicket) //Traer el IDORDER Storage
    //! Y AL USUARIO  ************NOTIFICARLE SU COMPRA***********
    const details = {
      totalAmount: PurchaseTicket.totalAmount,
      items: PurchaseTicket.lines.map(line => ({
        shoeId: line.shoeId,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
      })),
    };
    setPurchaseDetails(details);

    

    alert("ACTUALIZA LA ORDEN EN EL BACK A STATUS APROBADO");
  }, [ID_APPROVED]);
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
      <h1>Successes</h1>
      <h1>Successes</h1>{/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}

      <h1>Compra Aprobada</h1>
      {purchaseDetails && (
        <div>
          <p>Total Amount: ${purchaseDetails.totalAmount}</p>
          <h2>Detalles de los Artículos Comprados:</h2>
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
        </div>
      )}
    </div>
  );
};

export default Successes;
