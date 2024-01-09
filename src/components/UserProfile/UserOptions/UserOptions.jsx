import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { getUserByEmail } from '../../../redux/actions';

const UserOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useAuth();
  if(user && user.email) dispatch(getUserByEmail(user.email));

  return (
    <div>
      <h2>Opciones de Usuario</h2>
      <div>
        <button onClick={() => navigate(`/UserProfile/${user.email}`)}>Perfil de Usuario</button>
      </div>
      <div>
        <button onClick={() => navigate(`/EditProfile/${user.email}`)}>Editar Perfil</button>
      </div>
      <div>
        <button onClick={() => navigate(`/PurchaseHistory/${user.email}`)}>
          Historial de Compras
        </button>
      </div>
      <div>
        <button onClick={() => navigate(`/Reviews/${user.email}`)}>Reseñas</button>
      </div>

    </div>
  );
};

export default UserOptions;
