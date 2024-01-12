export const isEmptyObject = (obj)=>{
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && Array.isArray(obj[key]) && obj[key].length > 0) {
          return false; // Si algún array no está vacío, devuelve falso
        }
      }
      return true;
}