import { FORMULARIO_PRODUCTO,
    OBTENER_PRODUCTOS,
    AGREGAR_PRODUCTOS,
    PRODUCTO_ERROR,
    VALIDAR_FORMULARIO,
    PRODUCTO_ACTUAL,
    ELIMINAR_PRODUCTO
  } from '../../types';


export default (state, action) => {
    switch(action.type){
        case FORMULARIO_PRODUCTO:
            return{
                ...state,
                formulario: true
            } 
        case OBTENER_PRODUCTOS:
            return{
                ...state,
                productos: action.payload
            }
        case AGREGAR_PRODUCTOS:
            return{
                ...state,
                productos: [...state.productos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
        case PRODUCTO_ACTUAL:
            return{
                ...state,
                producto: state.productos.filter(producto => producto._id === action.payload)
            }
        case ELIMINAR_PRODUCTO:
            return{
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload),
                producto: null
            }
        case PRODUCTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}