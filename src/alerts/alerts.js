// alert.js
import Swal from 'sweetalert2';

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
