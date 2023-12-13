import NavBar from "../NavBar/NavBar";

const ShoppingCart = () => {

        return (
        <div>
            <NavBar/>
            <h1>ShoppingCart</h1>
            <h3>Resumen de Compra: </h3>
                <h4>*Total de la compra</h4>
                <h4>*Botón de Pago</h4>
            <h3>Productos: </h3>
                <h4>* botones para modificar el stock[-]/[+]</h4>
                <h4>* botón para eliminar el producto</h4>
        </div>
        );
    };

export default ShoppingCart;