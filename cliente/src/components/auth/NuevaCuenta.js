import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //Extraer los valores del context 
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} =  alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;
    
    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/productos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);  
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State para crear cuenta
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extraer de usuario
    const {nombre, apellido, email, password, confirmar} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario quiere crear cuenta
    const onSubmit = e => {
        e.preventDefault();
        //Validar que los campos no esten vacios
        if(nombre.trim() === '' ||
           apellido.trim() === ''|| 
           email.trim() === ''|| 
           password.trim() === ''||
           confirmar.trim() === '') {
               mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
               return;
           }

        //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe ser de minimo 6 caracteres', 'alerta-error');
            return;
        }

        //Las 2 contraseñas sean iguales
        if(password !== confirmar){
            mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
            return;
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
            apellido,
            email,
            password
        });
    }


    return(

        <div className="form-usuario">
            {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>

                <form 
                    onSubmit={onSubmit}
                > 
                     <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            placeholder="Tu nombre"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="apellido">Apellido</label>
                        <input 
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={apellido}
                            placeholder="Tu apellido"
                            onChange={onChange}
                        />
                    </div>
                    
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Tu email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Tu Contraseña"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            value={confirmar}
                            placeholder="Repetir Contraseña"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Volver a Iniciar Sesión</Link>
            </div>
        </div>
    );
} 

export default NuevaCuenta;