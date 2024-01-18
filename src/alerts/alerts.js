// alert.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const showAlert = (title, message, icon) => {
  Swal.fire({
    title,
    text: message,
    icon,
  });
};

export const showSuccessAlert = (message) => {
  showAlert("Genial!", message, "success");
};

export const showErrorAlert = (message) => {
  showAlert("Oops!", message, "error");
};
export const showPendingOrderAlert = () => {
    showAlert("¡Orden Creada Exitosamente!", "Estado: Pendiente", "success");
  };

//Dashboards alert

export const dashboardAlert = async(title, message, icon) =>{
  await MySwal.fire({
    title: <p>{title}</p>,
    text: message,
    icon: icon,
    showConfirmButton: false,
    timer: 1500
  })
}

export const successDashboardAlert = async(message)=>{
  await dashboardAlert("¡Todo salió bien!", message, 'success')
}

export const errorDashboardAlert = async(message)=>{
  await dashboardAlert("Oops!", message, 'error')
}

export const confirmDeleteAlert = async (element) => {
  const result = await MySwal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás recuperar esta información!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, estoy seguro.",
    cancelButtonText: "No, cancelar.",
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: "¡Borrado!",
      text: `El ${element} ha sido eliminado`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    return true;
  } else {
    return false;
  }
};