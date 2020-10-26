import React, {useContext} from 'react';
import productoContext from '../../context/productos/productoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Producto = ({producto}) => {

    //Obtener el State de productos
    const productosContext = useContext(productoContext);
    const {productoActual} = productosContext; 

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //Funcion para agregar el producto actual
    const seleccionarProducto = id => {
        productoActual(id); // Fijar un producto actual
        obtenerTareas(id); // Filtrar las tareas cuando se le de click
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProducto(producto._id) }
            >{producto.nombre}</button>
        </li>
    );
}

export default Producto;