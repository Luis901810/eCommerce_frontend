
import { useEffect, useState } from 'react';
import { setShoppingCart, updatePurchaseTicket } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorAlert } from '../../../alerts/alerts';
import { Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, Container, Box } from '@mui/material';

const ID_REJECTED = "8e7651c2-88b7-47d9-96fe-f2b575fcf0ab";

const Failures = () => {
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleUnload = () => {
    localStorage.setItem('PurchaseTicket', JSON.stringify(null));
    console.log('Limpieza de PurchaseTicket del LocalStorage');
  };

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


    showErrorAlert("ORDEN RECHAZADA")
      //! Cargar Carrito
  const jsonShopingCart = localStorage.getItem('shoppingCart');
  const shoppingCart = JSON.parse(jsonShopingCart);
  console.log('Carrito',shoppingCart)
  dispatch(setShoppingCart(shoppingCart));

  window.addEventListener('beforeunload', handleUnload)
  return () => {
    //! Borrar el Ticket del Local Storage
    window.removeEventListener('beforeunload', handleUnload);
  };
  
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
    <Container maxWidth="md" style={{ textAlign: 'center', color: 'white' }}>
      <h1>s</h1>

    <Typography variant="h4" gutterBottom>
      Compra Rechazada
    </Typography>
    {purchaseDetails && (
      <div>
        <Typography variant="body1" paragraph>
          Total Amount: ${purchaseDetails.totalAmount}
        </Typography>
        <Typography variant="h6" paragraph>
          No se lograron Comprar los siguientes artículos:
        </Typography>
        <Box>
        <List>
          {purchaseDetails.items.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={getNameShoeById(item.shoeId).image} alt={getNameShoeById(item.shoeId).name} />
              </ListItemAvatar>
              <ListItemText
                primary={<span style={{ color: 'white' }}>{`Shoe: ${getNameShoeById(item.shoeId).name}`}</span>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" style={{ color: 'white' }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" style={{ color: 'white' }}>
                      Unit Price: ${item.unitPrice}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        </Box>
        <Button variant="contained" onClick={() => navigate('/ShoppingCart')}>
          Intentar de nuevo la compra
        </Button>
      </div>
    )}
  </Container>
  );
};

export default Failures;
