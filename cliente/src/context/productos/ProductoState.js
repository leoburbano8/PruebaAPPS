import React, {useReducer} from 'react';
import productoContext from './productoContext';
import productoReducer from './productoReducer';
import { FORMULARIO_PRODUCTO,
         OBTENER_PRODUCTOS,
         AGREGAR_PRODUCTOS,
         PRODUCTO_ERROR,
         VALIDAR_FORMULARIO,
         PRODUCTO_ACTUAL,
         ELIMINAR_PRODUCTO
       } from '../../types';
import clienteAxios from '../../config/axios';
    
    const ProductoState = props =>{

        const initialState = {
            productos : [],
            formulario : false,
            errorformulario: false,
            producto: null,
            mensaje: null
        }
    
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(productoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PRODUCTO
        })
    }

    // Obtener los productos
    const obtenerProductos = async () =>{
        try {
            
            const resultado = await clienteAxios.get('/api/productos');

            dispatch({
                type: OBTENER_PRODUCTOS,
                payload: resultado.data.productos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }  

            dispatch({
                type: PRODUCTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar nuevo producto
    const agregarProducto = async producto => {
        

        try {
            const resultado = await clienteAxios.post('/api/productos', producto);
            console.log(resultado);

            //Insertar el producto en el state
            dispatch({
                type: AGREGAR_PRODUCTOS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }  

            dispatch({
                type: PRODUCTO_ERROR,
                payload: alerta
            })
        }
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el producto que el usuario dio clic
    const productoActual = productoId => {
        dispatch({
            type: PRODUCTO_ACTUAL,
            payload: productoId
        })
    } 

    //Elimina un producto
    const eliminarProducto = async productoId => {
        try {

            await clienteAxios.delete(`/api/productos/${productoId}`);

            dispatch({
                type: ELIMINAR_PRODUCTO,
                payload: productoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }  

            dispatch({
                type: PRODUCTO_ERROR,
                payload: alerta
            })
        }
    } 

    return (
        <productoContext.Provider
            value={{
                productos: state.productos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                producto: state.producto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProductos,
                agregarProducto,
                mostrarError,
                productoActual,
                eliminarProducto
            }}
        >

            {props.children}
        </productoContext.Provider>
    )
} 

export default ProductoState;