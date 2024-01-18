import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../redux/actions';
import { Typography, Button, Input, Box } from '@mui/material';
import PhotoUpload from '../../../PhotoUpload/PhotoUpload';
import UserOptions from '../UserOptions';

const EditProfile = () => {
  const dispatch = useDispatch();
  const idUser = useSelector((state) => state.User.id);
  const [image, setImage] = useState(null);
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    profilePicture: '',
    createdAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserProfile = async (idUser) => {
      try {
        const userInfo = await updateUser(idUser, {});
        setUsuario(userInfo);
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error);
      }
    };
    if (idUser) loadUserProfile(idUser);
  }, [idUser]);

  const handleEditarPerfil = () => {
    setIsEditing(true);
  };

  const handleGuardarCambios = () => {
    console.log('Nuevos datos del usuario', usuario);
    console.log('Guardar cambios');
    updateUser(idUser, usuario);
    setIsEditing(false);
  };

  useEffect(() => {
    setUsuario((prevUsuario) => ({ ...prevUsuario, profilePicture: image }));
  }, [image]);

  return (
    <Box sx={{ textAlign: 'center', mt: 4, color: 'white' }}>
      <Typography variant="h4" mb={2}>
        Perfil de Usuario
      </Typography>
      <UserOptions />

      <Box
        sx={{
          backgroundColor: '#303030',
          padding: 10,
          border: '1px solid #42e268',
          borderRadius: 5,
        }}
      >
        <Box sx={{ mt: 2 }}>
        {isEditing ? (
          <PhotoUpload photo={image} setPhoto={setImage} />
        ) : (
          <img src={usuario.profilePicture} alt="Imagen de perfil" style={{ maxWidth: '200px', borderRadius: '50%' }} />
        )}
      </Box>
      <Typography variant="h5" mt={2}>
        Nombre: {isEditing ? <Input value={usuario.name} onChange={(event) => setUsuario({ ...usuario, name: event.target.value })} sx={{ color: 'white' }} /> : usuario.name}
      </Typography>
      <Typography variant="h5">Correo Electrónico: {usuario.email}</Typography>
      <Typography variant="h5">
        Número de Teléfono: {isEditing ? <Input value={usuario.phoneNumber} onChange={(event) => setUsuario({ ...usuario, phoneNumber: event.target.value })} sx={{ color: 'white' }} /> : usuario.phoneNumber}
      </Typography>
      <Typography variant="h5">Fecha de Creación: {usuario.createdAt}</Typography>
      {isEditing ? (
        <Button variant="contained" color="primary" onClick={handleGuardarCambios} mt={2}>
          Guardar Cambios
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={handleEditarPerfil} mt={2}>
          Editar
        </Button>
      )}
      </Box>
      
    </Box>
  );
};

export default EditProfile;
