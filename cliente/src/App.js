import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Productos from './components/productos/Productos';
import ProductoState from './context/productos/ProductoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  return (
    <ProductoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nuevacuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/productos" component={Productos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProductoState>
  );
}

export default App;
