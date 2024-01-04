import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Successes = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Obtén los valores directamente de searchParams
  const collectionStatus = searchParams.get('collection_status');
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const merchantOrderId = searchParams.get('merchant_order_id');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    //! Apenas se aprueba la compra cambiar el status de PurchaseTicket a Approved
    //! VACIAR CARRITO
    //! Y AL USUARIO REGISTRARLE SU COMPRA COMO APROBADA Y NOTIFICAR
    alert("SIMULA QUE ACTUALIZA LA ORDEN EN EL BACK A STATUS APROBADO");
    // Aquí puedes realizar cualquier lógica adicional si es necesario
    console.log('Datos de la consulta en Successes:', {
      collectionStatus,
      paymentId,
      status,
      merchantOrderId,
      preferenceId,
    });
  }, [collectionStatus, merchantOrderId, paymentId, preferenceId, status]);

  return (
    <div>
      <h1>Successes</h1>
      <h1>Successes</h1>{/* //! Se pone esto porque la barra de navegacion no deja ver debajo */}
      <h1>ACÁ SE VA A MOSTRAR INFORMACION DE LA COMPRA APROBADA</h1>
      <p>
        <span>collectionStatus: </span>
        {collectionStatus} <br />
        <span>paymentId: </span>
        {paymentId} <br />
        <span>status: </span>
        {status} <br />
        <span>merchantOrderId: </span>
        {merchantOrderId} <br />
        <span>preferenceId: </span>
        {preferenceId}
      </p>
    </div>
  );
};

export default Successes;
