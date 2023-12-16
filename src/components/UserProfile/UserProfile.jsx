import NavBar from "../NavBar/NavBar";

const UserProfile = () => {
  // Información del usuario
  const usuario = {
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "contraseña123",
    fotoPerfil: "https://cdn.icon-icons.com/icons2/2840/PNG/512/emoji_face_happy_icon_180979.png",
    ciudad: "Ciudad de Ejemplo",
    fechaNacimiento: "01/01/1990",
    genero: "Masculino",
    telefono: "123456789",
    direccionEnvio: "Calle Ejemplo #123",
  };

  // Manejar la edición del perfil
  const handleEditarPerfil = () => {
    // Implementa lógica para editar el perfil
    console.log("Editar perfil");
  };

  return (
    <div>
      <NavBar />
      <h1>User Profile:</h1>
      <h3>Imagen de Perfil:</h3>
      <img src={usuario.fotoPerfil} alt="Foto de perfil" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      <h3>Name: {usuario.nombre}</h3>
      <h3>Email: {usuario.email}</h3>
      <h3>Password: {usuario.password}</h3>
      {/* <h3>Ciudad: {usuario.ciudad}</h3>
      <h3>Fecha de Nacimiento: {usuario.fechaNacimiento}</h3>
      <h3>Género: {usuario.genero}</h3>
      <h3>Teléfono: {usuario.telefono}</h3>
      <h3>Dirección de Envío: {usuario.direccionEnvio}</h3> */}
      <button onClick={handleEditarPerfil}>Editar Perfil</button>
    </div>
  );
};

export default UserProfile;
