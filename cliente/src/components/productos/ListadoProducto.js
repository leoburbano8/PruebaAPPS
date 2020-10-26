import React, {useContext, useEffect} from 'react';
import Producto from './Producto';
import productoContext from '../../context/productos/productoContext';
import AlertaContext from '../../context/alertas/alertaContext'; 
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProductos = () => {
    
    //Extraer productos de state inicial 
    const productosContext = useContext(productoContext);
    const {mensaje, productos, obtenerProductos} = productosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        //Si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProductos(); 
        //eslint-disable-next-line
     }, [mensaje]);
    
    //Revisar si productos tiene contenido
    if(productos.length === 0) return <p>No hay productos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
            {productos.map(producto => (
                <CSSTransition
                    key = {producto._id}
                    timeout={200}
                    classNames="producto"
                >
                    <Producto
                        producto = {producto}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProductos;