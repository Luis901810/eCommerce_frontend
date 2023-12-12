import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
    <div>
      <img src ={require('./Logo Temporal.jpg')} alt='Logo Temporal' style={{ width: '25px', height: '25px', borderRadius: 15}}  />
      <h3>SearchBar</h3>
      <Link to="/Catalogue"> <button>| Catalogo |</button> </Link>
      <Link to="/ShoppingCart"> <button>| Carrito |</button> </Link>

      {/* //! Al dar click en el siguiente botón, 
      * si es usuario: poder modificar el usuario 
      * si es Admin: ingrsar a la dash board */}

      <button>| Rol: Cliente / Admind |</button>
      {/* //! Nombre del usuario */}
       <button>| Nombre de Usuario |</button> 
      <Link to="/Login"> <button>| Login |</button> </Link>

    </div>
  );
};
export default NavBar;
