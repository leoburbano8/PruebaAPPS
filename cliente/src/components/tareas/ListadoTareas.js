import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import productoContext from '../../context/productos/productoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {

    //Extraer productos de state inicial 
    const productosContext = useContext(productoContext);
    const {producto, eliminarProducto} = productosContext;

    //Obtener las tareas del producto
    const tareasContext = useContext(tareaContext);
    const {tareasproducto} = tareasContext;

    //Si no hay producto seleccionado
    if(!producto) return <h2>Selecciona un Producto</h2>

    //Array Destructuring para extraer el producto actual
    const [productoActual] = producto;

    //Eliminar un producto
    const onClickEliminar = () =>{
        eliminarProducto(productoActual._id)
    }

    return (
        <Fragment>
            <h2>Producto: {productoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproducto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    : 
                    <TransitionGroup>
                        {tareasproducto.map( tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea                            
                                tarea ={tarea}
                            />
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Producto &times;</button>
        </Fragment>
    );
}

export default ListadoTareas;