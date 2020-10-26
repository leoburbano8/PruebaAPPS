import React, {useContext, useState, useEffect} from 'react';
import productoContext from '../../context/productos/productoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea= () => {

    //Extraer si un producto esta activo
    const productosContext = useContext(productoContext);
    const {producto} = productosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, 
           errortarea, 
           agregarTarea, 
           validarTarea, 
           obtenerTareas, 
           actualizarTarea,
           limpiarTarea
        } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null ){
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    //State del formulario
    const  [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //Extraer el  nombre del producto 
    const {nombre} = tarea;

    //Si no hay producto seleccionado
    if(!producto) return null;

    //Array Destructuring para extraer el producto actual
    const [productoActual] = producto;

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }
    
    const onSubmit  = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === ''){
            validarTarea();
             return;
        }

        //Si es editar o crear nueva tarea
        if(tareaseleccionada === null){
             //Agregar la nueva tarea al state de tareas
            tarea.producto = productoActual._id;
            agregarTarea(tarea);
        } else{
            //Actualizar tarea existente
            actualizarTarea(tarea);

            //Elimina tareaseleccionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas
        obtenerTareas(productoActual.id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea 
                       ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                       : null 
            }
        </div>
    );
}

export default FormTarea;