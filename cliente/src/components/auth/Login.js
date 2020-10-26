import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {
    
    //Extraer los valores del context 
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} =  alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;
    
    //En caso de que el usuario o password no existan
    useEffect(() => {
        if(autenticado){
            props.history.push('/productos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);  
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer de usuario
    const {email, password} = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

    //Validar que los campos no esten vacios
    if(email.trim() === '' || password.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }

    //Pasarlo al action
    iniciarSesion({email, password});
    }


    return(

        <div className="form-usuario">
            {alerta ?(<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form 
                    onSubmit={onSubmit}
                > 
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
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                    </div>
                </form>
                <Link to={'/nuevacuenta'} className="enlace-cuenta">Crear Cuenta</Link>
            </div>
        </div>
    );
} 

export default Login;