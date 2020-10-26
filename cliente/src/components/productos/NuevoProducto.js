import React, {Fragment, useState, useContext} from 'react';
import productoContext from '../../context/productos/productoContext';

const NuevoProducto = () => {
    //Obtener el State del formulario
    const productosContext = useContext(productoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProducto, mostrarError} = productosContext;     

    //State para proyecto
    const [producto, guardarProducto] = useState({
        nombre: ''
    });

    //Extraer nombre de proyecto
    const {nombre} = producto;

    //Lee los contenidos de los input
    const onChangeProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }
    
    //Cuando el usuario envia un producto
    const onSubmitProducto = e =>{
        e.preventDefault();

        //Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        } 

        //Agregar el state
        agregarProducto(producto)
        
        //Reiniciar el form
        guardarProducto({
            nombre: ''
        })
    }

    //Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }
    return (
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}
            >Nuevo Producto</button>

            {formulario 
                ? 
                    (
                    <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProducto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre de Producto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProducto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Producto"
                        />
                    </form>
                    ) : null 
            }
            {errorformulario 
                ? <p className="mensaje error">Nombre de Producto obligatorio</p>
                : null}
        </Fragment>
        
    );
}

export default NuevoProducto;