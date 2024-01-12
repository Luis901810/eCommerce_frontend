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