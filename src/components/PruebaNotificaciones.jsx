import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const PruebaNotificaciones = () => {
  useEffect(() => {
    // Esta función se ejecutará después de que el componente se monte
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
  }, []); // El segundo argumento [] significa que useEffect solo se ejecutará una vez, como componentDidMount

  return (
    <div>
      <p>PruebaNotificaciones</p>
      <h1>Reviews</h1>
      <h1>Reviews</h1>
      <h1>Reviews</h1>
    </div>
  );
};

export default PruebaNotificaciones;
