import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { TAREAS_PRODUCTO,
         AGREGAR_TAREA,
         VALIDAR_TAREA,
         ELIMINAR_TAREA,
         TAREA_ACTUAL,
         ACTUALIZAR_TAREA,
         LIMPIAR_TAREA
  } from '../../types';

import clienteAxios from '../../config/axios';


const TareaState = props => {
    const initialState = {
        tareasproducto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear las funciones


    //Obtener las tareas de un producto
    const obtenerTareas = async producto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {producto}});
            dispatch({
                type: TAREAS_PRODUCTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            
        }
    }

    //Agregar una tarea al producto seleccionado
    const agregarTarea = async tarea => {
       
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un erorr en caso de ser necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, producto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {producto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Edita o modifica la tarea
    const actualizarTarea = async tarea  =>{
        
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Extrae una tarea para editar
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Elimina la tarea seleccionada
    const limpiarTarea =  () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasproducto: state.tareasproducto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
                
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
